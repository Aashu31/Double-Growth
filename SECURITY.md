# Security

This document describes the controls implemented in the repository and the limits of those controls. It is not a certification, and no penetration test has been performed.

---

## 1. Scope and threat model

Protected assets:

- customer enquiries, orders and personal data
- payment state integrity
- provider and API credentials
- AI usage cost
- site availability and brand trust

Most likely threats for a public marketing site with a small API:

| Threat | Impact | Primary controls |
| --- | --- | --- |
| Spam or automated form abuse | Junk leads, email cost | Honeypot, per-IP rate limits, validation |
| Forged payment confirmation | False `PAID` order | HMAC over the raw body, amount/currency checks, unique event id |
| Order enumeration | Personal data leak | Reference **and** email required; generic 404 |
| Injection | Data loss or takeover | Prisma parameterised queries, Zod validation, React escaping |
| Cross-site scripting | Session/data theft, defacement | React escaping, escaped JSON-LD, restrictive CSP |
| Cross-origin abuse | Unauthorised API calls | Explicit CORS allowlist |
| Secret leakage | Provider takeover, cost | Server-only env vars, log redaction, git-ignored files |
| AI prompt/cost abuse | Unexpected spend | Request cap, input limits, approved-facts prompt |
| Denial of service | Site/API unavailable | Body limit, rate limits, host-level protection |
| Dependency compromise | Supply-chain attack | Lockfile, pinned versions, audit workflow |

There is no user authentication or client portal in this version, so session hijacking, privilege escalation and password storage are out of scope until those features exist.

---

## 2. Transport and headers

### Website (`apps/web/next.config.ts`)

| Header | Value |
| --- | --- |
| `Content-Security-Policy` | `default-src 'self'`; scripts self + inline (Next bootstrap); styles self + inline; images self/data/blob; fonts self/data; `connect-src` self + API origin; `form-action 'self'`; `frame-ancestors 'none'`; `object-src 'none'`; `base-uri 'self'`; upgrade-insecure-requests in production |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | camera, microphone, geolocation and payment disabled |
| `Strict-Transport-Security` | 2 years, includeSubDomains, preload |

`'unsafe-inline'` is required for Next.js inline bootstrap and styles. Removing it would require a nonce-based policy and dynamic rendering; that trade-off is documented rather than hidden. Do not submit the domain to the HSTS preload list until every subdomain is permanently HTTPS.

### API (`apps/api/src/app.ts`)

- `@fastify/helmet` with CSP disabled (JSON API) and `cross-origin-resource-policy: same-site`.
- CORS allowlist from `WEB_URL` plus `http://localhost:3000`.
- Methods `GET`, `POST`, `OPTIONS`; header `Content-Type`; preflight cache 10 minutes.
- Requests without an `Origin` header are allowed for server-to-server and CLI use.

---

## 3. Input validation

- Zod schemas in `packages/validators` are the single contract, used by the browser for inline feedback and by the API as the authority.
- Fastify body limit: **32 KB**.
- Unknown JSON fields are ignored by the schema rather than trusted.
- Honeypot field `website` must be empty on lead, order and newsletter forms.
- Order amount is never accepted from the client; the server reads the package price from `@double-growth/shared`.
- Email addresses are trimmed and lowercased before storage and lookup.
- Order lookup requires both `orderNumber` and the matching email; a mismatch returns the same `404` as an unknown order.
- Chat input is capped at 1000 characters; history at 12 items × 2000 characters.
- Webhook payload is validated after signature verification.

---

## 4. Payment integrity

1. `UPI_WEBHOOK_SECRET` must be configured, otherwise `503 PAYMENTS_NOT_CONFIGURED`.
2. The `x-double-growth-signature` header must match an HMAC-SHA256 of the **exact raw body**.
3. Signature comparison is constant-time.
4. Payload is validated.
5. PayPal events require PayPal configuration; otherwise `503`.
6. A database must be available.
7. The order must exist; amount and currency must match.
8. `(provider, eventId)` is unique, so replays are no-ops.
9. A refunded order is never moved back to paid; a paid order is never downgraded by a late failure.
10. A browser redirect or client claim never changes payment state.

A hosted checkout URL is generated only when `PAYMENTS_ENABLED=true`, a template exists, it parses as a URL, contains `{orderNumber}` and uses HTTPS (localhost excepted).

**PayPal caveat:** the generic HMAC endpoint does not implement PayPal’s provider-specific signature verification. Do not enable PayPal until a verifier using `PAYPAL_WEBHOOK_ID` is implemented and tested.

---

## 5. Rate limiting

