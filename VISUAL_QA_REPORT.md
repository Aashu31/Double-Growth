# Visual QA Report

Generated from a real browser run on **14 November 2026** against the production build of the website.

- Command: `npm run audit:visual`
- Runner: `scripts/visual-audit.mjs`
- Browser: installed Google Chrome via Playwright
- Base URL: `http://localhost:3000`
- Raw report: `artifacts/visual-qa/report.json`
- Screenshots: `artifacts/visual-qa/*.png`
- Captures: **81** (27 routes × 3 viewports)
- Structural failures: **0**

The `artifacts/` directory is git-ignored because it is generated evidence, not source. Re-run the command to reproduce every screenshot and the JSON report.

---

## 1. Viewports

| Name | Size | Rationale |
| --- | --- | --- |
| Desktop | 1440 × 900 | Common laptop, full navigation |
| Tablet | 768 × 1024 | Tablet portrait, stacked cards |
| Mobile | 390 × 844 | Modern phone, drawer navigation |

Each context uses `reducedMotion: "reduce"` and `deviceScaleFactor: 1`. Full-page screenshots are taken after scrolling through the page so reveal content is rendered, then scrolling back to the top. Animations are disabled for capture.

---

## 2. What is checked per capture

| Check | Pass condition |
| --- | --- |
| HTTP status | `200` for normal routes; `404` for the intentional missing route |
| Document title | Present and non-empty |
| H1 | Exactly one visible `h1` |
| Horizontal overflow | `scrollWidth - innerWidth` ≤ 1 px |
| Broken images | None (`complete && naturalWidth > 0`) |
| Main landmark | `main#main-content` exists |
| Page errors | None |
| Failed requests | None |
| Console errors | Recorded for review; hydration warnings are defects |
| Content | Visible text length recorded to catch blank pages |

A run fails on status mismatch, overflow, missing H1, page errors, failed requests or broken images. Console errors are reported and reviewed separately.

---

## 3. Result summary

| Result | Count |
| --- | --- |
| Captures attempted | 81 |
| Captures completed | 81 |
| Correct status | 81 / 81 |
| Exactly one H1 | 81 / 81 |
| Zero horizontal overflow | 81 / 81 |
| No broken images | 81 / 81 |
| No page errors | 81 / 81 |
| No failed requests | 81 / 81 |
| No hydration or application console errors | 81 / 81 |
| Expected 404 console resource error | 3 (one per viewport, intentional) |
| Structural failures | **0** |

The only console entries are the browser’s own “Failed to load resource: 404” messages on the intentionally missing route. They are expected and are not application errors.

---

## 4. Route coverage

All screenshots exist as `<name>-<viewport>.png`, for example `artifacts/visual-qa/home-desktop.png`, `artifacts/visual-qa/solutions-mobile.png`.

