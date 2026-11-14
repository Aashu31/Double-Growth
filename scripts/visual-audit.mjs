/**
 * Visual QA audit for the Double Growth website.
 *
 * Captures every public route at desktop, tablet and mobile widths, scrolls
 * each page so scroll-reveal content is rendered, and records structural
 * problems (horizontal overflow, missing H1, console errors, failed requests).
 *
 * Usage:
 *   node scripts/visual-audit.mjs
 *   BASE_URL=http://localhost:3000 node scripts/visual-audit.mjs
 *
 * Screenshots and report.json are written to artifacts/visual-qa/.
 */
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const baseUrl = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const outDir = join(process.cwd(), "artifacts", "visual-qa");
mkdirSync(outDir, { recursive: true });

const routes = [
  { path: "/", name: "home" },
  { path: "/services", name: "services" },
  { path: "/services/business-website", name: "service-business-website" },
  { path: "/services/ecommerce", name: "service-ecommerce" },
  { path: "/services/custom-applications", name: "service-custom-applications" },
  { path: "/services/school-management", name: "service-school-management" },
  { path: "/services/ai-automation", name: "service-ai-automation" },
  { path: "/services/cloud-devops", name: "service-cloud-devops" },
  { path: "/services/maintenance-support", name: "service-maintenance-support" },
  { path: "/services/digital-solutions", name: "service-digital-solutions" },
  { path: "/solutions", name: "solutions" },
  { path: "/portfolio", name: "portfolio" },
  { path: "/portfolio/interior-studio-storefront", name: "project-interior" },
  { path: "/portfolio/school-operations-dashboard", name: "project-school" },
  { path: "/portfolio/field-services-booking", name: "project-field" },
  { path: "/pricing", name: "pricing" },
  { path: "/pricing/checkout", name: "checkout" },
  { path: "/how-it-works", name: "how-it-works" },
  { path: "/about", name: "about" },
  { path: "/contact", name: "contact" },
  { path: "/faq", name: "faq" },
  { path: "/maintenance", name: "maintenance" },
  { path: "/privacy", name: "privacy" },
  { path: "/terms", name: "terms" },
  { path: "/refund-policy", name: "refund-policy" },
  { path: "/ownership", name: "ownership" },
  { path: "/this-route-does-not-exist", name: "not-found", expect404: true },
];

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch({ channel: "chrome" });
const results = [];

for (const route of routes) {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    const failedRequests = [];

    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("requestfailed", (request) => {
      failedRequests.push(`${request.method()} ${request.url()} — ${request.failure()?.errorText ?? "failed"}`);
    });

    const response = await page.goto(`${baseUrl}${route.path}`, {
      waitUntil: "load",
      timeout: 45_000,
    });

    await page.waitForTimeout(350);

    // Trigger scroll-reveal sections before the full-page capture.
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < pageHeight; y += Math.round(viewport.height * 0.75)) {
      await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
      await page.waitForTimeout(90);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);

    const structure = await page.evaluate(() => {
      const root = document.documentElement;
      const visibleText = document.body.innerText.trim();
      const images = [...document.images].map((image) => ({
        src: image.currentSrc || image.src,
        loaded: image.complete && image.naturalWidth > 0,
        alt: image.alt,
      }));

      return {
        title: document.title,
        h1Count: document.querySelectorAll("h1").length,
        h1Text: document.querySelector("h1")?.textContent?.trim() ?? null,
        horizontalOverflow: root.scrollWidth - window.innerWidth,
        documentHeight: root.scrollHeight,
        textLength: visibleText.length,
        brokenImages: images.filter((image) => !image.loaded),
        mainLandmark: Boolean(document.querySelector("main#main-content")),
      };
    });

    const file = `${route.name}-${viewport.name}.png`;
    await page.screenshot({
      path: join(outDir, file),
      fullPage: true,
      animations: "disabled",
    });

    results.push({
      route: route.path,
      name: route.name,
      viewport: viewport.name,
      status: response?.status() ?? null,
      expected404: Boolean(route.expect404),
      screenshot: `artifacts/visual-qa/${file}`,
      ...structure,
      consoleErrors,
      pageErrors,
      failedRequests,
    });

    console.log(
      `${viewport.name.padEnd(7)} ${route.path.padEnd(42)} ${response?.status()} ` +
        `overflow=${structure.horizontalOverflow} h1=${structure.h1Count} ` +
        `errors=${consoleErrors.length + pageErrors.length}`,
    );

    await context.close();
  }
}

await browser.close();

const failures = results.filter(
  (result) =>
    (!result.expected404 && result.status !== 200) ||
    (result.expected404 && result.status !== 404) ||
    result.horizontalOverflow > 1 ||
    result.h1Count === 0 ||
    result.pageErrors.length > 0 ||
    result.failedRequests.length > 0 ||
    result.brokenImages.length > 0,
);

const report = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  viewports,
  totalCaptures: results.length,
  failureCount: failures.length,
  results,
  failures,
};

writeFileSync(join(outDir, "report.json"), JSON.stringify(report, null, 2), "utf8");

console.log(`\n${results.length} captures written to ${outDir}`);
console.log(`${failures.length} checks failed.`);

if (failures.length > 0) {
  for (const failure of failures.slice(0, 20)) {
    console.log(
      `- ${failure.viewport} ${failure.route}: status=${failure.status} ` +
        `overflow=${failure.horizontalOverflow} h1=${failure.h1Count} ` +
        `pageErrors=${failure.pageErrors.length} ` +
        `brokenImages=${failure.brokenImages.length}`,
    );
  }
}

process.exitCode = failures.length > 0 ? 1 : 0;
