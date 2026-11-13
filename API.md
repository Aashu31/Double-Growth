# API Reference

Base URL locally: `http://localhost:4000`

All request and response bodies are JSON. Maximum request body: 32 KB. There is no public authentication in V1 — endpoints are rate-limited and validated instead.

---

## Response conventions

Success responses are wrapped in `data`:

```json
{ "data": { "...": "..." } }
```

Errors always use one shape:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Some fields need attention.",
    "fields": { "email": "Enter a valid email address." }
  }
}
```

`fields` is present only for validation errors.

`/api/*` and `/health*` responses carry `Cache-Control: no-store`.

---

## Error codes

| Code | HTTP | Meaning |
| --- | --- | --- |
| `VALIDATION_ERROR` | 400 | Request failed schema validation |
| `SPAM_REJECTED` | 400 | Honeypot field was filled |
| `AMOUNT_MISMATCH` | 400 | Webhook amount or currency differs from the order |
| `INVALID_SIGNATURE` | 401 | Webhook HMAC validation failed |
| `ORDER_NOT_FOUND` | 404 | Reference and email do not match an order |
| `NOT_FOUND` | 404 | Unknown route |
| `RATE_LIMITED` | 429 | Rate limit exceeded |
| `DATABASE_NOT_CONFIGURED` | 503 | No database configured; nothing stored |
| `DATABASE_UNAVAILABLE` | 503 | Database configured but unreachable |
| `AI_NOT_CONFIGURED` | 503 | No AI provider configured |
| `PAYMENTS_NOT_CONFIGURED` | 503 | Payment webhook/provider not configured |
| `AI_PROVIDER_ERROR` | 502 | AI provider call failed |
| `INTERNAL_ERROR` | 500 | Unexpected server error (generic message) |

---

## Rate limits

| Endpoint | Limit |
| --- | --- |
| All routes (global) | 120 requests / minute / IP |
| `POST /api/v1/leads` | 5 / minute |
| `POST /api/v1/orders` | 10 / minute |
| `GET /api/v1/orders/:orderNumber` | 20 / minute |
| `POST /api/v1/chat` | 20 / minute |
| `POST /api/v1/payments/webhook` | 60 / minute |

Limits are per API instance, keyed by client IP. Behind a proxy, set `TRUST_PROXY=true` only when the proxy is trusted.

---

## Health

### `GET /health`

Liveness. Does not touch the database.

```json
{
  "status": "ok",
  "service": "double-growth-api",
  "version": "1.0.0",
  "time": "2026-11-14T09:15:00.000Z"
}
```

### `GET /health/ready`

Readiness. Checks database configuration and connectivity.

`200`:

```json
{ "status": "ok", "checks": { "database": "ok" } }
```

`503`:

```json
{ "status": "degraded", "checks": { "database": "not_configured" } }
```

`database` may be `not_configured`, `unreachable` or `ok`.

---

## Leads

### `POST /api/v1/leads`

Creates an enquiry. Server validation is authoritative; the browser validates the same schema for immediate feedback.

Request:

```json
{
  "name": "Riya Sharma",
  "email": "riya@example.com",
  "phone": "+91 98765 43210",
  "businessName": "Sharma Interiors",
  "service": "business-website",
  "budget": "25000-50000",
  "description": "We need a five page website with a portfolio and enquiry form.",
  "preferredContact": "whatsapp",
  "consent": true,
  "source": "website",
  "website": ""
}
```

| Field | Rules |
| --- | --- |
| `name` | 2–120 characters |
| `email` | Valid email, max 254 characters, lowercased |
| `phone` | 8–15 digits; `+`, spaces, `-`, parentheses allowed |
| `businessName` | Optional, max 160 |
| `service` | One of the eight service ids |
| `budget` | Optional: `under-25000`, `25000-50000`, `50000-100000`, `100000-300000`, `300000-plus`, `not-sure` |
| `description` | 20–2000 characters |
| `preferredContact` | Optional: `email`, `phone`, `whatsapp` |
| `consent` | Must be `true` |
| `website` | Honeypot; must be empty |
| `source` | Optional, max 80 |

`201`:

```json
{ "data": { "id": "cm3x...", "receivedAt": "2026-11-14T09:15:00.000Z" } }
```

`503` when no database is configured:

```json
{
  "error": {
    "code": "DATABASE_NOT_CONFIGURED",
    "message": "The enquiry service is not configured on this environment yet, so your message was not sent and no data was stored."
  }
}
```

Service ids: `business-website`, `ecommerce`, `custom-applications`, `school-management`, `ai-automation`, `cloud-devops`, `maintenance-support`, `digital-solutions`.

---

## Orders

### `POST /api/v1/orders`

Records a package order. It does **not** charge the customer.

Request:

```json
{
  "customerName": "Riya Sharma",
  "email": "riya@example.com",
  "phone": "9876543210",
  "businessName": "Sharma Interiors",
  "gstin": "",
  "packageId": "growth-annual",
  "consent": true,
  "website": ""
}
```

The server ignores any client-supplied amount. Price is read from `packages/shared` (`growth-annual` = 399900 paise = ₹3,999, INR).

`201` with payment configured:

```json
{
  "data": {
    "orderNumber": "DG-202611-0A1B2C3D4E",
    "amountMinor": 399900,
    "currency": "INR",
    "status": "PENDING_PAYMENT",
    "payment": {
      "enabled": true,
      "checkoutUrl": "https://pay.example.com/checkout?ref=DG-202611-0A1B2C3D4E&amount=399900&currency=INR",
      "message": "Continue to the secure hosted payment page. Your order remains pending until the provider confirms payment on the server."
    }
  }
}
```

`201` with payment unavailable:

```json
{
  "data": {
    "orderNumber": "DG-202611-0A1B2C3D4E",
    "amountMinor": 399900,
    "currency": "INR",
    "status": "PENDING_PAYMENT",
    "payment": {
      "enabled": false,
      "checkoutUrl": null,
      "message": "Online payment is not enabled on this environment yet. Your order is recorded as pending and no money has been collected through this website. The team will confirm payment instructions through a verified channel."
    }
  }
}
```

### `GET /api/v1/orders/:orderNumber?email=...`

Returns the current status. Both the order number and the matching email are required; a mismatch returns the same generic `404` as an unknown order.

`200`:

```json
{ "data": { "orderNumber": "DG-202611-0A1B2C3D4E", "status": "PAID" } }
```

Statuses: `PENDING_PAYMENT`, `PAID`, `FAILED`, `CANCELLED`, `REFUNDED`.

---

## Chat

### `POST /api/v1/chat`

Request:

```json
{
  "message": "What services do you offer?",
  "history": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hello — how can I help?" }
  ]
}
```

`message` 1–1000 characters. `history` is optional, max 12 items, each up to 2000 characters.

`200`:

```json
{ "data": { "reply": "Double Growth builds business websites, e-commerce stores, custom web applications, Sarthi for school management, AI automation, cloud and DevOps, maintenance, and digital business solutions." } }
```

`503` when unconfigured:

```json
{
  "error": {
    "code": "AI_NOT_CONFIGURED",
    "message": "The assistant is not available because no AI provider is configured on this environment. Please use the contact page to reach the team."
  }
}
```

The server never generates a simulated answer. Chat history is not persisted.

---

## Payment webhook

### `POST /api/v1/payments/webhook`

Provider → server callback. Requires a raw JSON body and an HMAC-SHA256 signature header.

Header:

```
x-double-growth-signature: sha256=<hex digest>
```

The digest is computed over the exact raw request body using `UPI_WEBHOOK_SECRET`. A `sha256=` prefix is optional.

Payload:

```json
{
  "eventId": "evt_01JABCDEF",
  "orderNumber": "DG-202611-0A1B2C3D4E",
  "status": "paid",
  "amountMinor": 399900,
  "currency": "INR",
  "provider": "UPI"
}
```

| Field | Rules |
| --- | --- |
| `eventId` | 1–200 characters, unique per provider |
| `orderNumber` | 4–40 characters |
| `status` | `paid`, `failed`, `refunded` |
| `amountMinor` | Optional positive integer; must equal the order amount |
| `currency` | Optional ISO code; must equal the order currency |
| `provider` | `UPI` or `PAYPAL` |

`200`:

```json
{ "data": { "orderNumber": "DG-202611-0A1B2C3D4E", "status": "PAID", "duplicate": false } }
```

A repeated `eventId` returns `200` with `"duplicate": true` and changes nothing.

Verification order:

1. `UPI_WEBHOOK_SECRET` must be configured → otherwise `503 PAYMENTS_NOT_CONFIGURED`
2. Signature must match → otherwise `401 INVALID_SIGNATURE`
3. Payload must validate → otherwise `400 VALIDATION_ERROR`
4. `PAYPAL` requires provider-specific verification → otherwise `503 PAYMENTS_NOT_CONFIGURED`
5. Database must be available → otherwise `503 DATABASE_NOT_CONFIGURED`
6. Order must exist; amount and currency must match; event must be new

### Signing example (Node.js)

```js
import { createHmac } from "node:crypto";

const raw = JSON.stringify(payload);
const signature = createHmac("sha256", process.env.UPI_WEBHOOK_SECRET)
  .update(raw)
  .digest("hex");

await fetch(`${API_URL}/api/v1/payments/webhook`, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-double-growth-signature": signature,
  },
  body: raw,
});
```

Sign the exact bytes sent. Re-serialising with different key order or whitespace invalidates the signature.

---

## cURL examples

```bash
curl http://localhost:4000/health

curl -X POST http://localhost:4000/api/v1/leads \
  -H "content-type: application/json" \
  -d '{"name":"Riya Sharma","email":"riya@example.com","phone":"9876543210","service":"business-website","description":"We need a five page business website with an enquiry form.","consent":true}'

curl -X POST http://localhost:4000/api/v1/orders \
  -H "content-type: application/json" \
  -d '{"customerName":"Riya Sharma","email":"riya@example.com","phone":"9876543210","packageId":"growth-annual","consent":true}'

curl "http://localhost:4000/api/v1/orders/DG-202611-0A1B2C3D4E?email=riya@example.com"
```

---

## CORS

Allowed origins: `WEB_URL` (exact origin, no trailing slash) plus `http://localhost:3000`. Allowed methods: `GET`, `POST`, `OPTIONS`. Allowed request header: `Content-Type`. Preflight cache: 10 minutes.

Requests without an `Origin` header (server-to-server, curl) are allowed.

---

## Not implemented in V1

- authentication or client portal endpoints
- CRM/admin endpoints for reading leads or orders
- provider-specific PayPal webhook verification
- email notification delivery
- file uploads
