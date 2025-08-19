import crypto from 'crypto';
import {NextRequest} from 'next/server';

const DEFAULT_SECRET = 'dev-secret-change-me';
const AUTH_COOKIE = 'oa_session';

export type SessionPayload = {
  uid: number;
  login: string;
  name?: string;
  issuedAt: number;
};

function getSecret() {
  return process.env.AUTH_SECRET || DEFAULT_SECRET;
}

export function signPayload(payload: SessionPayload): string {
  const secret = getSecret();
  const json = JSON.stringify(payload);
  const data = Buffer.from(json).toString('base64url');
  const hmac = crypto.createHmac('sha256', secret).update(data).digest('base64url');
  return `${data}.${hmac}`;
}

export function verifySigned(signed: string): SessionPayload | null {
  const secret = getSecret();
  const [data, sig] = signed.split('.');
  if (!data || !sig) return null;
  const expected = crypto.createHmac('sha256', secret).update(data).digest('base64url');
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const json = Buffer.from(data, 'base64url').toString();
    return JSON.parse(json) as SessionPayload;
  } catch {
    return null;
  }
}

export async function verifyAuth(request: NextRequest): Promise<SessionPayload | null> {
  try {
    const cookieValue = request.cookies.get(AUTH_COOKIE)?.value;
    console.log('verifyAuth - cookieValue:', cookieValue ? 'exists' : 'missing');
    if (!cookieValue) return null;
    
    const session = verifySigned(cookieValue);
    console.log('verifyAuth - session after verify:', session ? 'valid' : 'invalid');
    if (!session) return null;
    
    // Check if session is not too old (24 hours)
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours in ms
    const age = Date.now() - session.issuedAt;
    console.log('verifyAuth - session age:', age, 'maxAge:', maxAge);
    if (age > maxAge) return null;
    
    console.log('verifyAuth - success:', session);
    return session;
  } catch (error) {
    console.log('verifyAuth - error:', error);
    return null;
  }
}

export {AUTH_COOKIE}; 