| # | Route | Screenshot name | Status | H1 |
| --- | --- | --- | --- | --- |
| 1 | `/` | `home` | 200 | Build Digital. Grow Business. |
| 2 | `/services` | `services` | 200 | Digital work with a defined scope. |
| 3 | `/services/business-website` | `service-business-website` | 200 | Business Website Development |
| 4 | `/services/ecommerce` | `service-ecommerce` | 200 | E-commerce Website Development |
| 5 | `/services/custom-applications` | `service-custom-applications` | 200 | Custom Web Applications |
| 6 | `/services/school-management` | `service-school-management` | 200 | School Management Solutions (Sarthi) |
| 7 | `/services/ai-automation` | `service-ai-automation` | 200 | AI Integration and Automation |
| 8 | `/services/cloud-devops` | `service-cloud-devops` | 200 | Cloud and DevOps Solutions |
| 9 | `/services/maintenance-support` | `service-maintenance-support` | 200 | Website Maintenance and Support |
| 10 | `/services/digital-solutions` | `service-digital-solutions` | 200 | Digital Business Solutions |
| 11 | `/solutions` | `solutions` | 200 | Start with the outcome, not the feature list. |
| 12 | `/portfolio` | `portfolio` | 200 | Real work, published honestly. |
| 13 | `/portfolio/interior-studio-storefront` | `project-interior` | 200 | Interior Studio Storefront |
| 14 | `/portfolio/school-operations-dashboard` | `project-school` | 200 | School Operations Dashboard |
| 15 | `/portfolio/field-services-booking` | `project-field` | 200 | Field Services Booking |
| 16 | `/pricing` | `pricing` | 200 | Clear pricing. Visible limits. |
| 17 | `/pricing/checkout` | `checkout` | 200 | Start your Growth Annual package. |
| 18 | `/how-it-works` | `how-it-works` | 200 | A delivery process you can hold us to. |
| 19 | `/about` | `about` | 200 | A small team with a serious approach. |
| 20 | `/contact` | `contact` | 200 | Tell us what you are building. |
| 21 | `/faq` | `faq` | 200 | The details, answered directly. |
| 22 | `/maintenance` | `maintenance` | 200 | Support that keeps the site alive. |
| 23 | `/privacy` | `privacy` | 200 | Privacy Policy |
| 24 | `/terms` | `terms` | 200 | Terms and Conditions |
| 25 | `/refund-policy` | `refund-policy` | 200 | Refund Policy |
| 26 | `/ownership` | `ownership` | 200 | Ownership and Source Code Policy |
| 27 | `/this-route-does-not-exist` | `not-found` | 404 | This page could not be found. |

The 404 route is expected to return HTTP 404 and render the branded not-found page with one H1.

---

## 5. Visual review notes

The screenshots were inspected at all three widths, not only measured structurally.

### Confirmed

- No horizontal scrolling or clipped cards on any route at 390, 768 or 1440 px.
- Header navigation collapses correctly; the mobile drawer and service submenu are visible.
- Hero, service detail, solutions, pricing and legal pages have distinct, complete layouts — no blank sections or placeholder boxes.
- Pricing states ₹3,999/year and separates third-party costs and exclusions without burying them.
- Portfolio cards and detail pages visibly carry the “Design concept” label.
- Contact, checkout and newsletter forms render with labels, help text and honest status areas.
- Footer newsletter and navigation align correctly at every width.
- Legal pages show the draft-for-review banner.
- 404 page is branded and actionable, not a framework default.
- All artwork loads; no remote image failures.

### Fixes made during QA

- **Hydration mismatch removed.** Earlier renders branched the reveal `initial` value on `useReducedMotion`, producing different server and client markup. `Reveal` now renders identical initial markup and only changes duration/delay. The final audit reports zero hydration errors.
- **Hero heading size reduced** so the display line does not wrap excessively above 1440 px.
- **Light `PageHero` upgraded** with grid and glow accents so the light detail pages do not look flat beside the dark sections.
- **404 console noise classified.** The only console errors are the browser’s expected resource error for the deliberately missing URL.

---

## 6. Reproduce

```bash
npm run build
npm run start --workspace @double-growth/web
# in a second terminal
npm run audit:visual
```

Or run the full verification sequence:

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
npm run audit:visual
```

To audit a different host:

```bash
BASE_URL=https://staging.example.com node scripts/visual-audit.mjs
```

---

## 7. Limitations

- This is structural and human visual review, not pixel-diff regression testing. No baseline images are committed.
- The audit uses Chrome at three widths. Safari, Firefox and real iOS/Android devices are not covered.
- Reduced motion is enabled for the capture. Motion behaviour is covered by component/E2E tests and manual checks, not by screenshots.
- The audit does not test forms against a live API, payments, email delivery or AI answers. Those require credentials and are documented as unconfigured.
- Screenshots are regenerated locally and git-ignored; the report records the results but does not embed images.
- Lighthouse, axe and screen-reader audits are not included in this report.
