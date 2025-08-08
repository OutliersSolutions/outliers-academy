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

    const {login, password} = body || {};
    if (!login || !password) return NextResponse.json({error: 'Missing credentials'}, {status: 400});

    if (!process.env.ODOO_DB || !process.env.ODOO_URL) {
      return NextResponse.json({error: 'Server missing Odoo configuration'}, {status: 503});
    }

    const uid = await jsonRpc<number>('/jsonrpc', {
      method: 'call',
      params: {service: 'common', method: 'authenticate', args: [process.env.ODOO_DB, login, password, {}]}
    });

    if (!uid) return NextResponse.json({error: 'Invalid credentials'}, {status: 401});

    const users = await odooExecuteKw('res.users', 'read', [[uid], ['name', 'login']]);
    const user = users?.[0] || {name: login, login};

    const payload = {uid, login, name: user.name, issuedAt: Date.now()};
    const token = signPayload(payload);

    const resJson = NextResponse.json({ok: true, user: payload});
    resJson.headers.set('Set-Cookie', `${AUTH_COOKIE}=${token}; HttpOnly; Path=/; SameSite=Lax`);
    return resJson;
  } catch (err: any) {
    console.error('Login error:', err?.message || err);
    return NextResponse.json({error: err.message || 'Internal error'}, {status: 500});
  }
} 