# Environment Variables

The application never hardcodes credentials. Copy `.env.example` to `.env` and fill in only what you need.

The API loads environment files in this order, without overriding already-set variables: `apps/api/.env.local`, `apps/api/.env`, repository-root `.env`. The web app reads `NEXT_PUBLIC_*` variables at build time.

---

## Core

| Variable | Default | Required | Description |
| --- | --- | --- | --- |
| `NODE_ENV` | `development` | Recommended | `development`, `test` or `production` |
| `HOST` | `0.0.0.0` | No | API bind address |
| `PORT` | `4000` | No | API port |
| `LOG_LEVEL` | `info` | No | `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent` |
| `TRUST_PROXY` | `false` | Production behind a proxy: `true` | Trust `X-Forwarded-For` for rate limiting. Only enable when a trusted proxy sets it. |

---

## URLs and CORS

| Variable | Default | Required | Description |
| --- | --- | --- | --- |
| `WEB_URL` | — | Yes in production | Public website origin allowed by CORS, e.g. `https://doublegrowth.in`. `http://localhost:3000` is always allowed. |
| `NEXT_PUBLIC_SITE_URL` | `https://doublegrowth.in` | Yes in production | Canonical site URL used for metadata, sitemap, robots and JSON-LD. No trailing slash. |
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000` | Yes in production | API origin used by the browser and by the website CSP `connect-src`. Set at build time. |

If the site or API moves to another host, update all three and redeploy both applications.

---

## Database

| Variable | Default | Required | Description |
| --- | --- | --- | --- |
| `DATABASE_URL` | empty | Yes for persistence | PostgreSQL connection string, e.g. `postgresql://user:pass@host:5432/double_growth?schema=public` |
| `DIRECT_DATABASE_URL` | empty | Only for pooled hosts | Reserved for non-pooled migration connections. Prisma currently uses `DATABASE_URL`. |

When `DATABASE_URL` is empty:

- `POST /api/v1/leads` returns `503 DATABASE_NOT_CONFIGURED`
- `POST /api/v1/newsletter` returns `503 DATABASE_NOT_CONFIGURED`
- `POST /api/v1/orders` returns `503 DATABASE_NOT_CONFIGURED`
- order lookup and payment creation return `503`
- chat still answers when configured, using a per-process usage counter, but transcripts are not stored
- `/health/ready` returns `503` with `database: "not_configured"`
- catalogue endpoints and the website itself keep working

---

## AI chatbot

| Variable | Default | Required | Description |
| --- | --- | --- | --- |
| `AI_PROVIDER` | empty | No | Only `openai-compatible` is supported |
| `AI_BASE_URL` | empty | No | Base URL, e.g. `https://api.openai.com/v1` |
| `AI_MODEL` | empty | No | Chat model identifier, e.g. `gpt-4o-mini` |
| `AI_API_KEY` | empty | No | Server-side key. Never exposed to the browser. |
| `AI_MONTHLY_REQUEST_LIMIT` | `500` | No | Application-level monthly request guardrail. Stored in `AiUsage` with a database, otherwise in a per-process map. Not a billing meter. |

All four of `AI_PROVIDER`, `AI_BASE_URL`, `AI_MODEL` and `AI_API_KEY` must be present. Otherwise `POST /api/v1/chat` returns `503 AI_NOT_CONFIGURED` and the widget tells the visitor the assistant is unavailable.

Example:

```dotenv
AI_PROVIDER=openai-compatible
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4o-mini
AI_API_KEY=sk-...
AI_MONTHLY_REQUEST_LIMIT=500
```

The request cap is a guardrail, not a spending guarantee. Configure a hard limit at the provider too. Exhaustion returns `429 AI_QUOTA_EXCEEDED`.

---

## Email notifications

| Variable | Default | Required | Description |
| --- | --- | --- | --- |
| `EMAIL_PROVIDER` | empty | No | Only `resend` is supported |
| `RESEND_API_KEY` | empty | No | Server-side key. Never exposed to the browser. |
| `EMAIL_FROM` | empty | With Resend | Verified sender, e.g. `Double Growth <hello@doublegrowth.in>` |
| `EMAIL_REPLY_TO` | empty | No | Optional reply-to address |
| `LEAD_NOTIFICATION_EMAIL` | empty | No | Internal inbox for new lead notifications |

