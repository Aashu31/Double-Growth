# Deployment

V1 is two independently deployable applications plus a PostgreSQL database. Nothing is deployed yet; `doublegrowth.in` is not live from this repository.

---

## 1. Topology

| Component | Recommended host | Notes |
| --- | --- | --- |
| Website (`apps/web`) | Vercel (or any Next.js host) | Static pages, CDN, automatic HTTPS |
| API (`apps/api`) | Render, Fly.io, Railway or a Node VPS | Long-running Node process, health checks |
| PostgreSQL | Neon, Supabase, RDS or managed Postgres | Requires TLS; use a pooled URL for the API if available |

Container definitions for both applications are provided in `deploy/`. They are optional; the recommended path is still a managed Next.js host for the website and a Node host for the API.

The API must not be hosted on a static-only platform. The website must not be hosted in a way that prevents Next.js from serving its build output.

---

## 2. Pre-deployment checklist

1. `npm run typecheck`, `npm run lint`, `npm test`, `npm run build` and `npm run test:e2e` all pass locally.
2. Production domain verified (`doublegrowth.in` and the API subdomain).
3. Legal pages reviewed and the draft banner removed by a qualified professional.
4. Contact details, founder identities and social profiles confirmed and added to `apps/web/src/lib/site.ts`.
5. Portfolio/testimonials contain only approved, real content. The current three entries must stay labelled "Design concept" until they are replaced by delivered, client-approved work.
6. Payment provider contracted (if online payment is launching).
7. AI provider contracted (if the assistant should answer automatically).
8. Email provider and verified sender domain configured (if notifications should be delivered).
9. Database backup and restore procedure confirmed with the provider.
10. `WEB_URL`, `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_API_URL` set to the final production origins.

Do not deploy with the draft legal banner while accepting payments. Removing the banner is a decision for the business owners after review.

---

## 3. Database

### 3.1 Create the production database

Use a managed PostgreSQL instance in the same region as the API. Require TLS (`sslmode=require`).

Store two connection strings:

- `DATABASE_URL` — pooled connection used by the running API
- `DIRECT_DATABASE_URL` — direct connection used only for migrations

If the provider does not offer pooling, both can be the same URL.

### 3.2 Apply migrations

Migrations are forward-only and must be applied before the new API version starts serving traffic.

From a trusted machine or CI step with the production `DATABASE_URL`/`DIRECT_DATABASE_URL`:

```bash
npx prisma migrate deploy --schema packages/database/prisma/schema.prisma
```

Or, from the repository root, run the workspace script:

```bash
npm run db:migrate:deploy
```

The first run creates the `Lead`, `Order`, `PaymentEvent`, `NewsletterSubscriber`, `Notification`, `ChatConversation`, `ChatMessage` and `AiUsage` tables plus their enums and indexes. The initial migration is committed at `packages/database/prisma/migrations/20261114160000_init/migration.sql`. Verify in the provider console and check `_prisma_migrations`.

For subsequent schema changes:

1. Create the migration locally with `npm run db:migrate`.
2. Review the generated SQL under `packages/database/prisma/migrations/`.
3. Use an expand-and-contract approach: add nullable columns/backfill first, remove old columns in a later release.
4. Apply with `migrate deploy` before deploying code that depends on the change.

Never run `prisma migrate dev` or `prisma db push` against production.

---

## 4. API deployment

### 4.1 Build and start

| Setting | Value |
| --- | --- |
| Root directory | repository root |
| Install | `npm install` |
| Build | `npm run build --workspace @double-growth/api` |
| Start | `node apps/api/dist/server.js` |
| Health check path | `/health` |
| Readiness path | `/health/ready` |

The build bundles workspace packages through tsup and leaves `@prisma/client` external, so `npm install` must run in the deployment environment (or dependencies must be included in the artifact).

The Prisma client is generated during install by the database package. If the host blocks postinstall scripts, add an explicit build step:

```bash
npm run db:generate && npm run build --workspace @double-growth/api
```

### 4.2 Environment variables

Set at minimum:

```dotenv
NODE_ENV=production
HOST=0.0.0.0
PORT=4000
TRUST_PROXY=true
LOG_LEVEL=info

WEB_URL=https://doublegrowth.in
DATABASE_URL=postgresql://...
DIRECT_DATABASE_URL=postgresql://...
```

Add payment and AI variables only after those providers are contracted. Full reference: [`ENVIRONMENT.md`](./ENVIRONMENT.md).

`TRUST_PROXY=true` is required for correct client IPs (and therefore rate limits) behind the host's proxy. Do not enable it if the API is directly exposed without a trusted proxy.

### 4.3 Verification

```bash
curl https://api.doublegrowth.in/health
curl https://api.doublegrowth.in/health/ready
```

