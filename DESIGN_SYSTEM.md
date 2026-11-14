# Design System

The visual language is **midnight engineering**: a dark, precise technical surface paired with a bright, editorial reading experience. It should feel like a small senior studio — calm, credible and specific, never like a template marketplace.

---

## 1. Principles

1. **Outcome before ornament.** Every section leads with what the visitor gets, not with a decorative flourish.
2. **Dark for atmosphere, light for reading.** Hero and feature surfaces are midnight; long-form content uses white and mist for legibility.
3. **One accent family.** Electric blue and cyan carry interaction and emphasis. No unrelated accent colours compete with them.
4. **Numbers are honest.** Prices, limits and exclusions use the same visual weight as benefits.
5. **Motion explains, never delays.** Reveals are short, respect reduced motion and never gate content.
6. **Concept work is labelled.** Portfolio visuals are clearly marked as design concepts at the card and detail level.

---

## 2. Colour tokens

Declared in `apps/web/src/app/globals.css` under Tailwind 4 `@theme inline`.

| Token | Value | Use |
| --- | --- | --- |
| `midnight` | `#060b16` | Deepest page background |
| `navy` | `#0b1020` | Primary dark surface and ink |
| `charcoal` | `#111827` | Raised dark panels |
| `navy-700` | `#16233d` | Card borders and gradients |
| `navy-600` | `#1d3054` | Hover/highlight on dark |
| `electric` | `#2563eb` | Primary action, focus ring, active state |
| `bright` | `#3b82f6` | Secondary action and links |
| `electric-soft` | `#7aa2ff` | Muted accent text on dark |
| `cyan` | `#22d3ee` | Data, diagrams and small highlights |
| `mist` | `#f8fafc` | Light section background |
| `cloud` | `#e2e8f0` | Light borders and dividers |
| `ink` | `#0b1020` | Body text on light |
| `slate` | `#52627a` | Secondary text on light |

### Contrast rules

- Body copy on light surfaces uses `ink` or `slate`; `slate` is not used for small text below 16 px on mist.
- On dark surfaces, primary text is white/`mist`; secondary text is `cloud` at no less than 70% opacity.
- Accent text is never the only signal. Active tabs, errors and states also change shape, icon or weight.
- Focus is always visible: 2 px electric outline with 3 px offset.

---

## 3. Typography

| Role | Family | Treatment |
| --- | --- | --- |
| Display / headings | Geist Sans | Tight tracking (`-0.03em`), balanced wrapping |
| Body | Geist Sans | 16–18 px, `pretty` wrapping, 1.6–1.75 line height |
| Eyebrow / data | Geist Mono | 0.7 rem, uppercase, 0.2em tracking |
| Numbers / code | Geist Mono | Tabular where alignment matters |

Rules:

- One `h1` per page.
- Headings describe the section, not the layout (`What usually goes wrong`, not `Section 2`).
- Display headings use `text-gradient` only on dark surfaces; light sections use `text-gradient-dark` sparingly.
- Long headings are allowed to wrap. Avoid viewport-width-based font sizing that breaks at 360 px.

---

## 4. Layout and rhythm

| Token / utility | Value |
| --- | --- |
| `.container-page` | max 84 rem, 1.25 / 2 / 2.5 rem inline padding |
| `.section-pad` | 4.5 rem block padding; 7 rem from 768 px |
| Grid gap | 1–1.5 rem for cards; 2–4 rem between major columns |
| Card radius | `1.25rem` (`radius-xl2`) and smaller nested radii |
| Dark elevation | `shadow-lift`, `shadow-soft` |
| Hairlines | Gradient `.hairline` / `.hairline-dark` instead of hard rules |
| Surfaces | `.grid-surface`, `.grid-surface-light`, `.glow-surface`, `.glass` |

Responsive behaviour:

- Mobile first; primary breakpoints at 640, 768, 1024 and 1280 px.
- Grid tracks use `minmax(0, …)` where long words or tables could otherwise force overflow.
- The pricing comparison is a labelled, keyboard-focusable horizontal scroll region on narrow screens.
- Navigation collapses to a drawer below `lg`; the drawer traps nothing but closes on navigation and Escape.

