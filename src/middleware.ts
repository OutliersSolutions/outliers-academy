import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

const intlMiddleware = createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always'
});

export default async function middleware(request: NextRequest) {
  // Apply internationalization middleware first
  const response = intlMiddleware(request);
  
  // Check if this is a protected route
  const { pathname } = request.nextUrl;
  const protectedRoutes = ['/dashboard', '/my-courses', '/profile', '/test-dashboard'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.includes(route));
  
  if (isProtectedRoute) {
    // Verify authentication for protected routes
    const session = await verifyAuth(request);
    
    if (!session) {
      // Extract locale from pathname (e.g., '/es/dashboard' -> 'es')
      const locale = pathname.split('/')[1] || 'es';
      const loginUrl = new URL(`/${locale}/login`, request.url);
      
      console.log(`🚫 Unauthorized access to ${pathname}, redirecting to ${loginUrl.pathname}`);
      return NextResponse.redirect(loginUrl);
    }
    
    console.log(`✅ Authorized access to ${pathname} for user ${session.login}`);
  }
  
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};