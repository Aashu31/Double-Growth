# Architecture

Double Growth V1 is a modular monolith: one repository, two deployable applications, three shared packages.

---

## 1. Principles

1. **Public website and backend are separate deployables.** The browser never talks to PostgreSQL directly.
2. **Server owns pricing and truth.** Package price comes from `packages/shared`, not the request body.
3. **Honest states over simulation.** Missing database, payment provider or AI provider produce explicit `503` responses with stable error codes. Nothing is faked.
4. **One contract, two consumers.** Zod schemas in `packages/validators` are used by the browser for inline validation and by the API for authoritative validation.
5. **No content invented.** Missing business facts are `null` in `siteConfig` and render pending-verification copy.
6. **Static-first frontend.** Public pages are statically generated; JavaScript is limited to interactive islands.

---

## 2. System map

```
Browser
  │
  │ HTTPS
  ▼
apps/web — Next.js 16 App Router (static pages + client islands)
  │
  │ JSON over HTTPS, NEXT_PUBLIC_API_URL
  ▼
apps/api — Fastify 5
  │  routes → services → repositories
  │
  ├── packages/validators   Zod schemas
  ├── packages/shared       services, package catalogue, enums
  ├── packages/database     Prisma schema + client
  │
  ▼
PostgreSQL 18
```

Deployment targets are independent: the website can be hosted on a static/CDN platform and the API on a Node host. The only coupling is `NEXT_PUBLIC_API_URL` plus the API's `WEB_URL` CORS allowlist.

---

## 3. Request flows

### 3.1 Page request

1. Next.js serves a prerendered route.
2. Interactive components hydrate: navigation menu, service filter, FAQ accordion, forms, chat widget.
3. No database call happens during page rendering, so the marketing site stays available during a database outage.

### 3.2 Lead capture

```
ContactForm
  → leadSchema.safeParse (client, inline errors)
  → POST /api/v1/leads
  → rate limit (5/min/IP)
  → leadSchema.safeParse (server, authoritative)
  → honeypot check ("website" must be empty)
  → repository.create → Prisma → Lead row
  → 201 { id, receivedAt }
```

If no repository exists: `503 DATABASE_NOT_CONFIGURED`. The form displays that message and does not show a success screen.

### 3.3 Order creation

```
CheckoutForm
  → orderSchema.safeParse
  → POST /api/v1/orders
  → server resolves package price from PACKAGES
  → repository.create (retries order-number collisions)
  → buildCheckoutTarget(config, order)
  → 201 { orderNumber, amountMinor, currency, status, payment }
```

`payment.enabled` is true only when a template is configured, contains `{orderNumber}`, parses as a URL, and is HTTPS (localhost excepted). Otherwise `checkoutUrl` is `null` and the response explains that online payment is unavailable.

### 3.4 Payment confirmation

```
Provider
  → POST /api/v1/payments/webhook (raw JSON body)
  → HMAC-SHA256 verification with UPI_WEBHOOK_SECRET
  → Zod validation
  → transaction:
       find order
       amount + currency must match
       insert PaymentEvent (unique provider+eventId)
       guarded status transition
  → 200 { orderNumber, status, duplicate }
```

Guarantees:

- A browser redirect, screenshot or client claim never changes payment state.
- Replaying the same `eventId` returns `duplicate: true` and changes nothing.
- A refunded order cannot be moved back to paid by a late paid event.
- A paid order is not downgraded by a late failure event.
- Mismatched amounts are rejected with `AMOUNT_MISMATCH`.

The endpoint accepts generic HMAC-signed provider callbacks. PayPal event verification requires a provider-specific verifier and is not enabled by a webhook ID alone.

### 3.5 Chat

```
ChatWidget (history kept in component state)
  → POST /api/v1/chat
  → chatSchema (message ≤ 1000 chars, history ≤ 12 items)
  → ChatProvider.reply
  → 200 { reply } | 503 AI_NOT_CONFIGURED | 502 AI_PROVIDER_ERROR
```

The provider adapter calls an OpenAI-compatible `/chat/completions` endpoint. The system prompt contains only approved facts (services, package, policy statements) and instructs the model not to invent clients, prices, contact details or guarantees. Chat is stateless on the server; no transcript is persisted.

---

## 4. Layer responsibilities

