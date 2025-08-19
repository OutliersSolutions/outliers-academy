import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
const intlMiddleware = createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always'
});
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Handle logout redirects - if accessing /logout, redirect to home
  if (pathname.includes('/logout')) {
    const parts = pathname.split('/');
    const locale = parts.length > 1 && ['es', 'en'].includes(parts[1]) ? parts[1] : 'es';
    const homeUrl = new URL(`/${locale}`, request.url);
    return NextResponse.redirect(homeUrl);
  }
  // Check if this is a protected route
  const protectedRoutes = ['/dashboard', '/my-courses', '/profile', '/test-dashboard'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.includes(route));
  if (isProtectedRoute) {
    const session = await verifyAuth(request);
    if (!session) {
      // Not authenticated, redirect to login in the appropriate locale
      const parts = pathname.split('/');
      const locale = parts.length > 1 && ['es', 'en'].includes(parts[1]) ? parts[1] : 'es';
      // Fix: Create login URL without including the protected route
      const loginUrl = new URL(`/${locale}/login`, request.url);
      // Add the intended destination as a query parameter for redirect after login
      loginUrl.searchParams.set('redirectTo', pathname);
      // Create response with cleared cookies to ensure clean logout state
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('session');
      response.cookies.delete('auth-token');
      return response;
    }
  }
  // Apply i18n middleware for all routes
  return intlMiddleware(request);
}
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
