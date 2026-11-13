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
- `POST /api/v1/orders` returns `503 DATABASE_NOT_CONFIGURED`
- order lookup returns `503`
- `/health/ready` returns `503` with `database: "not_configured"`
- the website itself keeps working

---

## AI chatbot

| Variable | Default | Required | Description |
| --- | --- | --- | --- |
| `AI_PROVIDER` | empty | No | Only `openai-compatible` is supported |
| `AI_BASE_URL` | empty | No | Base URL, e.g. `https://api.openai.com/v1` |
| `AI_MODEL` | empty | No | Chat model identifier, e.g. `gpt-4o-mini` |
| `AI_API_KEY` | empty | No | Server-side key. Never exposed to the browser. |
| `AI_MONTHLY_BUDGET_INR` | `2000` | No | Reserved. Not enforced by the application in V1; budget control must be configured at the provider. |

All four of `AI_PROVIDER`, `AI_BASE_URL`, `AI_MODEL` and `AI_API_KEY` must be present. Otherwise `POST /api/v1/chat` returns `503 AI_NOT_CONFIGURED` and the widget tells the visitor the assistant is unavailable.

Example:

```dotenv
AI_PROVIDER=openai-compatible
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4o-mini
AI_API_KEY=sk-...
```

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
| `EMAIL_API_KEY`, `EMAIL_FROM`, `LEAD_NOTIFICATION_EMAIL` | Present in `.env.example` for a future email integration. V1 stores leads in PostgreSQL and does not send email. |

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

Optional, only when contracted: `AI_*`, `PAYMENTS_ENABLED`, `UPI_PAYMENT_LINK_TEMPLATE`, `UPI_WEBHOOK_SECRET`, `PAYPAL_*`.
