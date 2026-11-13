# Double Growth — Official Website

**Build Digital. Grow Business.**

The official public website for **Double Growth**, a two-founder digital solutions agency. It presents the service catalogue, the annual package, the delivery process, legal policies, and a validated enquiry and order pipeline.

This repository is a modular monorepo containing the Next.js frontend, the Fastify API, shared contracts, validators and the Prisma data layer.

---

## Current status

| Area | Status |
| --- | --- |
| Public website (13 routes) | Implemented and statically generated |
| Homepage sections (11) | Implemented: hero, brand intro, services, why choose us, process, pricing, portfolio, testimonials, FAQ, final CTA, footer |
| Contact / lead capture | Implemented end to end; **requires a database to persist** |
| Order creation and lookup | Implemented; payment provider **not configured** |
| Payment webhook | Implemented with HMAC verification and idempotency; **not configured** |
| AI chatbot | Interface implemented; **no AI provider configured**, so it reports an honest unavailable state |
| Portfolio | Three clearly labelled design concepts with filters and detail pages; **no client projects published** |
| PostgreSQL schema | Written and Prisma client generated; **migration not applied** (no credentials) |
| Automated checks | `typecheck`, `lint`, 34 tests (15 API, 9 validators, 10 web), production build — all pass |
| Deployment | Not deployed. `doublegrowth.in` is **not live** from this repository |

No client projects, testimonials, statistics, payment IDs, founder identities or contact details are invented anywhere in the site. Missing information renders as a clearly marked pending-verification placeholder.

Legal pages are marked **Draft for legal review** and must be reviewed by a qualified professional before commercial launch.

---

## Stack (installed versions)

**Web:** Next.js `16.4.6` (App Router), React `19.3.1`, TypeScript `5.9.3`, Tailwind CSS `4.3.5`, Framer Motion `14.14.0`, Lucide `1.72.0`
**API:** Node.js `>=20.9` (built on `26.13.0`), Fastify `5.12.8`, Zod `4.6.7`
**Data:** PostgreSQL `18` (local server), Prisma `6.19.3`
**Tooling:** npm workspaces, ESLint `10`, Vitest `5.1`, tsup `9`

---

## Repository layout

```
apps/
  web/                 Next.js public website
    src/app/           13 routes + checkout + 404 + SEO files
    src/components/    layout, home, services, forms, chat, ui
    src/content/       services, process, pricing, FAQ, legal, portfolio data
    src/lib/           site config, API client, formatting
  api/                 Fastify API
    src/routes/        health, leads, orders, chat, payments webhook
    src/repositories/  repository ports + Prisma implementation
    src/services/      AI provider adapter, payment link + signature logic
    src/app.ts         app factory (usable in tests)
    src/server.ts      process entry point
packages/
  shared/              company, services, package, enums
  validators/          Zod request schemas shared by web and API
  database/            Prisma schema and client access
docs/
  PRODUCT-SPEC.md      original long-form product and requirements specification
```

---

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage: hero, brand introduction, 8 services, why choose us, 5-step process, pricing, portfolio, testimonials, FAQ, final CTA, footer |
| `/services` | Filterable service catalogue with problems, features, outcomes and technologies |
| `/pricing` | ₹3,999/year package, inclusions, exclusions, comparison, hosting/support/ownership policies, pricing FAQ, payment handling |
| `/pricing/checkout` | Order form, order summary and payment status interface |
| `/how-it-works` | Five delivery stages, principles and client responsibilities |
| `/portfolio` | Category filters, three clearly labelled design concepts, and detail pages at `/portfolio/[slug]` |
| `/about` | Company, mission, vision, values, two-founder roles, approach |
| `/contact` | Validated enquiry form with consent and spam protection |
| `/faq` | 11 questions with FAQ structured data |
| `/maintenance` | Maintenance and support scope, limits and request process |
| `/privacy`, `/terms`, `/refund-policy`, `/ownership` | Draft legal documents with review banner |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | SEO infrastructure |
| `/pricing/checkout` | Excluded from search indexing |

API endpoints are documented in [`API.md`](./API.md).

---

## Quick start

```bash
npm install
cp .env.example .env      # Windows: Copy-Item .env.example .env
npm run db:generate
npm run dev               # web on :3000, API on :4000
```

The website runs without a database. Forms will show an honest "not configured" state until `DATABASE_URL` is set and migrations are applied. See [`SETUP.md`](./SETUP.md) for the full procedure.

### Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Run web and API together |
| `npm run dev:web` / `npm run dev:api` | Run one workspace |
| `npm run build` | Production build of both apps |
| `npm run typecheck` | TypeScript check across all workspaces |
| `npm run lint` | ESLint for the web app |
| `npm test` | Vitest suites (API, validators and frontend components) |
| `npm run db:generate` | Generate the Prisma client |
| `npm run db:migrate` | Create/apply a development migration |
| `npm run db:studio` | Open Prisma Studio |

