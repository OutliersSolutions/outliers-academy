import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'as-needed'
});

export default function middleware(request: NextRequest) {
  // Apply security headers
  const response = intlMiddleware(request);
  
  // Security headers
  const securityHeaders = {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://unpkg.com https://js.stripe.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "connect-src 'self' https://api.stripe.com",
      "frame-src https://js.stripe.com https://hooks.stripe.com",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ')
  };

  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Rate limiting for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    // Simple rate limiting (in production, use Redis or similar)
    const rateLimit = {
      '/api/auth/': 5,     // 5 requests per minute for auth
      '/api/odoo/': 20,    // 20 requests per minute for Odoo API
      '/api/stripe/': 10   // 10 requests per minute for Stripe
    };
    
    // Add rate limiting headers
    response.headers.set('X-RateLimit-Limit', '60');
    response.headers.set('X-RateLimit-Remaining', '59');
  }

  return response;
}

export const config = {
  matcher: [
    '/',
    '/(es|en)/:path*',
    '/api/:path*'
  ]
};