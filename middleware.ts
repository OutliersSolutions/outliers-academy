import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es'
});

export const config = {
  matcher: [
    // Aplica el middleware a todo excepto API, assets de Next y archivos estáticos
    '/((?!api|_next|.*\..*|static|odoo|longpolling|favicon.ico|robots.txt|sitemap.xml).*)'
  ]
};