---

## Configuration

Every integration is optional at build time and reports its real state at runtime:

- **Database** — without `DATABASE_URL`, lead and order endpoints return `503 DATABASE_NOT_CONFIGURED` and store nothing.
- **Payments** — without a provider template and secret, orders are recorded as pending and no checkout link is generated. A browser redirect is never treated as proof of payment.
- **AI chatbot** — without provider credentials, the widget says the assistant is unavailable and directs visitors to the contact page.
- **Contact details** — email, phone, address and founder identities are `null` in code until confirmed.

See [`ENVIRONMENT.md`](./ENVIRONMENT.md) for every variable.

---

## Verification performed

```
npm run typecheck   ✓ all workspaces
npm run lint        ✓ no errors
npm test            ✓ 34 tests (15 API, 9 validators, 10 frontend)
npm run build       ✓ 23 web routes generated; API bundled
```

Frontend component tests (Vitest + jsdom + Testing Library) cover portfolio filtering, FAQ disclosure, contact-form validation/success/failure paths, header/mobile navigation and chatbot open/send/unavailable/reset behaviour.

Responsive and visual audit: 17 pages (13 public routes, checkout and 3 portfolio detail pages) at 360, 390, 430, 768, 1024, 1280, 1440 and 1920 px — **136 views, 0 horizontal-overflow failures**. The audit also checks one `h1` per page, image alt text, empty links, duplicate IDs, presence of `main`, title and meta description. Twelve browser interactions were exercised in Chrome: portfolio filters, FAQ accordion, mobile drawer, active navigation, chatbot unavailable/reset states, contact validation and honest failure, checkout navigation and the custom 404. **0 relevant console errors.**

Runtime smoke test against the production servers:

- all public pages return `200`; unknown routes return `404`
- `POST /api/v1/leads` → `503 DATABASE_NOT_CONFIGURED` (nothing stored)
- `POST /api/v1/orders` → `503 DATABASE_NOT_CONFIGURED` (no payment taken)
- `POST /api/v1/chat` → `503 AI_NOT_CONFIGURED`
- `POST /api/v1/payments/webhook` → `503 PAYMENTS_NOT_CONFIGURED`
- CORS preflight from `http://localhost:3000` → `204`
- security headers present (`CSP`, `X-Frame-Options`, `Referrer-Policy`, HSTS, `nosniff`)

---

## Known limitations

- **Database migration has not been applied.** PostgreSQL 18 is running locally with `scram-sha-256` authentication, but no credentials were supplied. Do not guess them. Provide `DATABASE_URL` and run `npm run db:migrate`.
- **No payment provider is contracted.** The architecture, webhook verification and idempotency exist; a real UPI/PayPal integration still requires merchant onboarding.
- **No AI provider is configured.** The adapter targets OpenAI-compatible chat completions.
- **No email notifications.** Leads are stored in PostgreSQL; outbound notification requires a future email integration.
- **No client portal, login, CRM or admin dashboard.** These are later milestones; the schema and API boundaries are ready for them.
- **Legal text is a draft**, not legal advice.
- **Portfolio and testimonials are not populated with client work.** Three portfolio entries are explicitly labelled design concepts; testimonials remain empty until verified reviews exist with publication consent.

---

## Documentation

| Document | Contents |
| --- | --- |
| [`SETUP.md`](./SETUP.md) | Prerequisites, install, database setup, run and troubleshooting |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | System design, boundaries, data model and key decisions |
| [`ENVIRONMENT.md`](./ENVIRONMENT.md) | Every environment variable with defaults and requirements |
| [`API.md`](./API.md) | Endpoints, payloads, responses, error codes and webhook contract |
| [`DEPLOYMENT.md`](./DEPLOYMENT.md) | Production deployment, migrations and launch checklist |
| [`docs/PRODUCT-SPEC.md`](./docs/PRODUCT-SPEC.md) | Original long-form product and requirements specification |

---

## Content integrity rules

1. No invented clients, projects, screenshots, testimonials, ratings or statistics.
2. No invented founder names, photographs, credentials, addresses, phone numbers or email addresses.
3. No invented payment IDs, UPI handles, QR codes or gateway credentials.
4. No claim that a payment was received without server-side verification.
5. No simulated AI answers when no provider is configured.
6. Third-party costs and package limits are stated explicitly; nothing is described as unlimited.
7. Concept demonstrations must be labelled as concepts, never as paid client work.

---

## License

MIT. See [`LICENSE`](./LICENSE).