Global: 120 requests/minute/IP. Endpoint overrides:

| Endpoint | Limit |
| --- | --- |
| `POST /api/v1/leads` | 5/min |
| `POST /api/v1/orders` | 10/min |
| `GET /api/v1/orders/:orderNumber` | 20/min |
| `POST /api/v1/chat` | 20/min |
| `POST /api/v1/newsletter` | 5/min |
| `POST /api/v1/payments/create` | 10/min |
| `POST /api/v1/payments/webhook` | 60/min |

Limits are per API process and keyed by client IP. Behind a trusted proxy set `TRUST_PROXY=true`; otherwise leave it false so clients cannot spoof `X-Forwarded-For`. With multiple instances, use a shared store or edge limits.

The AI monthly request cap (`AI_MONTHLY_REQUEST_LIMIT`, default 500) is a guardrail, not billing. It is stored in `AiUsage` when a database exists and in a per-process map otherwise.

---

## 6. Secrets

| Secret | Storage | Exposure |
| --- | --- | --- |
| `DATABASE_URL` | environment | server only |
| `UPI_WEBHOOK_SECRET` | environment | server only |
| `AI_API_KEY` | environment | server only |
| `RESEND_API_KEY` | environment | server only |
| `PAYPAL_CLIENT_SECRET` | environment | server only |
| `NEXT_PUBLIC_*` | build-time public | intentionally public |

Rules:

- `.env`, `.env.local` and `*.pem`/`*.key` are git-ignored; `.env.example` is the only committed template.
- Never prefix a secret with `NEXT_PUBLIC_`; it is embedded in the browser bundle.
- Do not put real UPI IDs, QR codes or gateway keys in source or documentation.
- Redact secrets from logs (headers are redacted by Fastify) and error responses.
- Rotate a secret immediately if it appears in a commit, screenshot or log.
- Use separate credentials for local, staging and production.

---

## 7. Logging and error handling

- Fastify logs structured JSON and redacts `authorization`, `cookie` and `x-double-growth-signature` headers.
- Request bodies are not logged.
- Known errors map to stable codes and safe messages.
- Unexpected errors are logged server-side and return a generic `INTERNAL_ERROR`.
- `Cache-Control: no-store` is set for `/api/*` and `/health*`.
- Notification and chat logging failures are swallowed so telemetry cannot break a successful business operation, but the real delivery status is recorded in `Notification`.
- Health endpoints expose integration **configured/not_configured** states, not credentials.

---

## 8. Email and AI considerations

### Email

- The Resend key stays server-side.
- Without configuration, sends resolve as `skipped`; the site never claims delivery.
- HTML templates are generated in code from validated fields. Do not interpolate raw user HTML.
- Set SPF, DKIM and DMARC on the sending domain before launch.
- Email attempts are recorded with status and a truncated error.

### AI

- The system prompt contains only approved facts and instructs the model not to invent clients, prices, contact details or guarantees.
- The model cannot execute tools or query the database.
- Chat is stateless for the model; stored transcripts are for operations.
- Rate and monthly caps limit cost.
- No AI answer is generated when unconfigured.
- Treat model output as untrusted text; it is rendered as text, not HTML.

---

## 9. Dependencies and CI

- Exact versions are pinned in workspace `package.json` files and `package-lock.json`.
- CI runs `npm ci`, typecheck, lint, tests and build on every push/PR.
- Add `npm audit --omit=dev` (or Dependabot) as a scheduled check; a clean audit is not currently claimed.
- Review install scripts before approving them (Prisma, esbuild). Do not blanket-approve scripts.

---

## 10. Known limitations

1. **No penetration test.** Controls are reasoned and tested at unit/E2E level, not adversarially audited.
2. **No WAF or bot protection.** Host-level protection is recommended for launch.
3. **CSP allows inline scripts/styles** because of Next.js bootstrap requirements.
4. **Rate limits are in-process.** Multiple instances need a shared store.
5. **No PayPal signature verification.** PayPal must not be enabled yet.
6. **No authentication.** There is no admin, CRM or client portal to protect.
7. **Legal documents are drafts.** Privacy and retention statements need legal review.
8. **No error-tracking or alerting service.** Detection depends on host logs.
9. **No dependency audit result is claimed.** Run it in the target environment.

---

## 11. Reporting a vulnerability

Do not open a public issue for a suspected vulnerability. Contact the maintainers privately through the channel that will be published with the verified contact details. Until that channel exists, do not deploy a production instance with real customer data.

Include the affected route, reproduction steps, impact and any suggested fix. Do not access, modify or exfiltrate data beyond what is necessary to demonstrate the issue.