Expected: `200` with `status: "ok"` and `checks.database: "ok"`. A `503` means the database URL, network access or credentials are wrong.

Test CORS:

```bash
curl -i -X OPTIONS https://api.doublegrowth.in/api/v1/leads \
  -H "Origin: https://doublegrowth.in" \
  -H "Access-Control-Request-Method: POST"
```

Expect `204` and `access-control-allow-origin: https://doublegrowth.in`.

### 4.4 API container

A multi-stage container is provided:

```bash
docker build -f deploy/api.Dockerfile -t double-growth-api .
docker run --rm -p 4000:4000 \
  -e DATABASE_URL="postgresql://..." \
  -e WEB_URL="https://doublegrowth.in" \
  double-growth-api
```

The image runs the same `node apps/api/dist/server.js` entry point, includes the generated Prisma client and has a `/health` health check. No secrets are baked into the image. The container was **not built in the development environment** because the Docker daemon was unavailable; build it once in staging before relying on it.

---

## 5. Website deployment

### 5.1 Vercel

| Setting | Value |
| --- | --- |
| Root directory | `apps/web` |
| Framework preset | Next.js |
| Install command | default (Vercel handles npm workspaces) |
| Build command | `npm run build` |
| Output | Next.js default |

If the host cannot resolve workspace packages from `apps/web`, set the root directory to the repository root and the build command to `npm run build --workspace @double-growth/web`.

Environment variables (needed at **build** time):

```dotenv
NEXT_PUBLIC_SITE_URL=https://doublegrowth.in
NEXT_PUBLIC_API_URL=https://api.doublegrowth.in
```

`NEXT_PUBLIC_*` values are embedded in the client bundle. Changing them requires a new deployment. Never put a secret in a `NEXT_PUBLIC_` variable.

### 5.2 Other Next.js hosts

Any Node host that supports `next build` and `next start` works:

```bash
npm install
npm run build --workspace @double-growth/web
npm run start --workspace @double-growth/web
```

The site uses no image optimisation at runtime beyond Next defaults, so a Node host is sufficient.

### 5.3 Website container

```bash
docker build -f deploy/web.Dockerfile \
  --build-arg NEXT_PUBLIC_SITE_URL=https://doublegrowth.in \
  --build-arg NEXT_PUBLIC_API_URL=https://api.doublegrowth.in \
  -t double-growth-web .
docker run --rm -p 3000:3000 double-growth-web
```

`NEXT_PUBLIC_*` values are compile-time, so rebuild when they change. Like the API image, this was **not built in the development environment**; verify it in staging.

---

## 6. Domains, DNS and TLS

1. Point the apex/`www` domain at the website host.
2. Point `api.doublegrowth.in` at the API host.
3. Redirect `www` to the apex (or the reverse) with a single canonical choice. Set `NEXT_PUBLIC_SITE_URL` to the canonical origin.
4. Enforce HTTPS on both hosts and keep HSTS enabled.
5. Update `WEB_URL` to the final website origin and `NEXT_PUBLIC_API_URL` to the final API origin, then redeploy both.

HSTS includes `preload`. Do not submit the domain to the preload list until every subdomain you control is permanently HTTPS.

---

## 7. Payment webhook configuration

1. Contract a provider and obtain the hosted checkout template and webhook secret.
2. Set `PAYMENTS_ENABLED=true` and `UPI_PAYMENT_LINK_TEMPLATE` with `{orderNumber}`.
3. Set `UPI_WEBHOOK_SECRET` to a long random value.
4. Register `https://api.doublegrowth.in/api/v1/payments/webhook` with the provider.
5. Confirm the provider signs the raw body with HMAC-SHA256 and sends it in `x-double-growth-signature`. If the provider uses a different header or scheme, adapt `verifyWebhookSignature` and `routes/webhooks.ts` — do not accept unsigned callbacks.
6. Run a signed test event with a known order and confirm the order becomes `PAID` and a `PaymentEvent` row exists.
7. Replay the same event and confirm `duplicate: true` with no second row.

The current endpoint does not verify PayPal signatures. PayPal requires a provider-specific verification call using `PAYPAL_WEBHOOK_ID`; implement that before enabling PayPal.

---

## 8. AI assistant configuration

Set `AI_PROVIDER=openai-compatible`, `AI_BASE_URL`, `AI_MODEL` and `AI_API_KEY`. The key stays server-side.

Without these variables the assistant reports `AI_NOT_CONFIGURED` and directs visitors to the contact page. Do not deploy a prompt that claims capabilities not present in the system prompt.

`AI_MONTHLY_REQUEST_LIMIT` (default 500) is an application-level guardrail stored in `AiUsage`. It is not a billing meter. Configure a hard spending limit at the provider as well.

---

## 9. Email configuration

