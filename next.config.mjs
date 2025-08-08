/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/:locale(en|es)/odoo', destination: '/odoo', permanent: true },
      { source: '/:locale(en|es)/odoo/:path*', destination: '/odoo/:path*', permanent: true }
    ];
  }
};
export default nextConfig;
