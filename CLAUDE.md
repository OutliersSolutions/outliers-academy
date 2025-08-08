# Outliers Academy - Engineering Overview

## Stack
- Next.js 14 (App Router) + React + TypeScript + TailwindCSS
- i18n with `next-intl` (locales: `es`, `en`), middleware with `localePrefix: as-needed`
- Backend: Odoo 17 over JSON-RPC (server-to-server)
- Payments: Stripe Checkout + Webhook

## Key App Structure
```
app/
  [locale]/
    page.tsx             # Home (uses next-intl)
    about/page.tsx       # About
    catalog/page.tsx     # Courses catalog (SSR)
    course/[slug]/page.tsx  # Course detail (SSR)
    pricing/page.tsx     # Pricing + Stripe Checkout buttons
    login/page.tsx       # Login (calls /api/auth/login)
    signup/page.tsx      # Signup (calls /api/auth/signup)
  layout.tsx             # Root layout (imports global CSS)
  [locale]/layout.tsx    # Per-locale layout (NextIntlClientProvider + Navbar/Footer)
api/
  courses/route.ts       # Lists courses via Odoo client
  auth/
    login/route.ts       # Authenticate against Odoo common.authenticate
    signup/route.ts      # Create partner/user portal in Odoo
  stripe/
    checkout/route.ts    # Create Checkout Session
    webhook/route.ts     # Stripe webhook
```

## Libraries / Helpers
- `lib/odooClient.ts`: JSON-RPC client with `authenticate` cache, `execute_kw`, and `fetchCourses`. Includes dev fallback data when Odoo env is missing.
- `lib/auth.ts`: Minimal HMAC cookie session (`oa_session`). Configure `AUTH_SECRET` in prod.
- `components/CourseGrid.tsx`: Server component that fetches courses server-to-server.
- `components/CheckoutButton.tsx`: Client component posting to Checkout endpoint and redirecting to Stripe.

## Environment (.env)
```
# Odoo 17
ODOO_URL=https://your-odoo.example.com
ODOO_DB=your_db
ODOO_USERNAME=admin@example.com
ODOO_PASSWORD=your_password

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
# Optional Prices for Pricing page
STRIPE_PRICE_ID_STARTER=price_xxx
STRIPE_PRICE_ID_PRO=price_xxx

# App
NEXT_PUBLIC_APP_URL=https://your-domain.com
AUTH_SECRET=change_me
```

## i18n
- Root plugin: `next-intl/plugin` with `./i18n.ts`.
- Middleware: `createMiddleware({locales:['es','en'], defaultLocale:'es', localePrefix:'as-needed'})` and `matcher: ['/', '/(es|en)/:path*']`.
- Runtime fallback in `[locale]/layout.tsx` to load `messages/<locale>.json` if `getMessages()` fails.

## Ops
- Run dev: `npm run dev`
- Build/start: `npm run build && npm start`
- Systemd (recommended) or reverse proxy (Nginx) with SSL. Keep Node >= 18.

## Security
- Server-to-server Odoo calls (no credentials on client).
- Signed cookie with `AUTH_SECRET`.
- Webhook signature verification (`STRIPE_WEBHOOK_SECRET`).

## Known UX Endpoints
- `/[locale]/login` → sets `oa_session` on success
- `/[locale]/signup` → creates partner/user, adds to portal group when disponible
- `/[locale]/pricing` → needs Stripe Price IDs to enable buttons

## Development Notes
- If Odoo env vars are missing, `CourseGrid` uses mock data.
- If next-intl plugin isn’t picked up in some environments, fallback import ensures pages still render.
- Middleware must match root and localized paths, not static assets.

# DO NOT USE EMOJIS