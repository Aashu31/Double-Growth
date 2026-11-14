# Project Audit

Date: 14 November 2026
Baseline commit: `3c1dc92 feat: complete Double Growth official website (Feature 01)`

This audit records what existed, what was missing, what changed, and what remains unverified. It is a working engineering record, not a marketing claim.

---

## 1. Scope

The goal was to take the existing Double Growth monorepo from a complete-but-narrow V1 to the full V3 public website and platform foundation:

- all public routes, including service detail pages and a solutions page
- a shared catalogue so the website and API cannot disagree
- newsletter capture, payment creation, transactional email, AI usage guardrails and notification logging
- an honest integration model where missing credentials produce explicit unavailable states
- unit, component, end-to-end and visual QA
- documentation, CI and deployment artefacts

Content-integrity rules remained mandatory: no invented clients, testimonials, founders, metrics, contact details, payments or AI answers.

---

## 2. Baseline findings

### Strong foundations

- npm workspace monorepo with clear boundaries: `apps/web`, `apps/api`, `packages/shared`, `packages/validators`, `packages/database`.
- Next.js 16 App Router, React 19, Tailwind 4, Fastify 5, Prisma 6 and TypeScript 5.9 were already installed and building.
- Server-owned pricing, HMAC-verified payment webhooks, honeypot fields, rate limits and honest `503` states were already implemented.
- 34 tests passed at baseline (15 API, 9 validators, 10 web).
- Legal pages were visibly marked as drafts; contact details and testimonials were correctly `null`/empty.

### Gaps found

| Area | Finding |
| --- | --- |
| Content ownership | Service, pricing and portfolio copy was duplicated between `apps/web/src/content` and API-facing shared constants. |
| Service depth | The catalogue listed eight services but had no individual service pages. |
| Solutions | No outcome-led `/solutions` route; navigation and sitemap omitted it. |
| Backend coverage | No public catalogue endpoints, newsletter endpoint, payment-creation endpoint or transactional email adapter. |
| AI controls | No usage guardrail, no conversation logging and no quota response. |
| Database | Schema had no committed migration; `Lead`, `Order` and `PaymentEvent` were the only models. |
| QA | No committed end-to-end suite and no repeatable screenshot audit. |
| Docs | README counts, route lists and integration status lagged behind the code. |
| Deployment | No committed CI workflow or container definitions. |

---

## 3. Remediation delivered

### Shared source of truth

`packages/shared` now owns:

- `catalogue.ts` — eight full service definitions, FAQs and process steps
- `portfolio.ts` — three explicitly labelled design concepts
- `pricing.ts` — ₹3,999 annual package, inclusions, exclusions and policies
- `solutions.ts` — five outcome-led solutions and shared FAQ content

The web content adapters (`apps/web/src/content/*`) map shared data into page-ready shapes. The API serves the same data. No second marketing catalogue was added to PostgreSQL.

### Public experience

- Eight statically generated `/services/[slug]` pages with metadata, Service and FAQ JSON-LD, scope, process, related concepts and a scoped enquiry CTA.
- New `/solutions` page with an accessible tabbed explorer, five outcomes, scope steps, honest boundaries and FAQ.
- Shared art system: inline SVG service visuals, project visuals and a growth-orbit motif. No remote stock images.
- Header dropdown, mobile navigation, footer newsletter form, redesigned hero, service and project cards.
- Hydration-safe scroll reveals that respect `prefers-reduced-motion`.

### Backend

- Read-only catalogue routes: services, solutions, pricing and portfolio.
- Newsletter subscription with validation, honeypot, idempotent email handling and welcome email attempt.
- Payment-creation route for an existing order; it never marks an order paid.
- Resend transactional email adapter with `sent` / `failed` / `skipped` outcomes.
- Notification log written for lead, order, payment and newsletter messages.
- AI monthly request guardrail, per-process fallback, conversation logging and `AI_QUOTA_EXCEEDED`.
- Expanded Prisma schema: newsletter subscribers, notifications, chat conversations/messages and AI usage.
- Committed initial SQL migration generated from the schema (no database connection required).

### Verification

- Typecheck passes in all five workspaces.
- Lint passes.
- 43 unit/component tests pass (21 API, 12 validators, 10 web).
- 28 Playwright tests pass (14 scenarios × desktop and mobile projects).
- Visual audit captures 27 routes at 3 viewports (81 screenshots).
- Production build succeeds for web and API.

Exact current results are recorded in [`TESTING.md`](./TESTING.md) and [`VISUAL_QA_REPORT.md`](./VISUAL_QA_REPORT.md).

---

## 4. Deliberate non-decisions

These remain unchanged on purpose:

- **No invented business facts.** Contact details, founder identities, client work and testimonials stay empty until supplied and approved.
- **No database credentials guessed.** The local PostgreSQL server requires credentials that were never provided.
- **No simulated payments or AI answers.** Missing providers produce explicit errors.
- **No database copy of the marketing catalogue.** Version-controlled content is simpler and cannot drift.
- **No admin/CRM/client portal.** These are later milestones; the repository boundaries are prepared but the features do not exist.

---

## 5. Remaining risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Migration not applied to a live database | Persistence endpoints remain `503` | Supply `DATABASE_URL`, then run `npm run db:migrate:deploy` |
| No payment provider contracted | Checkout records orders only | Contract a provider and configure the signed webhook before accepting money |
| No email provider configured | Notification rows are `SKIPPED` | Configure Resend and verify the sender domain |
| Legal pages are drafts | Cannot launch commercially as-is | Qualified legal review before launch |
| Portfolio is conceptual | Cannot be presented as client proof | Replace with approved delivered work |
| In-process rate limits and AI counters | Per-instance, not global | Use a shared store or edge limits when scaling |
| No real-user monitoring | Failures depend on logs | Add uptime and error tracking before launch |
