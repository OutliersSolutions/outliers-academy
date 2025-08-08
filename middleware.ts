import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  // Opcional: 'as-needed' evita prefijo para defaultLocale
  localePrefix: 'as-needed'
});

export const config = {
  matcher: [
    // Aplica a todo excepto API, assets de Next y archivos estáticos
    '/((?!api|_next|.*\..*|static|odoo|longpolling|favicon.ico|robots.txt|sitemap.xml).*)'
  ]
};