`EMAIL_PROVIDER=resend` requires both `RESEND_API_KEY` and `EMAIL_FROM`; otherwise email is treated as unconfigured. Every attempt is recorded in `Notification` as `SENT`, `FAILED` or `SKIPPED`. A send failure never fails the lead, order or newsletter request.

Example:

```dotenv
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_...
EMAIL_FROM="Double Growth <hello@doublegrowth.in>"
EMAIL_REPLY_TO="hello@doublegrowth.in"
LEAD_NOTIFICATION_EMAIL="hello@doublegrowth.in"
```

Verify the sending domain with the provider and set SPF, DKIM and DMARC before launch.

---

## Payments

| Variable | Default | Required | Description |
| --- | --- | --- | --- |
| `PAYMENTS_ENABLED` | `false` | No | Must be `true` to generate checkout links |
| `UPI_PAYMENT_LINK_TEMPLATE` | empty | No | Hosted payment URL template. Must be HTTPS and contain `{orderNumber}`. Supports `{amountMinor}` and `{currency}`. |
| `UPI_WEBHOOK_SECRET` | empty | Required for webhooks | Shared secret used to verify the `x-double-growth-signature` HMAC-SHA256 header |
| `PAYPAL_CLIENT_ID` | empty | No | Reserved for a future PayPal integration |
| `PAYPAL_CLIENT_SECRET` | empty | No | Reserved. Server-side only. |
| `PAYPAL_WEBHOOK_ID` | empty | No | Reserved. A webhook ID alone does not verify PayPal signatures; provider-specific verification is not implemented. |

Template example:

```dotenv
PAYMENTS_ENABLED=true
UPI_PAYMENT_LINK_TEMPLATE=https://pay.example.com/checkout?ref={orderNumber}&amount={amountMinor}&currency={currency}
UPI_WEBHOOK_SECRET=replace-with-a-long-random-secret
```

If the template is missing, is not HTTPS, or lacks `{orderNumber}`, payment is reported as unavailable and no link is issued. Orders are still recorded.

Do **not** put a real UPI ID, QR code or gateway key in source code or documentation. The provider must be contracted and configured through environment variables.

---

## Reserved / not currently read

| Variable | Status |
| --- | --- |
| `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_WEBHOOK_ID` | Reserved for a future PayPal integration. A webhook ID alone does not verify PayPal signatures; provider-specific verification is not implemented. |
| `AI_MONTHLY_BUDGET_INR` | Retired. Use `AI_MONTHLY_REQUEST_LIMIT` plus a provider-side spend cap. |
| `DIRECT_DATABASE_URL` | Reserved for pooled hosts; Prisma currently uses `DATABASE_URL`. |

---

## Secret handling

1. Never commit `.env`, `.env.local` or any file containing secrets. Both are git-ignored.
2. Use different credentials per environment (local, staging, production).
3. Store production secrets in the hosting provider's secret manager, not in the repository or build logs.
4. Rotate `UPI_WEBHOOK_SECRET` and AI keys if they are exposed; update the provider configuration at the same time.
5. `NEXT_PUBLIC_*` values are public by definition. Never prefix a secret with `NEXT_PUBLIC_`.

---

## Production minimum

```dotenv
NODE_ENV=production
HOST=0.0.0.0
PORT=4000
TRUST_PROXY=true
LOG_LEVEL=info

WEB_URL=https://doublegrowth.in
NEXT_PUBLIC_SITE_URL=https://doublegrowth.in
NEXT_PUBLIC_API_URL=https://api.doublegrowth.in

DATABASE_URL=postgresql://...        # pooled connection if supported
DIRECT_DATABASE_URL=postgresql://... # direct connection for migrations
```

Optional, only when contracted: `AI_*`, `EMAIL_PROVIDER`, `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_REPLY_TO`, `LEAD_NOTIFICATION_EMAIL`, `PAYMENTS_ENABLED`, `UPI_PAYMENT_LINK_TEMPLATE`, `UPI_WEBHOOK_SECRET`, `PAYPAL_*`.

Without the optional values, the API reports those integrations as not configured and never simulates their effects.
