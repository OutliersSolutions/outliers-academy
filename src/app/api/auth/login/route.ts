import {NextResponse} from 'next/server';
import {odooExecuteKw} from '@/lib/odooClient';
import {AUTH_COOKIE, signPayload} from '@/lib/auth';

function baseUrl() {
  return (process.env.ODOO_URL || '').replace(/\/+$/, '');
}

async function jsonRpc<T>(endpoint: string, payload: any): Promise<T> {
  const url = baseUrl();
  if (!url) throw new Error('ODOO_URL is not set');
  const res = await fetch(`${url}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({jsonrpc: '2.0', id: Date.now(), ...payload})
  });
  if (!res.ok) throw new Error(`Odoo HTTP ${res.status}`);
  const data = await res.json();
  if (data.error) {
    const detail = data.error?.data?.message || data.error?.data?.name || data.error?.message || 'Odoo Server Error';
    throw new Error(detail);
  }
  return data.result as T;
}

export async function POST(request: Request) {
  try {
    let body: any = null;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({error: 'Invalid JSON body'}, {status: 400});
    }

    const {login, email, password} = body || {};
    const userLogin = login || email;
    if (!userLogin || !password) return NextResponse.json({error: 'Missing credentials'}, {status: 400});

    if (!process.env.ODOO_DB || !process.env.ODOO_URL) {
      return NextResponse.json({error: 'Server missing Odoo configuration'}, {status: 503});
    }

    const uid = await jsonRpc<number>('/jsonrpc', {
      method: 'call',
      params: {service: 'common', method: 'authenticate', args: [process.env.ODOO_DB, userLogin, password, {}]}
    });

    if (!uid) return NextResponse.json({error: 'Invalid credentials'}, {status: 401});

    // Get user details 
    const users = await odooExecuteKw('res.users', 'read', [
      [uid], 
      ['name', 'login', 'partner_id', 'active']
    ]);
    const user = users?.[0];
    
    if (!user) {
      return NextResponse.json({error: 'User not found'}, {status: 404});
    }

    // Check if email verification is enabled and if user is verified
    const emailVerificationEnabled = process.env.ODOO_EMAIL_VERIFICATION === 'true';
    
    if (emailVerificationEnabled) {
      // Additional check: verify user is properly activated
      if (!user.active) {
        return NextResponse.json({
          error: 'Account not verified',
          requiresVerification: true,
          email: user.login
        }, {status: 403});
      }
    }

    const payload = {uid, login: userLogin, name: user.name, issuedAt: Date.now()};
    const token = await signPayload(payload);

    const resJson = NextResponse.json({ok: true, user: payload});
    
    // Set cookie using NextResponse.cookies for better handling
    resJson.cookies.set({
      name: AUTH_COOKIE,
      value: token,
      httpOnly: true, // Enable httpOnly for security
      path: '/',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      secure: process.env.NODE_ENV === 'production' // Only secure in production
    });
    return resJson;
  } catch (err: any) {
    console.error('Login error:', err?.message || err);
    return NextResponse.json({error: err.message || 'Internal error'}, {status: 500});
  }
} 