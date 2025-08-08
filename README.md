# Outliers Academy - Frontend

Frontend tipo Codecademy para cursos, integrado con Odoo 17 y pagos con Stripe. i18n (es/en) y tema acorde a la paleta provista.

## Fase 1: Setup Inicial
- Next.js 14 + TypeScript + TailwindCSS
- i18n con `next-intl` (locales: es, en)
- Theming con CSS variables (paleta)

### Requisitos
- Node.js >= 18.17
- Stripe account (test)
- Odoo 17 con modelos de cursos

### Instalación
```bash
cp .env.example .env
npm install
npm run dev
```

## Fase 2: Frontend Core
- Home con hero, grid de cursos, secciones informativas
- Catálogo `/[locale]/catalog`
- Página de curso `/[locale]/course/[slug]`

## Fase 3: Backend Integration (Odoo 17)
- Cliente JSON-RPC (`lib/odooClient.ts`)
- Endpoint `/api/courses` para listar cursos

## Fase 4: Pagos & Deploy
- Stripe Checkout (`/api/stripe/checkout`)
- Webhook (`/api/stripe/webhook`)
- Dockerfile para despliegue

## Scripts
- `npm run dev` desarrollo
- `npm run build` build producción
- `npm start` servir build
- `npm run lint` linting
- `npm run typecheck` TS check 