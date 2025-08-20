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
  
  if (pathname.includes('/logout')) {
    const parts = pathname.split('/');
    const locale = parts.length > 1 && ['es', 'en'].includes(parts[1]) ? parts[1] : 'es';
    const homeUrl = new URL(`/${locale}`, request.url);
    return NextResponse.redirect(homeUrl);
  }
  
  const protectedRoutes = ['/dashboard', '/my-courses', '/profile', '/test-dashboard'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.includes(route));
  
  if (isProtectedRoute) {
    const session = await verifyAuth(request);
    if (!session) {
      const parts = pathname.split('/');
      const locale = parts.length > 1 && ['es', 'en'].includes(parts[1]) ? parts[1] : 'es';
      const loginUrl = new URL(`/${locale}/login`, request.url);
      loginUrl.searchParams.set('redirectTo', pathname);
      
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('session');
      response.cookies.delete('auth-token');
      return response;
    }
  }
  
  return intlMiddleware(request);
}
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
