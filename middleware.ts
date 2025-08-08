import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'as-needed'
});

export const config = {
  matcher: [
    '/((?!api|_next|.*\..*|static|odoo|longpolling|favicon.ico|robots.txt|sitemap.xml).*)'
  ]
};