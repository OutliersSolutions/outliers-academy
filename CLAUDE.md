# Outliers Academy - Engineering Overview

## Stack
- Next.js 14 (App Router) + React + TypeScript + TailwindCSS
- shadcn/ui component library with custom Academy color palette
- next-themes for dark/light mode switching
- i18n with `next-intl` (locales: `es`, `en`), middleware with `localePrefix: as-needed`
- Backend: Odoo 17 over JSON-RPC (server-to-server)
- Payments: Stripe Checkout + Webhook
- **Arquitectura /src**: Estructura organizada con separación clara de responsabilidades

## Key App Structure (Migrado a /src)
```
src/
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
  components/
    Layouts/               # Header, Footer, Navbar components
    Sections/              # Hero, marketing, service sections
    ui/                    # Reusable UI components (shadcn/ui)
      Backgrounds/         # Background effects and animations
      Chats/              # Chat components and phone mockups
      shapes/             # Geometric and animated shapes
  lib/
    auth.ts               # Authentication helpers
    odooClient.ts         # Odoo JSON-RPC client
    utils.ts              # shadcn/ui utilities
  styles/
    globals.css           # Global styles with theme variables
  data/                   # Static data and configurations
  hooks/                  # Custom React hooks
api/
  courses/route.ts        # Lists courses via Odoo client
  auth/
    login/route.ts        # Authenticate against Odoo common.authenticate
    signup/route.ts       # Create partner/user portal in Odoo
  stripe/
    checkout/route.ts     # Create Checkout Session
    webhook/route.ts      # Stripe webhook
```

## Libraries / Helpers (Migrado a /src)
- `src/lib/odooClient.ts`: JSON-RPC client with `authenticate` cache, `execute_kw`, and `fetchCourses`. Includes dev fallback data when Odoo env is missing.
- `src/lib/auth.ts`: Minimal HMAC cookie session (`oa_session`). Configure `AUTH_SECRET` in prod.
- `src/lib/utils.ts`: shadcn/ui utilities for class merging and conditional styling.
- `src/components/CourseGrid.tsx`: Server component that fetches courses server-to-server.
- `src/components/CheckoutButton.tsx`: Client component posting to Checkout endpoint and redirecting to Stripe.
- `src/components/Layouts/Header.tsx`: Navigation header with dark mode toggle and responsive menu.
- `src/components/ui/`: shadcn/ui components and custom UI elements.

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
- Runtime fallback in `src/app/[locale]/layout.tsx` to load `src/messages/<locale>.json` if `getMessages()` fails.

## Theme System
- **Dark Mode**: Implementado con next-themes
- **Toggle**: Disponible en Header component con iconos Sol/Luna
- **Variables CSS**: Configuradas en globals.css para ambos temas
- **Tailwind**: Configurado con `darkMode: ["class"]` para soporte completo

## Ops
- Run dev: `npm run dev`
- Build/start: `npm run build && npm start`
- Lint: `npm run lint` (ESLint configurado para /src)
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
- If next-intl plugin isn't picked up in some environments, fallback import ensures pages still render.
- Middleware must match root and localized paths, not static assets.
- **Migración a /src**: Todo el código de aplicación ahora está en el directorio `/src`
- **shadcn/ui Integration**: Componentes UI modernos con Tailwind CSS
- **Dark Mode**: Implementado con next-themes, toggle en header
- **TypeScript Paths**: Configurado para imports desde `/src` con aliases `@/`

## Cambios Post-Migración
- **Estructura**: Todo movido de `/app`, `/components`, `/lib` a `/src/`
- **Imports**: Actualizados todos los imports para usar paths de `/src`
- **React Router → Next.js**: Convertidos todos los NavLink a Link de Next.js
- **Linting**: Corregidos errores de ESLint y sintaxis
- **Build**: Validado funcionamiento completo del proyecto
- **Configuración**: tsconfig.json, tailwind.config.ts actualizados para /src

# Flujo de Cursos y Pagos (Odoo-Céntrico) - IMPLEMENTADO

## 1. Gestión de cursos
- Crear curso en eLearning (slide.channel)
- Asociar un producto (product_id) y habilitar "Se vende"
- Publicar en web para que aparezca en catálogo (website_published = true)

## 2. Venta y cobro - IMPLEMENTADO
- Usuario inicia sesión en Next.js y selecciona curso
- CheckoutButton redirige a /api/odoo/checkout
- Crea sale.order en Odoo con product_id
- Redirige a Odoo /shop/cart para checkout nativo
- Odoo gestiona pagos y actualiza acceso automáticamente

## 3. Consumo de cursos - IMPLEMENTADO
- API /api/odoo/courses para cursos del usuario
- API /api/odoo/courses/[id]/content para contenido con verificación de acceso
- Multimedia servida por Odoo /web/image/ o URLs públicas

