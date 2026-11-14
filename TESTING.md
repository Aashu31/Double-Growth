# Testing

The project uses four complementary layers: unit/contract tests, component tests, browser end-to-end tests and a visual/structural audit. None of them replaces a real integration test against PostgreSQL, a payment provider, an email provider or an AI provider.

---

## 1. Commands

| Command | Scope |
| --- | --- |
| `npm run typecheck` | TypeScript in all five workspaces |
| `npm run lint` | ESLint for the web app |
| `npm test` | Vitest: API, validators and web components |
| `npm run test:e2e` | Playwright: public site on desktop and mobile |
| `npm run audit:visual` | 27 routes × 3 viewports, screenshots + `report.json` |
| `npm run build` | Production build of web and API |
| `npm run verify` | Typecheck → lint → unit tests → build |

Run one layer:

```bash
npm test --workspace @double-growth/api
npm test --workspace @double-growth/validators
npm test --workspace @double-growth/web
npx playwright test tests/e2e/site.spec.ts --project=desktop-chrome
```

E2E starts the production web server automatically (`next start`). To test an already-running server:

```bash
PLAYWRIGHT_SKIP_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e
```

The Playwright config uses the installed Google Chrome (`channel: "chrome"`). Chromium is also available locally if the channel is changed.

---

## 2. Current results

Verified on 14 November 2026:

| Layer | Result |
| --- | --- |
| Typecheck | Pass — API, web, database, shared, validators |
| Lint | Pass — no errors |
| Unit/component tests | **43 passed** (21 API, 12 validators, 10 web) |
| Playwright E2E | **28 passed** (14 scenarios × 2 projects) |
| Visual audit | **81 captures**, 0 structural failures |
| Production build | Pass — web and API |

The visual result is recorded in [`VISUAL_QA_REPORT.md`](./VISUAL_QA_REPORT.md), generated from `artifacts/visual-qa/report.json`.

---

## 3. Unit and contract tests

### API — `apps/api/src/app.test.ts` (21)

Uses Fastify’s `inject` with fake repositories, fake chat and fake email. No network and no database are required.

Covered:

- liveness and readiness states
- lead validation, success, unconfigured database and honeypot rejection
- order pricing from the server catalogue, honest payment-unavailable state, checkout generation
- order lookup requiring the matching email
- chat unconfigured state and monthly quota exhaustion
- webhook unconfigured, invalid signature, valid signed event and amount mismatch
- JSON 404 for unknown routes
- shared catalogue endpoints
- health integration states
- newsletter unconfigured, success and honeypot
- payment target creation for payable, paid and unknown orders

### Validators — `packages/validators/src/index.test.ts` (12)

Covers lead, order, chat, webhook and newsletter schemas: required fields, consent, service/package enums, phone/email normalisation, size caps, honeypot acceptance and unknown statuses.

### Web components — `apps/web/src/**/*.test.tsx` (10)

Vitest + jsdom + Testing Library:

- FAQ disclosure uses native `details`/`summary` and toggles
- portfolio filtering and category counts
- chat opens, sends, shows a real reply, shows the honest unavailable state, resets only after confirmation
- header active route and mobile navigation
- contact form blocks empty submissions, shows success only after API acceptance, and shows the backend error without a success screen

---

## 4. End-to-end tests

`tests/e2e/site.spec.ts` runs 14 scenarios against a production build in two projects (`desktop-chrome`, `mobile-chrome`), for 28 tests.

| Scenario | Asserts |
| --- | --- |
| Homepage | H1, primary CTA, services heading, ₹3,999 and third-party cost note |
| Desktop navigation | Solutions link navigates and renders the outcome hero |
| Services catalogue | Category filtering and search state |
| Service detail | Scope, process and service-specific CTA |
| Portfolio search | Honest empty state and filter reset |
| Solutions explorer | Tab switch updates the panel and service link |
| Pricing | Price, package, exclusions and comparison region |
| Contact validation | Inline errors, no false success |
| Contact prefill | `?service=ecommerce` selects the service |
| FAQ | Answer expands |
| Newsletter | Invalid address rejected locally, no success message |
| 404 | Custom page and HTTP 404 |
| Mobile navigation | Drawer opens, expands services, follows a link |
| Mobile solutions | Tabs remain usable at 390 px |

The suite deliberately does **not** depend on a live API or database. It verifies the honest client-side and failure states that exist in this environment. When credentials are supplied, add integration tests for stored leads/orders and signed webhooks.

---

## 5. Visual and structural audit

`scripts/visual-audit.mjs` loads 27 routes at:

- desktop — 1440 × 900
- tablet — 768 × 1024
- mobile — 390 × 844

For each capture it records:

- HTTP status
- page title
- `h1` count and text
- horizontal overflow in pixels
- document height and visible text length
- broken images and missing alt text context
- presence of `main#main-content`
- console errors, page errors and failed requests

It scrolls each page first so reveal animations render, then takes a full-page screenshot with animations disabled. Screenshots and `report.json` are written to `artifacts/visual-qa/` (git-ignored).

A run fails if:

- a normal route is not `200`, or the 404 route is not `404`
- horizontal overflow exceeds 1 px
- no `h1` exists
- a page error or failed request occurs
- an image fails to load

Console errors are recorded separately for review. A deliberate 404 resource error on the 404 route is expected. Hydration warnings are treated as defects and fixed, not ignored.

---

## 6. Manual release checks

Automated tests cannot prove these:

1. Apply the migration to a real PostgreSQL database and submit a lead; confirm the row and notification record.
2. Create an order, complete a signed test webhook, and confirm `PAID` plus one `PaymentEvent`.
3. Replay the webhook and confirm `duplicate: true` with no second row.
4. Configure Resend and verify sender-domain delivery, including the internal lead notification.
5. Configure an AI provider and check that answers stay within the approved facts.
6. Keyboard-test the header menu, tabs, FAQ, forms and chat.
7. Run a screen reader pass on the homepage, contact and checkout.
8. Check the legal pages with a qualified reviewer and remove the draft banner only after approval.
9. Verify Lighthouse accessibility and SEO on the production domain.
10. Confirm no horizontal scroll at 320, 360, 390, 430, 768, 1024, 1280, 1440 and 1920 px.

---

## 7. CI

`.github/workflows/ci.yml` runs on pushes to `main` and on pull requests:

1. `npm ci`
2. `npm run db:generate`
3. `npm run typecheck`
4. `npm run lint`
5. `npm test`
6. `npm run build`
7. install Chrome and run `npm run test:e2e`

No production credentials are provided. Tests assert the explicit unconfigured states instead.

---

## 8. Coverage gaps

| Gap | Reason | Next step |
| --- | --- | --- |
| PostgreSQL integration tests | No database credentials | Add a disposable Postgres service in CI |
| Payment provider integration | No contracted provider | Add a sandbox signed-event test |
| Email delivery | No Resend key/domain | Add a sandbox or provider test mode |
| AI answer quality | No AI credentials | Add prompt-regression tests with a stub provider |
| Visual regression diffing | Screenshots are captured, not compared to baselines | Add pixel or structural baselines when the design stabilises |
| Load and rate-limit bursts | In-process limits only | Add a load test with multiple instances |
| Real-device testing | Browser emulation only | Test iOS Safari and Android Chrome before launch |

Do not describe these as passing until they have actually run.
