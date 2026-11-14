# Database

PostgreSQL is the system of record for mutable customer data: leads, orders, payment events, newsletter subscribers, notification attempts, chat transcripts and AI usage counters.

The marketing catalogue is **not** stored in PostgreSQL. It lives in `@double-growth/shared` so the website and API read the same version-controlled definitions.

---

## 1. Current status

| Item | Status |
| --- | --- |
| Prisma schema | Written and typechecked |
| Prisma client | Generated successfully |
| Initial migration SQL | Committed at `packages/database/prisma/migrations/20261114160000_init/migration.sql` |
| Migration applied locally | **No** — no PostgreSQL credentials were supplied |
| Migration applied in production | **No** — nothing is deployed |
| Database-backed endpoints | Return `503 DATABASE_NOT_CONFIGURED` until `DATABASE_URL` is set and the migration is applied |

Never guess database credentials. Create a dedicated role and database, then apply the committed migration.

---

## 2. Configuration

```dotenv
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/double_growth?schema=public"
DIRECT_DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/double_growth?schema=public"
```

- `DATABASE_URL` is used by the running API and by Prisma Client.
- `DIRECT_DATABASE_URL` is reserved for pooled hosts where migrations need a non-pooled connection.
- In production, require TLS (`sslmode=require`).
- Empty `DATABASE_URL` means “not configured”, not “use a default”.

---

## 3. Models

### `Lead`

Enquiry captured from `/contact`.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `cuid` | Primary key; shown to the customer as a reference |
| `name`, `email`, `phone` | text | Required |
| `businessName` | text? | Optional |
| `service` | text | One of the eight shared service ids |
| `budget` | text? | Enum-like range from shared constants |
| `description` | text | 20–2000 characters at the API boundary |
| `preferredContact` | text? | `email`, `phone` or `whatsapp` |
| `consent` | boolean | Must be true |
| `source` | text | Defaults to `website` |
| `status` | `LeadStatus` | `NEW`, `CONTACTED`, `QUALIFIED`, `WON`, `LOST` |
| `createdAt`, `updatedAt` | timestamp | |

Indexes: `(status, createdAt)`, `(email)`.

### `Order`

Package order. The API creates the row; no client-supplied amount is trusted.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `cuid` | Primary key |
| `orderNumber` | text unique | `DG-YYYYMM-XXXXXXXXXX` |
| customer fields | text | Name, email, phone, business, GSTIN |
| `packageId` | text | Validated against the shared package catalogue |
| `amountMinor` | int | Paise, set by the server (`399900` = ₹3,999) |
| `currency` | text | `INR` |
| `status` | `OrderStatus` | Defaults to `PENDING_PAYMENT` |
| `provider` | `PaymentProvider?` | Set by a verified payment event |
| `providerReference`, `notes` | text? | Reserved for operations |
| `paidAt` | timestamp? | Set once, on the first paid event |
| `createdAt`, `updatedAt` | timestamp | |
| `events` | relation | `PaymentEvent[]` |

Indexes: `(email, createdAt)`, `(status, createdAt)`.

### `PaymentEvent`

Immutable provider callback audit trail.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `cuid` | Primary key |
| `orderId` | text | FK to `Order`, cascade delete |
| `provider` | `PaymentProvider` | `UPI`, `PAYPAL`, `MANUAL` |
| `eventId` | text | Provider event id |
| `status` | text | `paid`, `failed` or `refunded` as received |
| `amountMinor` | int? | Verified amount |
| `payload` | JSON | Raw provider payload |
| `createdAt` | timestamp | |

Unique `(provider, eventId)` is the idempotency key. Index `(orderId, createdAt)`.

### `NewsletterSubscriber`

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `cuid` | Primary key |
| `email` | text unique | Lowercased at validation |
| `status` | `SubscriberStatus` | `PENDING`, `ACTIVE`, `UNSUBSCRIBED` |
| `source` | text | Page or campaign label, max 80 at the boundary |
| `consentAt` | timestamp | Set when the address is recorded |
| `createdAt`, `updatedAt` | timestamp | |

Re-subscribing an existing address reactivates it and returns the original `createdAt`.

### `Notification`

Operational record of every email attempt, including skipped attempts when no provider is configured.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `cuid` | Primary key |
| `type` | `NotificationType` | Lead acknowledgement/internal, order, payment, newsletter |
| `recipient` | text | Destination address |
| `subject` | text | Rendered subject |
| `status` | `NotificationStatus` | `PENDING`, `SENT`, `FAILED`, `SKIPPED` |
| `provider` | text? | e.g. `resend` |
| `error` | text? | Truncated provider error |
| `leadId`, `orderId` | text? | Correlation ids, intentionally not foreign keys |
| `createdAt`, `updatedAt` | timestamp | |