| Layer | Location | Responsibility |
| --- | --- | --- |
| Pages | `apps/web/src/app` | Route composition, metadata, static rendering |
| Components | `apps/web/src/components` | Layout, sections, forms, chat, UI primitives |
| Content | `apps/web/src/content` | Services, process, FAQ, pricing rules, legal drafts, portfolio data |
| Site config | `apps/web/src/lib/site.ts` | URL, navigation, `null` contact and founder placeholders |
| API app | `apps/api/src/app.ts` | Plugins, hooks, error contract, route registration; testable factory |
| Routes | `apps/api/src/routes` | HTTP concerns only: parse, delegate, shape response |
| Services | `apps/api/src/services` | AI adapter, checkout URL construction, signature verification |
| Repositories | `apps/api/src/repositories` | Ports (`types.ts`) and Prisma implementation |
| Contracts | `packages/validators` | Zod schemas shared across the boundary |
| Domain constants | `packages/shared` | Service catalogue, package price, enums |
| Persistence | `packages/database` | Prisma schema, generated client access |

Dependency rule: `apps/*` may import `packages/*`; `packages/*` never import `apps/*`. The web app never imports the database package.

---

## 5. Data model

Defined in `packages/database/prisma/schema.prisma`.

### Lead

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `cuid` | Primary key, returned to the client as reference |
| `name`, `email`, `phone` | text | Required, validated |
| `businessName` | text? | Optional |
| `service` | text | One of eight service ids |
| `budget` | text? | Enum-like range |
| `description` | text | 20–2000 characters |
| `preferredContact` | text? | email / phone / whatsapp |
| `consent` | boolean | Must be true at the API boundary |
| `source` | text | Defaults to `website` |
| `status` | enum | `NEW`, `CONTACTED`, `QUALIFIED`, `WON`, `LOST` |
| `createdAt`, `updatedAt` | timestamp | |

Indexes: `(status, createdAt)`, `(email)`.

### Order

| Field | Type | Notes |
| --- | --- | --- |
| `orderNumber` | text unique | `DG-YYYYMM-XXXXXXXXXX` |
| customer fields | text | Name, email, phone, business, GSTIN |
| `packageId` | text | Validated against the shared catalogue |
| `amountMinor` | int | Paise, set by the server |
| `currency` | text | `INR` |
| `status` | enum | `PENDING_PAYMENT`, `PAID`, `FAILED`, `CANCELLED`, `REFUNDED` |
| `provider`, `providerReference` | text? | Set when a payment event arrives |
| `paidAt` | timestamp? | Set once |
| `events` | relation | Payment audit trail |

Indexes: `(email, createdAt)`, `(status, createdAt)`.

### PaymentEvent

Immutable audit record for each provider event, with the raw payload stored as JSON.

- unique `(provider, eventId)` — idempotency key
- index `(orderId, createdAt)`
- cascade delete with the order

Money is stored in minor units (integers) to avoid floating-point errors.

---

## 6. Security model

| Control | Implementation |
| --- | --- |
| Input validation | Zod on client and server; server is authoritative |
| Spam | Hidden honeypot field; per-IP rate limits |
| Rate limiting | Global 120/min; leads 5/min; orders 10/min POST, 20/min lookup; chat 20/min; webhook 60/min |
| Transport headers | CSP, HSTS, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy, Permissions-Policy |
| CORS | Explicit origin allowlist from `WEB_URL` + localhost |
| XSS | React escaping; JSON-LD serialised with `<` escaped |
| SQL injection | Prisma parameterised queries |
| Secrets | Environment variables only; no key reaches the browser |
| Payment integrity | HMAC signature over the raw body; amount/currency check; unique event id |
| Order enumeration | Lookup requires both order number and matching email; generic 404 otherwise |
| Log redaction | Authorization, cookie and signature headers redacted; bodies not logged |
| Error leakage | Known errors map to stable codes; unexpected errors log server-side and return a generic message |
| Request size | 32 KB JSON body limit |

CSP allows inline scripts because Next.js emits inline bootstrap code; the policy still blocks third-party script, frame and object origins. A nonce-based policy would require all pages to become dynamic, which conflicts with the static-first goal for V1.

---

## 7. Design system

