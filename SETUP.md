# Setup Guide

Step-by-step local setup for the Double Growth monorepo.

---

## 1. Prerequisites

| Tool | Version used | Notes |
| --- | --- | --- |
| Node.js | 26.13.0 | `>=20.9` required by `package.json` engines |
| npm | 11.20.0 | Workspaces are used; pnpm/yarn are not supported |
| Git | 2.55.0 | |
| PostgreSQL | 18.6 | Server must be running before migrations |
| VS Code | optional | Recommended for TypeScript |

Verify:

```powershell
node -v
npm -v
git --version
psql --version
```

---

## 2. Clone and install

```powershell
git clone https://github.com/<owner>/double-growth.git
cd "Double Growth"
npm install
```

`npm install` installs all workspaces and generates the Prisma client through the database package.

> **If your npm blocks install scripts.** Recent npm versions print `packages have install scripts not yet covered by allowScripts` for Prisma and esbuild. The committed binaries have been verified to work. If Prisma generation fails, review and approve only the build tools:
>
> ```powershell
> npm install-scripts ls
> npm install-scripts approve prisma
> npm install-scripts approve @prisma/client
> npm install-scripts approve @prisma/engines
> npm install-scripts approve esbuild
> ```
>
> Do not approve unrelated packages.

---

## 3. Environment file

```powershell
Copy-Item .env.example .env
```

`.env` is git-ignored. Never commit real credentials. Fill in only what you need — every integration is optional:

- no `DATABASE_URL` → forms show "not configured" and store nothing
- no payment template/secret → orders stay pending, no checkout link
- no AI credentials → chatbot reports unavailable

Full variable reference: [`ENVIRONMENT.md`](./ENVIRONMENT.md).

---

## 4. Database setup

PostgreSQL 18 is installed locally with `scram-sha-256` authentication. The application must not guess credentials; create a dedicated role and database.

Open a shell as a PostgreSQL superuser:

```powershell
psql -U postgres
```

```sql
CREATE ROLE double_growth WITH LOGIN PASSWORD 'choose-a-strong-password';
CREATE DATABASE double_growth OWNER double_growth;
\q
```

Set the connection string in `.env`:

```dotenv
DATABASE_URL="postgresql://double_growth:choose-a-strong-password@localhost:5432/double_growth?schema=public"
DIRECT_DATABASE_URL="postgresql://double_growth:choose-a-strong-password@localhost:5432/double_growth?schema=public"
```

Notes:

- URL-encode special characters in the password (for example `@` becomes `%40`).
- `DIRECT_DATABASE_URL` is reserved for pooled-host deployments; locally it can match `DATABASE_URL`.
- The `Lead`, `Order` and `PaymentEvent` tables do not exist until the first migration runs.

Apply the schema:

```powershell
npm run db:generate
npm run db:migrate
```

`db:migrate` runs `prisma migrate dev`, creates `packages/database/prisma/migrations/`, applies it, and regenerates the client. Name the migration when prompted (for example `init`).

Verify:

```powershell
npm run db:studio
```

Prisma Studio opens at `http://localhost:5555`.

For production, use `prisma migrate deploy` from the database package (see [`DEPLOYMENT.md`](./DEPLOYMENT.md)).

---

## 5. Run locally

```powershell
npm run dev
```

| Service | URL |
| --- | --- |
| Website | `http://localhost:3000` |
| API | `http://localhost:4000` |
| API health | `http://localhost:4000/health` |
| API readiness | `http://localhost:4000/health/ready` |

`WEB_URL` and `NEXT_PUBLIC_API_URL` default to these ports. If you change a port, update both the API `PORT` and the web `NEXT_PUBLIC_API_URL`, and add the website origin to `WEB_URL` for CORS.

Run one workspace only:

```powershell
npm run dev:web
npm run dev:api
```

---

## 6. Verification commands

```powershell
npm run typecheck    # TypeScript, all workspaces
npm run lint         # ESLint, web app
npm test             # Vitest: API, validators and frontend components
npm run build        # production build, web + API
```

Expected at the time of writing: typecheck clean, lint clean, 34 tests passing (15 API, 9 validators, 10 frontend), 23 web routes generated.

Manual checks after starting the servers:

1. Visit all 13 routes plus `/pricing/checkout` and the three `/portfolio/[slug]` pages; confirm no horizontal scroll at 360, 390, 430, 768, 1024, 1280, 1440 and 1920 px.
2. Submit the contact form with an empty field → inline validation, no network success.
3. Submit a valid enquiry without a database → honest "not configured" message, no success screen.
4. Open the chat widget → welcome message and suggested questions; sending one returns the honest unavailable message, never a fabricated answer. Test the reset confirmation dialog.
5. Filter the portfolio by category and open a concept detail page; confirm the "Design concept" label.
6. Visit `/pricing/checkout`, place an order → either an order number or an honest configuration error.
7. Check `/sitemap.xml`, `/robots.txt`, `/opengraph-image`.
8. Confirm unknown routes render the 404 page.

---

## 7. Troubleshooting

### `DATABASE_NOT_CONFIGURED` (503)

`DATABASE_URL` is empty or the API process did not load `.env`. The API reads `.env.local`, `.env`, then `../../.env` relative to its working directory. Restart the API after editing.

### `DATABASE_UNAVAILABLE` (503)

`DATABASE_URL` is set but the server is unreachable, the password is wrong, or the database does not exist. Confirm the service is running:

```powershell
Get-Service *postgres*
```

### Prisma: `Environment variable not found: DATABASE_URL`

Environment files are not loaded by raw `npx prisma` commands unless the shell has the variable. Use the npm scripts, which run from the database package, or load `.env` in the shell first.

### Prisma client missing

```powershell
npm run db:generate
```

If it still fails, confirm `node_modules/@prisma/client` exists and that Prisma engines were not blocked by npm policy (section 2).

### Port already in use

```powershell
Get-NetTCPConnection -LocalPort 3000,4000 -State Listen |
  Select-Object LocalPort, OwningProcess
```

Stop the owning process or change the port.

### CORS error in the browser

The API only accepts the origins in `WEB_URL` plus `http://localhost:3000`. If the website runs on another host or port, set `WEB_URL` and restart the API.

### Chat returns `AI_NOT_CONFIGURED`

Expected without `AI_PROVIDER=openai-compatible`, `AI_BASE_URL`, `AI_MODEL` and `AI_API_KEY`. This is not a bug.

### Payment link is missing

Expected unless `PAYMENTS_ENABLED=true` and `UPI_PAYMENT_LINK_TEMPLATE` contains `{orderNumber}` and uses HTTPS. Orders are still recorded.

### Build fails on `/opengraph-image`

The image is rendered with Satori, which requires every multi-child `<div>` to declare `display: flex`. Keep that constraint when editing `apps/web/src/app/opengraph-image.tsx`.

---

## 8. Next steps

- Provide database credentials and apply the first migration.
- Contract a payment provider and configure the webhook secret.
- Configure an AI provider if the assistant should answer automatically.
- Replace legal drafts with reviewed policies.
- Add real client projects and verified testimonials through the content files; replace the labelled design concepts when approved work exists.
- Add verified contact details and founder identities when confirmed.
