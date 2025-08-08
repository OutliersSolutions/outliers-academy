// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'es',
  localePrefix: 'as-needed'
});

export const config = {
  matcher: [
    // Ejecuta i18n en todo MENOS estas rutas/archivos
    '/((?!api|_next|static|odoo|longpolling|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)'
  ]
};
