import crypto from 'crypto';

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

export {AUTH_COOKIE}; 