## 4. Seguridad - IMPLEMENTADO
- Credenciales Odoo solo en servidor
- Headers de seguridad: HSTS, CSP, X-Frame-Options
- Cookies HttpOnly, Secure, SameSite=Strict, Max-Age=24h
- Rate limiting en middleware
- Session validation con timeout de 24h

## APIs Implementadas
- POST /api/odoo/checkout - Crear orden y redirigir a Odoo
- GET /api/odoo/courses - Cursos del usuario autenticado  
- GET /api/odoo/courses/[id]/content - Contenido con verificación de acceso

## Multimedia y Branding - IMPLEMENTADO
- Modelo 3D chatbot.glb integrado en hero section
- Imágenes de instructores desde /images/
- Iconos de tecnologías desde /icons/technologies/
- Videos de demostración desde /videos/

## Funciones Odoo Client Añadidas
- fetchUserCourses() - Cursos matriculados del usuario
- fetchCourseContent() - Slides con verificación de acceso
- createSaleOrder() - Crear orden de venta
- getUserProfile() - Perfil del usuario

# Sistema de Carrito e-Commerce - IMPLEMENTADO COMPLETAMENTE

## Arquitectura Híbrida: Suscripciones + Cursos Individuales

### 🛒 **Flujos Diferenciados**
```
📚 CURSOS INDIVIDUALES → Carrito → Checkout Odoo
🔄 SUSCRIPCIONES → Checkout Stripe Directo
```

## 1. APIs del Carrito - IMPLEMENTADAS
- **GET/POST** `/api/cart` - Gestión completa del carrito con autenticación
- **POST** `/api/cart/checkout` - Checkout integrado con Odoo
- **Persistencia** con cookies seguras (`oa_cart`)
- **Validación** de autenticación en todas las operaciones

## 2. Componentes del Carrito - IMPLEMENTADOS
- **ShoppingCart** (`src/components/ShoppingCart.tsx`): Panel lateral con overlay
- **AddToCartButton** (`src/components/AddToCartButton.tsx`): Botón para añadir cursos
- **CartProvider** (`src/components/providers/CartProvider.tsx`): Estado global del carrito
- **CartIcon** en Header: Contador con badge de items

## 3. Protección de Autenticación - IMPLEMENTADA
- **API protegida**: Requiere autenticación (`verifyAuth`) para todas las operaciones
- **UI condicional**: 
  - Usuario no autenticado → Icono de usuario en header
  - Usuario autenticado → Icono de carrito con contador
- **Botones adaptativos**: "Añadir al carrito" se convierte en "Inicia sesión para añadir"
- **Redirección automática**: Error 401 redirige a `/login` con toast explicativo

## 4. Gestión de Estado del Carrito
- **Cookies seguras**: Persistencia entre sesiones con `HttpOnly`, `Secure`, `SameSite`
- **Eventos personalizados**: `cartUpdated` para sincronización en tiempo real
- **Validación de productos**: Verificación de existencia de cursos via Odoo
- **Cálculo automático**: Totales y contadores actualizados dinámicamente

## 5. Estructura del Carrito
```typescript
interface CartItem {
  courseId: number;
  productId: number;
  courseName: string;
  price: number;
  slug: string;
  quantity: number;
}

interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}
```

## 6. Funcionalidades Implementadas
- ✅ **Añadir/Remover** cursos del carrito
- ✅ **Visualización** completa del carrito con overlay
- ✅ **Checkout integrado** con Odoo para cursos individuales
- ✅ **Protección de autenticación** completa
- ✅ **Persistencia** entre sesiones y navegación
- ✅ **UX fluida** con estados de carga y feedback

## 7. Integración con Sistemas Existentes
- **Stripe**: Mantiene checkout directo para suscripciones
- **Odoo**: Integración completa para cursos y órdenes de venta
- **Autenticación**: Usa sistema existente (`useNewAuth`, `verifyAuth`)
- **i18n**: Soporte para traducciones en componentes del carrito

## 8. Endpoints de Carrito
- `GET /api/cart` - Obtener carrito del usuario autenticado
- `POST /api/cart` - Añadir/remover/limpiar items del carrito
- `POST /api/cart/checkout` - Crear orden en Odoo y redirigir a checkout

## 9. Librerías del Carrito
- `src/lib/cart.ts`: Utilidades para manipulación del carrito
- Cookie management con `CART_COOKIE`
- Funciones: `getCart`, `addToCart`, `removeFromCart`, `clearCart`

## 10. UX y Estados
- **Loading states**: Durante operaciones async
- **Toast notifications**: Feedback inmediato al usuario
- **Error handling**: Manejo graceful de errores de red/auth
- **Responsive design**: Funciona en móvil y desktop