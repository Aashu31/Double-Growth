# Double Growth — Official Website

**Build Digital. Grow Business.**

The official public website for **Double Growth**, a two-founder digital solutions agency. It presents the service catalogue, outcome-led solutions, the annual package, delivery process, legal policies, and a validated enquiry, newsletter and order pipeline.

This repository is a modular monorepo containing the Next.js frontend, the Fastify API, shared contracts, validators and the Prisma data layer.

---

## Current status

| Area | Status |
| --- | --- |
| Public website | Implemented: 15 top-level routes, 8 service detail pages, 3 concept detail pages |
| Homepage sections (10) | Hero, brand intro, services, why choose us, process, pricing, portfolio, testimonials, FAQ, final CTA |
| Solutions | Implemented: five outcomes, accessible tab explorer, FAQ and JSON-LD |
| Contact / lead capture | Implemented end to end; **requires a database to persist** |
| Newsletter | Implemented; **requires a database to store**, email delivery optional |
| Order creation and lookup | Implemented; payment provider **not configured** |
| Payment creation and webhook | Implemented with HMAC verification and idempotency; **not configured** |
| Transactional email | Adapter and templates implemented; **no provider configured** (recorded as `SKIPPED`) |
| AI chatbot | Interface, quota guard and conversation logging implemented; **no AI provider configured** |
| Portfolio | Three clearly labelled design concepts; **no client projects published** |
| PostgreSQL schema | 8 models; initial migration committed; **not applied** (no credentials) |
| Automated checks | Typecheck, lint, 43 unit/component tests, 28 Playwright tests, production build — all pass |
| Visual QA | 81 screenshots across 27 routes × 3 viewports, 0 structural failures |
| Deployment | Not deployed. `doublegrowth.in` is **not live** from this repository |

No client projects, testimonials, statistics, payment IDs, founder identities or contact details are invented anywhere in the site. Missing information renders as a clearly marked pending-verification placeholder.

Legal pages are marked **Draft for legal review** and must be reviewed by a qualified professional before commercial launch.

---

## Stack (installed versions)

**Web:** Next.js `16.4.6` (App Router), React `19.3.1`, TypeScript `5.9.3`, Tailwind CSS `4.3.5`, Framer Motion `14.14.0`, Lucide `1.72.0`
**API:** Node.js `>=20.9` (built on `26.13.0`), Fastify `5.12.8`, Zod `4.6.7`
**Data:** PostgreSQL `18` (local server), Prisma `6.19.3`
**Testing:** Vitest `5.1`, Testing Library, Playwright `1.65`
**Tooling:** npm workspaces, ESLint `10`, tsup `9`, GitHub Actions

`@tanstack/react-query` is not used: the current forms call the API directly and do not need a query cache. Do not describe it as integrated.

---

## Repository layout

```
apps/
  web/                 Next.js public website
    src/app/           15 public routes + service/project details + system routes
    src/components/    layout, home, services, solutions, forms, chat, art, ui
    src/content/       adapters over the shared catalogue
    src/lib/           site config, API client, formatting
  api/                 Fastify API
    src/routes/        health, catalogue, leads, newsletter, orders,
                       payments, chat, webhooks
    src/repositories/  repository ports + Prisma implementation
    src/services/      AI adapter, email, notifications, payments, usage
    src/app.ts         app factory (usable in tests)
    src/server.ts      process entry point
packages/
  shared/              company, services, solutions, portfolio, pricing, enums
  validators/          Zod request schemas shared by web and API
  database/            Prisma schema, initial migration and client access
scripts/
  visual-audit.mjs     screenshot and structural QA audit
tests/e2e/             Playwright public-site suite
deploy/                API and website Dockerfiles
docs/
  PRODUCT-SPEC.md      original long-form product and requirements specification
```

---

## Routes

### Public pages (15)

| Route | Purpose |
| --- | --- |
| `/` | Hero, brand introduction, 8 services, why choose us, 5-step process, pricing, portfolio, testimonials, FAQ, final CTA |
| `/services` | Filterable service catalogue with search, problems, features, outcomes and technologies |
| `/solutions` | Five outcome-led solutions with scope, evidence, related services and boundaries |
| `/pricing` | ₹3,999/year package, inclusions, exclusions, comparison, hosting/support/ownership policies and FAQ |
| `/pricing/checkout` | Order form, order summary and payment status interface (noindex) |
| `/how-it-works` | Five delivery stages, principles and client responsibilities |
| `/portfolio` | Category filters, search and three clearly labelled design concepts |
| `/about` | Company, mission, vision, values, two-founder roles and approach |
| `/contact` | Validated enquiry form with consent and spam protection |
| `/faq` | 11 questions with FAQ structured data |
| `/maintenance` | Maintenance and support scope, limits and request process |
| `/privacy`, `/terms`, `/refund-policy`, `/ownership` | Draft legal documents with review banner |

### Generated detail pages (11)

- `/services/[slug]` — eight service pages with scope, process, related concepts, FAQ and JSON-LD.
- `/portfolio/[slug]` — three concept pages, each labelled as a design concept.

### System and SEO

- `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/icon.svg`
- Branded 404, error and loading states
- Security headers from `next.config.ts`

API endpoints are documented in [`API.md`](./API.md).

