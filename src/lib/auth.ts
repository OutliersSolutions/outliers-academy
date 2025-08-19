import {NextRequest} from 'next/server';
import { SignJWT, jwtVerify } from 'jose';
const DEFAULT_SECRET = 'dev-secret-change-me';
const AUTH_COOKIE = 'oa_session';
export type SessionPayload = {
  uid: number;
  login: string;
  name?: string;
  issuedAt: number;
};
function getSecret() {
  const secret = process.env.AUTH_SECRET || DEFAULT_SECRET;
  return new TextEncoder().encode(secret);
}
export async function signPayload(payload: SessionPayload): Promise<string> {
  const secret = getSecret();
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
}
export async function verifySigned(signed: string): Promise<SessionPayload | null> {
  const secret = getSecret();
  try {
    const { payload } = await jwtVerify(signed, secret);
    return payload as SessionPayload;
  } catch {
    return null;
  }
}
export async function verifyAuth(request: NextRequest): Promise<SessionPayload | null> {
  try {
    const cookieValue = request.cookies.get(AUTH_COOKIE)?.value;
    
    if (!cookieValue) return null;
    const session = await verifySigned(cookieValue);
    if (session) {
      return session;
    }
    return session;
  } catch (error) {
    return null;
  }
}
export {AUTH_COOKIE};
