import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

const intlMiddleware = createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'as-needed'
});

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if this is a protected route
  const protectedRoutes = ['/dashboard', '/my-courses', '/profile', '/test-dashboard'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.includes(route));
  
  if (isProtectedRoute) {
    const session = await verifyAuth(request);
    
    if (!session) {
      // Not authenticated, redirect to login in the appropriate locale
      const parts = pathname.split('/');
      const locale = parts.length > 1 && ['es', 'en'].includes(parts[1]) ? parts[1] : 'es';
      const loginUrl = new URL(`/${locale}/login`, request.url);
      console.log(`🚫 Unauthorized access to ${pathname}, redirecting to ${loginUrl.pathname}`);
      return NextResponse.redirect(loginUrl);
    }
    
    console.log(`✅ Authorized access to ${pathname} for user ${session.login}`);
  }
  
  // Apply i18n middleware for all routes
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};