- **Palette:** midnight/navy base, electric blue accent, cyan secondary, white and mist surfaces.
- **Type:** Geist Sans, tight heading tracking, balanced text wrapping.
- **Tokens:** declared in `apps/web/src/app/globals.css` under Tailwind 4 `@theme` — colours, radius, shadows, container and section rhythm.
- **Primitives:** `Button`, `ButtonLink`, `SectionHeading`, `Brand`, `BrandMark`, `PageHero`, `Reveal`.
- **Motion:** Framer Motion reveals respect `prefers-reduced-motion`; CSS duration is also reduced globally.
- **Composition:** homepage sections are independent components assembled in `apps/web/src/app/page.tsx`; content lives in `content/*.ts`, not inline in JSX. Order: hero → brand introduction → services → why choose us → process → pricing → featured portfolio → testimonials → FAQ → final CTA → footer.
- **Responsive rules:** grid tracks use `minmax(0, …)` where long content could force a track wider than the viewport. The pricing comparison table is a labelled, keyboard-focusable scroll region on narrow screens.
- **Tests:** Vitest + jsdom + Testing Library cover portfolio filtering, FAQ disclosure, contact-form validation/success/failure, header/mobile navigation and chatbot states in `apps/web/src/**/*.test.tsx`.

Accessibility: skip link, semantic landmarks, labelled form controls, `aria-invalid` and `aria-describedby` on errors, visible focus rings, live regions for form and chat status, keyboard-operable accordion and menus.

---

## 8. Honest-state contract

The frontend maps these codes to specific copy:

| Code | HTTP | Meaning |
| --- | --- | --- |
| `DATABASE_NOT_CONFIGURED` | 503 | No `DATABASE_URL`; nothing was stored |
| `DATABASE_UNAVAILABLE` | 503 | Configured but unreachable; nothing was stored |
| `AI_NOT_CONFIGURED` | 503 | No AI provider; no answer generated |
| `AI_PROVIDER_ERROR` | 502 | Provider call failed; no fabricated answer |
| `PAYMENTS_NOT_CONFIGURED` | 503 | Webhook/payment provider absent; state unchanged |
| `INVALID_SIGNATURE` | 401 | HMAC mismatch; state unchanged |
| `AMOUNT_MISMATCH` | 400 | Verified amount/currency differs from the order |
| `ORDER_NOT_FOUND` | 404 | Unknown reference or email mismatch |
| `SPAM_REJECTED` | 400 | Honeypot triggered |
| `VALIDATION_ERROR` | 400 | Zod issues, with `fields` map |
| `RATE_LIMITED` | 429 | Limit exceeded |
| `INTERNAL_ERROR` | 500 | Unexpected; generic message only |

---

## 9. Extension seams

The V1 scope deliberately stops at the public website. These seams exist so later modules can attach without restructuring:

- **CRM / lead management** — `Lead` already carries `status`, `source` and timestamps; the repository port isolates storage.
- **Client portal** — no auth exists in V1. When added, sessions belong in the API, and the schema can add `User`/`Client` relations without changing public routes.
- **Sarthi school ERP** — presented as a platform module. It is not implemented here and must remain multi-tenant with strict isolation when built.
- **Order operations** — `PaymentEvent` provides the audit trail a finance view would read.
- **Email notifications** — a service can be added behind the lead/order repository calls; no schema change needed.

---

## 10. Key decisions

| Decision | Reason | Trade-off |
| --- | --- | --- |
| npm workspaces | npm already installed; pnpm/corepack unavailable | Slightly slower installs |
| Prisma 6.19.3 | Stable major; Prisma 8 is a release candidate | Manual major upgrade later |
| Price in `packages/shared` | One source for UI and server; no client-trusted amounts | Requires rebuild to change price |
| Static pages + client islands | Performance and availability | Interactive features require hydration |
| HMAC webhook, not redirect trust | Prevents forged payment confirmation | Requires provider-side signing setup |
| Honest 503 states | Avoids fake success and lost leads | Forms unusable until configured |
| Legal drafts marked in UI | Prevents implying reviewed policy | Must be replaced before launch |

---

## 11. Known gaps

- First database migration has not been applied (credentials not supplied).
- No real payment provider, AI provider or email provider is contracted.
- No committed browser automation suite. Responsive and interaction verification was performed with a temporary Chrome DevTools Protocol script across 17 pages and 8 widths; component-level behaviour is covered by Vitest.
- Portfolio entries are labelled design concepts, not client work; testimonials remain empty until verified reviews and consent exist.
- Sitemap uses build time as `lastModified` rather than per-page content dates.
