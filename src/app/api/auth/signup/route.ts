import {NextResponse} from 'next/server';
import {odooExecuteKw, sendVerificationEmail} from '@/lib/odooClient';
import {AUTH_COOKIE, signPayload} from '@/lib/auth';

// Rate limiting storage (in production, use Redis)
const signupAttempts = new Map<string, { count: number; lastAttempt: number }>();

export async function POST(request: Request) {
  try {
    const {name, email, password} = await request.json();
    if (!name || !email || !password) return NextResponse.json({error: 'Missing fields'}, {status: 400});

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({error: 'Invalid email format'}, {status: 400});
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json({error: 'Password must be at least 6 characters'}, {status: 400});
    }

    // Rate limiting - max 5 signup attempts per IP per hour
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const now = Date.now();
    const hourAgo = now - (60 * 60 * 1000); // 1 hour ago
    const currentAttempts = signupAttempts.get(clientIP);
    
    if (currentAttempts) {
      // Clean old attempts
      if (currentAttempts.lastAttempt < hourAgo) {
        signupAttempts.delete(clientIP);
      } else if (currentAttempts.count >= 5) {
        return NextResponse.json(
          { error: 'Too many signup attempts. Please wait before trying again.' },
          { status: 429 }
        );
      }
    }

    // Create partner first
    const partnerResult = await odooExecuteKw('res.partner', 'create', [[{
      name, 
      email, 
      customer_rank: 1,
      is_company: false
    }]]);
    
    // Extract partner ID (Odoo returns array with single ID)
    const partnerId = Array.isArray(partnerResult) ? partnerResult[0] : partnerResult;

    // Create user linked to partner with explicit portal user type
    const userResult = await odooExecuteKw('res.users', 'create', [[{
      login: email, 
      password, 
      name, 
      partner_id: partnerId,
      active: true,
      // Explicitly mark as portal user to prevent auto-assignment of internal groups
      share: true,
      // Set minimal groups - try to prevent auto-assignment
      groups_id: [[6, 0, []]]
    }]]);
    
    // Extract user ID
    const userId = Array.isArray(userResult) ? userResult[0] : userResult;

    // Force portal user type assignment after creation
    try {
      // First, get the exact Portal group ID from User types category
      const portalGroups = await odooExecuteKw('res.groups', 'search_read', [
        [['category_id.name', '=', 'User types'], ['name', '=', 'Portal']],
        ['id', 'name']
      ]);
      
      if (portalGroups && portalGroups.length > 0) {
        const portalGroupId = portalGroups[0].id;
        
        // Force update user to be ONLY portal user
        await odooExecuteKw('res.users', 'write', [[userId], {
          groups_id: [[6, 0, [portalGroupId]]], // Replace all groups
          share: true, // Ensure it's marked as portal user
        }]);
        
        console.log(`✅ User ${userId} set as Portal user only (Group ID: ${portalGroupId})`);
        
        // Validate the assignment worked
        setTimeout(async () => {
          try {
            const finalUser = await odooExecuteKw('res.users', 'read', [
              [userId], ['groups_id', 'share']
            ]);
            console.log(`🔍 Final user state: share=${finalUser[0]?.share}, groups=${finalUser[0]?.groups_id?.length}`);
          } catch (e) {
            console.log('Could not validate final user state');
          }
        }, 100);
        
      } else {
        console.warn('❌ Portal group not found in User types category');
        // Fallback: set share=true and no groups
        await odooExecuteKw('res.users', 'write', [[userId], {
          groups_id: [[6, 0, []]], // No groups at all
          share: true
        }]);
        console.log('⚠️ Set user with no groups and share=true as fallback');
      }
      
    } catch (groupError: any) {
      console.error('❌ Error setting portal permissions:', groupError.message);
      
      // Emergency fallback: try to make user as restricted as possible
      try {
        await odooExecuteKw('res.users', 'write', [[userId], {
          groups_id: [[6, 0, []]], // Remove all groups
          share: true, // Mark as external user
          active: true
        }]);
        console.log('🆘 Emergency: Set user with minimal permissions');
      } catch (fallbackError: any) {
        console.error('❌ Even fallback failed:', fallbackError.message);
      }
    }

    // Check if email verification is enabled
    const emailVerificationEnabled = process.env.ODOO_EMAIL_VERIFICATION === 'true';
    
    if (emailVerificationEnabled) {
      // Send verification email using our custom function
      try {
        const emailSent = await sendVerificationEmail(userId as number, email);
        if (emailSent) {
          console.log(`✅ Verification email sent to ${email}`);
        } else {
          console.log(`⚠️ Email sending failed but user was created successfully`);
        }
      } catch (emailError: any) {
        console.error('❌ Error sending verification email:', emailError.message);
        // Continue anyway - user was created successfully
      }

      // Update rate limiting on successful signup
      const attempts = signupAttempts.get(clientIP) || { count: 0, lastAttempt: 0 };
      signupAttempts.set(clientIP, {
        count: attempts.count + 1,
        lastAttempt: now
      });

      // Don't create session yet - user needs to verify email first
      return NextResponse.json({
        ok: true,
        requiresVerification: true,
        message: 'Account created successfully. Please check your email to verify your account before logging in.',
        email
      });
    }

    // Original flow - create session immediately (no verification)
    const payload = {uid: userId as number, login: email as string, name, issuedAt: Date.now()};
    const token = signPayload(payload);
    const resJson = NextResponse.json({ok: true, user: payload});
    
    // Secure cookie settings
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = [
      `${AUTH_COOKIE}=${token}`,
      'HttpOnly',
      'Path=/',
      'SameSite=Strict',
      `Max-Age=${24 * 60 * 60}`, // 24 hours
      isProduction ? 'Secure' : ''
    ].filter(Boolean).join('; ');
    
    resJson.headers.set('Set-Cookie', cookieOptions);
    return resJson;
  } catch (err: any) {
    return NextResponse.json({error: err.message}, {status: 500});
  }
} 