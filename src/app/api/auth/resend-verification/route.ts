import { NextResponse } from 'next/server';
import { odooExecuteKw, sendVerificationEmail } from '@/lib/odooClient';
// Rate limiting storage (in production, use Redis)
const resendAttempts = new Map<string, { count: number; lastAttempt: number }>();
export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' }, 
        { status: 400 }
      );
    }
    // Rate limiting - max 3 attempts per email per hour
    const now = Date.now();
    const hourAgo = now - (60 * 60 * 1000); // 1 hour ago
    const currentAttempts = resendAttempts.get(email);
    if (currentAttempts) {
      // Clean old attempts
      if (currentAttempts.lastAttempt < hourAgo) {
        resendAttempts.delete(email);
      } else if (currentAttempts.count >= 3) {
        return NextResponse.json(
          { error: 'Too many attempts. Please wait before trying again.' },
          { status: 429 }
        );
      }
    }
    // Check if email verification is enabled
    const emailVerificationEnabled = process.env.ODOO_EMAIL_VERIFICATION === 'true';
    if (!emailVerificationEnabled) {
      return NextResponse.json(
        { error: 'Email verification is not enabled' },
        { status: 400 }
      );
    }
    try {
      // Find user by email
      const users = await odooExecuteKw('res.users', 'search_read', [
        [['login', '=', email]],
        ['id', 'login', 'active']
      ]);
      if (!users || users.length === 0) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
      const user = users[0];
      if (!user.active) {
        return NextResponse.json(
          { error: 'User account is deactivated' },
          { status: 400 }
        );
      }
      // Send verification email using our custom function
      const emailSent = await sendVerificationEmail(user.id, email);
      if (!emailSent) {
        throw new Error('Failed to send verification email');
      }
      //TODO SHOW TOAST
      // Update rate limiting
      const attempts = resendAttempts.get(email) || { count: 0, lastAttempt: 0 };
      resendAttempts.set(email, {
        count: attempts.count + 1,
        lastAttempt: now
      });
      return NextResponse.json({
        ok: true,
        message: 'Verification email sent successfully',
        email
      });
    } catch (odooError: any) {
      //TODO SHOW TOAST ERROR
      // Check if it's a user not found error vs other errors
      if (odooError.message?.includes('not found') || odooError.message?.includes('does not exist')) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to send verification email. Please try again later.' },
        { status: 500 }
      );
    }
  } catch (err: any) {
    //TODO SHOW TOAST ERROR
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
