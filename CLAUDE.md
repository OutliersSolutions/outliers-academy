# CLAUDE.md

## Project Overview
**TechUniversidad** - Educational platform with custom Next.js frontend + Odoo 17 backend (Codecademy-style design)

## Stack
- **Frontend:** Next.js 14 + React + Tailwind CSS
- **Backend:** Odoo 17 Community (Python + PostgreSQL)
- **API:** JSON-RPC between frontend/backend
- **Payments:** Stripe, MercadoPago, PayPal
- **Deployment:** Frontend (Vercel), Backend (VPS)

## Architecture
```
Next.js Frontend → Odoo 17 API → Database
(Students UI)     (ERP/CMS)     (PostgreSQL)
```

## Key Files
```
frontend/
├── lib/odooClient.js        # API client for Odoo
├── contexts/AuthContext.jsx # User authentication
├── components/Course/       # Course-related components
└── pages/courses/[id].js    # Dynamic course pages

odoo/
├── controllers/api_controller.py  # REST endpoints
├── models/course.py               # Course model extensions
└── __manifest__.py                # Module dependencies
```

## Common Commands
```bash
# Frontend development
npm run dev                    # Start Next.js dev server
npm run build && npm start     # Production build

# Odoo development
./odoo-bin -d universidad -u custom_module  # Update module
./odoo-bin shell -d universidad             # Odoo shell

# API testing
curl -X POST http://localhost:3000/api/courses  # Test frontend API
curl -X POST http://odoo:8069/api/courses       # Test Odoo API
```

## Environment Variables
```bash
# Frontend (.env.local)
NEXT_PUBLIC_ODOO_URL=https://your-odoo.com
NEXT_PUBLIC_ODOO_DB=universidad_db
NEXT_PUBLIC_STRIPE_KEY=pk_test_...

# Odoo (odoo.conf)
addons_path = /path/to/custom/addons
cors = *
```

## API Endpoints (Odoo)
```python
/api/courses          # GET: List courses
/api/course/<id>      # GET: Course details
/api/enroll           # POST: Enroll in course (auth required)
/api/my-courses       # GET: User's courses (auth required)
/api/user/profile     # GET: User profile (auth required)
/web/session/authenticate  # POST: Login
```

## Auth Flow
1. User logs in via frontend form
2. Frontend calls `/web/session/authenticate` on Odoo
3. Odoo returns session_id
4. Frontend stores session_id and includes in API calls
5. Protected routes check auth via `AuthContext`

## Payment Integration
- **Stripe:** International students (cards)
- **MercadoPago:** Local students (Peru)
- **PayPal:** Backup option
- Flow: Frontend → Create payment intent → Odoo → Webhook confirmation → Auto-enroll

## Database Models (Odoo)
- `slide.channel` → Courses
- `slide.slide` → Course content/lessons
- `res.partner` → Students/Users
- `sale.order` → Course purchases

## Code Style
- **Frontend:** Prettier + ESLint, Tailwind for styling
- **Backend:** Black formatter, PEP 8
- **Components:** Functional components with hooks
- **File naming:** kebab-case for files, PascalCase for components

## Testing
```bash
# Frontend
npm test              # Jest unit tests
npm run test:e2e      # Playwright E2E tests

# Backend  
python -m pytest tests/  # Python unit tests
```

## Development Gotchas
- **CORS:** Must be enabled in Odoo config for frontend integration
- **Session handling:** Odoo sessions expire, implement refresh logic
- **Image URLs:** Odoo images need full URL path (`/web/image/model/id/field`)
- **Bootstrap conflict:** Don't mix Odoo's Bootstrap with Tailwind
- **Module updates:** Always restart Odoo after Python changes

## Branch Strategy
- `main` → Production
- `develop` → Development integration
- `feature/course-detail` → Feature branches
- Always rebase before merge, no merge commits

## Quick Setup
```bash
# Clone and setup frontend
git clone <repo> && cd frontend
npm install && cp .env.example .env.local
npm run dev

# Setup Odoo (Docker)
docker-compose up -d
# OR manual installation with module in addons_path
```

## Performance Notes
- Use Next.js `Image` component for course thumbnails
- Implement SWR/React Query for API caching
- Lazy load course content and videos
- CDN for static assets (Cloudflare)

## Security Checklist
- ✅ HTTPS in production
- ✅ API rate limiting
- ✅ Input validation on both frontend/backend
- ✅ Session timeout handling
- ✅ CORS properly configured