Set `EMAIL_PROVIDER=resend`, `RESEND_API_KEY`, `EMAIL_FROM` and optionally `EMAIL_REPLY_TO` and `LEAD_NOTIFICATION_EMAIL`.

1. Verify the sending domain with Resend.
2. Publish SPF, DKIM and DMARC records.
3. Send a test lead and confirm the acknowledgement plus internal notification.
4. Check `Notification` rows: `SENT` means the provider accepted the message, not that it reached the inbox.
5. Without configuration, rows are `SKIPPED` and no email is sent.

---

## 10. Post-deployment verification

Run through this list on the production domain:

- [ ] All 15 public routes, `/pricing/checkout`, the 8 service detail pages and the 3 portfolio concept pages return `200`; unknown route returns the 404 page
- [ ] Homepage sections render in order and all CTAs navigate correctly
- [ ] Mobile navigation opens, closes and follows links at 390 px
- [ ] No horizontal overflow at 360, 390, 430, 768, 1024, 1280, 1440, 1920
- [ ] Contact form: invalid input blocked, valid input stored (check the database), success shows only after `201`
- [ ] Newsletter: valid address stored, duplicate is idempotent, honeypot rejected
- [ ] Order flow: order number issued, payment state reported honestly
- [ ] Payment creation: only payable orders receive a checkout target
- [ ] Chat: real answer with a provider, honest unavailable state without one, quota error after the cap
- [ ] Email: acknowledgement and internal lead notification delivered; `Notification` status is `SENT`
- [ ] Payment webhook: signed event applied once, replay ignored
- [ ] `/health` and `/health/ready` return `200`; `/health` reports configured integrations
- [ ] `robots.txt` and `sitemap.xml` reference the production domain and include `/solutions` and service pages
- [ ] Open Graph image and metadata render correctly
- [ ] Security headers present: CSP, HSTS, `X-Frame-Options`, `Referrer-Policy`, `nosniff`
- [ ] CORS rejects an unlisted origin
- [ ] Rate limits respond `429` under burst traffic
- [ ] Lighthouse: no critical accessibility or SEO failures

---

## 11. Operations

### Logging

The API logs structured JSON. Authorization, cookie and webhook-signature headers are redacted. Request bodies are never logged. Ship logs to the host's log drain and set an alert on repeated `INTERNAL_ERROR` or `DATABASE_UNAVAILABLE` entries.

### Monitoring

| Check | Signal |
| --- | --- |
| Uptime | `GET /health` every minute |
| Database | `GET /health/ready` every minute |
| Error rate | 5xx responses |
| Payment failures | webhook `4xx`/`5xx` and orders stuck in `PENDING_PAYMENT` |
| AI failures | `AI_PROVIDER_ERROR` and `AI_QUOTA_EXCEEDED` rate |
| Email failures | `Notification` rows with `FAILED` |

No external monitoring or error-tracking service is configured in V1.

### Backups

Enable automated daily backups and point-in-time recovery. Test a restore into a separate database at least once before launch, and after any major migration.

### Scaling

Rate limiting is in-process. If the API runs more than one instance, limits apply per instance; move to a shared store (for example Redis) or apply limits at the edge. The Prisma client should use a pooled database connection when multiple instances run.

### Rollback

1. Website: roll back to the previous deployment in the host dashboard.
2. API: redeploy the previous build.
3. Database: migrations are forward-only. Roll back code first; only reverse a schema change with a deliberate, reviewed migration. Never restore a backup over live data without confirming the data-loss window.

---

## 12. Secret rotation

| Secret | Procedure |
| --- | --- |
| `UPI_WEBHOOK_SECRET` | Generate a new value, update the API and provider together, redeploy, confirm a test event |
| `AI_API_KEY` | Rotate at the provider, update the API environment, redeploy |
| `RESEND_API_KEY` | Rotate in Resend, update the API environment, redeploy, send a test message |
| `DATABASE_URL` credentials | Create the new credential, update the API, verify readiness, remove the old credential |
| `PAYPAL_CLIENT_SECRET` | Rotate in the PayPal dashboard and the API environment |

After any rotation, re-run the post-deployment verification list.

---

## 13. What is not automated

- Infrastructure-as-code. DNS, hosts, environment variables and secret stores are configured manually.
- Automatic rollback. Website and API rollbacks are manual host actions; database migrations are forward-only.
- Container builds in CI. Dockerfiles are committed but were not built in the development environment.
- Visual-regression baselines. Screenshots are captured on demand, not compared against stored baselines.
- Uptime, error tracking and alerting. Add a monitoring service before launch.

CI is committed at `.github/workflows/ci.yml` and runs install, Prisma generation, typecheck, lint, tests, build and Playwright E2E on pushes and pull requests.