---

## 5. Components

### Primitives

- `Button` / `ButtonLink` — primary, secondary, ghost and inverse variants; consistent height, icon gap and focus state.
- `SectionHeading` — eyebrow, heading and supporting copy with alignment options.
- `PageHero` — dark and light variants; grid, glow and orbit accents; breadcrumb slot.
- `Brand` / `BrandMark` — typographic mark with a geometric growth glyph.
- `Reveal` — hydration-safe scroll reveal wrapper.

### Marketing components

- `Hero` — headline, proof boundaries, primary/secondary CTAs and a growth-orbit visual.
- `ServiceCard` / `ServiceCatalogue` — category filters, search, problem/outcome summaries.
- `ProjectCard` / `ProjectGrid` — labelled concept cards, category filters and search with an honest empty state.
- `SolutionExplorer` — accessible tab list with five outcomes, evidence, scope and linked services.
- `ProcessSection` — five delivery stages with client responsibilities.
- `PricingPreview` / pricing page — package, inclusions, exclusions and policy notes.
- `FaqAccordion` — keyboard-operable disclosure with `aria-expanded` and `aria-controls`.
- `TestimonialsSection` — renders an honest empty state until verified reviews exist.

### Forms and feedback

- `ContactForm` — RHF + Zod, inline errors, honeypot, consent and honest API failure states.
- `NewsletterForm` — single field, local validation, disabled/pending state and explicit unconfigured message.
- `CheckoutForm` — order creation, server-owned amount, payment status panel with no fake success.
- `ChatWidget` — welcome state, suggested prompts, unavailable state, reset confirmation and live region.
- `Loading`, `error.tsx`, `not-found.tsx` — branded system states, not default framework screens.

---

## 6. Art and illustration

- All artwork is original inline SVG in `apps/web/src/components/art/`.
- `ServiceVisual` renders a distinct diagram per service family: browser frames, storefront grids, dashboard panels, orbit nodes, pipelines and support loops.
- `ProjectVisual` renders concept mockups with abstract UI rather than fake client screenshots.
- `GrowthOrbit` is the recurring brand motif: concentric motion around a solid core.
- Artwork is decorative (`aria-hidden`) unless it carries meaning, in which case it has a text alternative.
- No stock photography, remote image hosts or simulated client logos.

---

## 7. Motion

- Duration: 180–280 ms for interaction, 550 ms for section reveals.
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Reveals translate 18 px and fade in once when 80 px inside the viewport.
- Hover lift is 5 px with a soft shadow, never a scale that blurs text.
- `prefers-reduced-motion` removes transforms and shortens duration to zero. The server and client render the same initial markup to avoid hydration mismatches.
- Print styles force all revealed content visible.

---

## 8. Accessibility

- Skip link to `#main-content`; one `main` landmark per page.
- Semantic headings and lists; no heading level skipped for styling.
- Visible focus on every interactive element.
- Form labels are persistent; errors use `aria-invalid` and `aria-describedby`.
- Status messages use polite live regions; the chat quota/unavailable state is announced.
- Tabs implement roving focus with arrow keys and `aria-selected`.
- Icon-only controls have accessible names.
- Colour is never the sole carrier of meaning.
- Automated checks cover one `h1` per route and no horizontal overflow; manual keyboard checks remain part of release QA.

---

## 9. Content design

- Sentence case for headings and buttons.
- Numbers, limits and third-party costs are explicit: ₹3,999/year, domain and hosting billed separately, request caps stated.
- No “unlimited”, “guaranteed #1”, “best in class” or invented statistics.
- Empty states explain why content is absent rather than hiding the section.
- Legal pages carry a visible draft-for-review notice.
- Concept portfolio entries say “Design concept” on both the card and detail page.

---

## 10. QA references

- Screenshots: `artifacts/visual-qa/` (generated by `npm run audit:visual`, git-ignored).
- Results: [`VISUAL_QA_REPORT.md`](./VISUAL_QA_REPORT.md).
- Automated interaction suite: `tests/e2e/site.spec.ts`.
- Component tests: colocated `*.test.tsx` files under `apps/web/src/components`.