Notification writes are best-effort: a telemetry failure never rolls back the business operation.

### `ChatConversation` / `ChatMessage`

Stores a user/assistant exchange pair per request. Chat is stateless for the model; storage is for operations and abuse review. A connection failure never blocks a successful answer.

### `AiUsage`

One row per UTC month (`YYYY-MM`).

| Column | Type | Notes |
| --- | --- | --- |
| `period` | text primary key | `2026-11` |
| `requestCount` | int | Incremented per accepted request |
| `promptChars` | int | Rough cost signal, not billing |
| `updatedAt` | timestamp | |

The application compares `requestCount` with `AI_MONTHLY_REQUEST_LIMIT`. Without a database, a per-process map provides the same guardrail for a single instance.

---

## 4. Enums

| Enum | Values |
| --- | --- |
| `LeadStatus` | `NEW`, `CONTACTED`, `QUALIFIED`, `WON`, `LOST` |
| `OrderStatus` | `PENDING_PAYMENT`, `PAID`, `FAILED`, `CANCELLED`, `REFUNDED` |
| `PaymentProvider` | `UPI`, `PAYPAL`, `MANUAL` |
| `SubscriberStatus` | `PENDING`, `ACTIVE`, `UNSUBSCRIBED` |
| `NotificationType` | `LEAD_ACKNOWLEDGEMENT`, `LEAD_INTERNAL`, `ORDER_CONFIRMATION`, `PAYMENT_CONFIRMATION`, `PAYMENT_FAILURE`, `NEWSLETTER_WELCOME` |
| `NotificationStatus` | `PENDING`, `SENT`, `FAILED`, `SKIPPED` |
| `ChatRole` | `USER`, `ASSISTANT` |

---

## 5. Invariants

1. **Money is integer minor units.** No floating-point arithmetic.
2. **Price comes from the server catalogue.** The order request cannot set an amount.
3. **Paid requires a verified webhook.** A browser redirect never changes `status`.
4. **Events are idempotent.** Unique `(provider, eventId)` prevents double processing.
5. **Amount and currency must match.** Mismatches return `AMOUNT_MISMATCH` before any status change.
6. **Terminal states are protected.** A refunded order is not moved back to paid; a paid order is not downgraded by a late failure.
7. **Order lookup needs both reference and email.** A mismatch returns the same generic `404`.
8. **Lead consent is required.** The API rejects `consent: false`.
9. **Notification failures do not fail business writes.**
10. **Chat logging failures do not fail answers.**

---

## 6. Commands

```bash
npm run db:generate        # prisma generate
npm run db:migrate         # create/apply a development migration
npm run db:migrate:deploy  # apply committed migrations (staging/production)
npm run db:studio          # inspect data locally
```

First local setup:

```bash
# 1. Create role and database with psql, then put the URL in .env
npm run db:generate
npm run db:migrate:deploy
```

`migrate deploy` applies `20261114160000_init` without prompting. Use `migrate dev` only while creating new schema changes locally.

Verify:

```sql
\dt
SELECT * FROM "_prisma_migrations";
```

---

## 7. Migration workflow

1. Edit `packages/database/prisma/schema.prisma`.
2. Run `npm run db:migrate` locally and name the migration descriptively.
3. Review the generated SQL. Never edit applied migration files.
4. Commit schema and migration together.
5. Apply in staging with `npm run db:migrate:deploy`.
6. Apply in production before starting code that depends on the change.
7. Use expand-and-contract for destructive changes: add nullable field → backfill → switch reads → remove old field in a later release.

Never run `prisma migrate dev` or `prisma db push` against production.

---

## 8. Backups and retention

- Enable automated daily backups and point-in-time recovery at the provider.
- Test a restore into a separate database before launch and after major migrations.
- Leads and orders are business records; do not delete them casually.
- Newsletter unsubscribes should set `status`, not delete the row, so consent history remains auditable.
- Chat transcripts and notification errors may contain personal data. Define a retention period before launch and document it in the privacy policy.

---

## 9. Privacy notes

The schema stores names, emails, phone numbers, business names, GSTIN, enquiry text and chat messages. Treat all of it as personal data.

- Collect only what the form needs.
- State the retention period in the privacy policy after legal review.
- Restrict production database access to named operators.
- Never copy production data into development.
- Redact personal data from logs; the API does not log request bodies.

---

## 10. Future models

Not implemented, and deliberately not guessed:

- `User` / `Client` for a portal
- CRM notes and assignment
- subscription and invoice records
- newsletter campaigns and delivery events
- consent audit history
- multi-tenant school ERP tables (`Sarthi`)

Add these through new migrations when the corresponding features are built.
