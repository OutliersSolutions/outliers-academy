import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // aplica middleware a todo menos estas rutas
    '/((?!api|_next|static|odoo|longpolling|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};