---

## Quick start

```bash
npm install
cp .env.example .env      # Windows: Copy-Item .env.example .env
npm run db:generate
npm run dev               # web on :3000, API on :4000
```

The website runs without a database. Forms show an honest "not configured" state until `DATABASE_URL` is set and the migration is applied. See [`SETUP.md`](./SETUP.md) for the full procedure.

### Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Run web and API together |
| `npm run dev:web` / `npm run dev:api` | Run one workspace |
| `npm run build` | Production build of both apps |
| `npm run typecheck` | TypeScript check across all workspaces |
| `npm run lint` | ESLint for the web app |
| `npm test` | Vitest suites (API, validators and frontend components) |
| `npm run test:e2e` | Playwright public-site suite (28 tests) |
| `npm run audit:visual` | Capture 81 screenshots and structural QA results |
| `npm run verify` | Typecheck → lint → unit tests → build |
| `npm run db:generate` | Generate the Prisma client |
| `npm run db:migrate` | Create/apply a development migration |
| `npm run db:migrate:deploy` | Apply committed migrations |
| `npm run db:studio` | Open Prisma Studio |

---

## Configuration

Every integration is optional at build time and reports its real state at runtime:

- **Database** — without `DATABASE_URL`, persistence endpoints return `503 DATABASE_NOT_CONFIGURED` and store nothing.
- **Payments** — without a provider template and secret, orders are recorded as pending and no checkout link is generated. A browser redirect is never treated as proof of payment.
- **Email** — without Resend credentials, notification attempts are recorded as `SKIPPED`; the site never claims a message was delivered.
- **AI chatbot** — without provider credentials, the widget says the assistant is unavailable and directs visitors to the contact page. A monthly request cap limits cost when configured.
- **Contact details** — email, phone, address and founder identities are `null` in code until confirmed.

See [`ENVIRONMENT.md`](./ENVIRONMENT.md) for every variable.

---

## Verification performed

```
npm run typecheck   ✓ all workspaces
npm run lint        ✓ no errors
npm test            ✓ 43 tests (21 API, 12 validators, 10 frontend)
npm run test:e2e    ✓ 28 tests (14 scenarios × desktop + mobile)
npm run audit:visual ✓ 81 captures, 0 structural failures
npm run build       ✓ web and API production builds
```

Frontend tests cover portfolio filtering, FAQ disclosure, contact-form validation/success/failure paths, header/mobile navigation and chatbot open/send/unavailable/reset behaviour. API tests cover catalogue, leads, newsletter, orders, payment creation, webhook verification, chat quota and honest integration states.

Visual QA captured 27 routes at 1440, 768 and 390 px. Each capture checks status, title, one `h1`, horizontal overflow, broken images, `main` landmark, console errors, page errors and failed requests. Results are in [`VISUAL_QA_REPORT.md`](./VISUAL_QA_REPORT.md); screenshots are regenerated into the git-ignored `artifacts/visual-qa/` directory.

---

## Known limitations

- **Database migration has not been applied.** PostgreSQL 18 is running locally with `scram-sha-256` authentication, but no credentials were supplied. Do not guess them. Provide `DATABASE_URL` and run `npm run db:migrate:deploy`.
- **No payment provider is contracted.** The architecture, webhook verification and idempotency exist; a real UPI/PayPal integration still requires merchant onboarding. PayPal-specific signature verification is not implemented.
- **No AI provider is configured.** The adapter targets OpenAI-compatible chat completions.
- **No email provider is configured.** Resend is supported; without a key and verified sender, sends are skipped.
- **No client portal, login, CRM or admin dashboard.** These are later milestones; the schema and API boundaries are ready for them.
- **Legal text is a draft**, not legal advice.
- **Portfolio and testimonials are not populated with client work.** Three portfolio entries are explicitly labelled design concepts; testimonials remain empty until verified reviews exist with publication consent.
- **Containers were not built in this environment.** Dockerfiles are provided, but the Docker daemon was unavailable, so only the underlying `npm run build` was verified.

---

## Documentation

| Document | Contents |
| --- | --- |
| [`SETUP.md`](./SETUP.md) | Prerequisites, install, database setup, run and troubleshooting |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | System design, boundaries, data model and key decisions |
| [`DATABASE.md`](./DATABASE.md) | Schema, migration workflow, invariants and privacy notes |
| [`ENVIRONMENT.md`](./ENVIRONMENT.md) | Every environment variable with defaults and requirements |
| [`API.md`](./API.md) | Endpoints, payloads, responses, error codes and webhook contract |
| [`DEPLOYMENT.md`](./DEPLOYMENT.md) | Production deployment, migrations, containers and launch checklist |
| [`SECURITY.md`](./SECURITY.md) | Threats, controls and known limitations |
| [`TESTING.md`](./TESTING.md) | Test layers, commands and results |
| [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) | Visual language, tokens and components |
| [`PROJECT_AUDIT.md`](./PROJECT_AUDIT.md) | Baseline audit and remediation record |
| [`IMPLEMENTATION_STATUS.md`](./IMPLEMENTATION_STATUS.md) | Requirement-to-status matrix |
| [`VISUAL_QA_REPORT.md`](./VISUAL_QA_REPORT.md) | Screenshot and structural QA report |
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
