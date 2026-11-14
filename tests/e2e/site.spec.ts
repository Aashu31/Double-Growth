import { expect, test } from "@playwright/test";

test.describe("public website", () => {
  test("homepage renders the hero, services and published package", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: /Build Digital\.\s*Grow Business\./ }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Start Your Project" }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "What we build" })).toBeVisible();
    await expect(page.getByText("₹3,999", { exact: false }).first()).toBeVisible();
    await expect(
      page.getByText("Third-party costs stated separately").first(),
    ).toBeVisible();
  });

  test("desktop navigation reaches the solutions page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Solutions", exact: true }).first().click();

    await expect(page).toHaveURL(/\/solutions$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /Start with the outcome/ }),
    ).toBeVisible();
  });

  test("services catalogue filters by category and search", async ({ page }) => {
    await page.goto("/services");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.getByRole("button", { name: /Commerce/ }).click();

    await expect(page.getByRole("heading", { name: "E-commerce Website Development" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Business Website Development" })).toHaveCount(0);

    await page.getByRole("button", { name: /Platforms/ }).click();
    await expect(
      page.getByRole("heading", { name: "School Management Solutions (Sarthi)" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Custom Web Applications" })).toBeVisible();
  });

  test("service detail page explains scope and questions", async ({ page }) => {
    await page.goto("/services/business-website");

    await expect(
      page.getByRole("heading", { level: 1, name: "Business Website Development" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "What usually goes wrong" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /How this engagement runs/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Ask about this service" }),
    ).toBeVisible();
  });

  test("portfolio search shows an honest empty state and recovers", async ({ page }) => {
    await page.goto("/portfolio");

    await expect(page.getByText("Design concepts, not client work.")).toBeVisible();
    await page.getByRole("searchbox", { name: /search projects/i }).fill("no-such-project");

    await expect(page.getByRole("heading", { name: "No projects match that search." })).toBeVisible();
    await page.getByRole("button", { name: "Clear filters" }).click();

    await expect(
      page.getByRole("heading", { name: "Interior Studio Storefront" }),
    ).toBeVisible();
  });

  test("solutions explorer switches the active outcome", async ({ page }) => {
    await page.goto("/solutions");

    await page.getByRole("tab", { name: /Sell online with a real storefront/ }).click();

    const panel = page.getByRole("tabpanel");
    await expect(panel.getByRole("heading", { level: 3, name: "Sell online with a real storefront" })).toBeVisible();
    await expect(panel.getByText("Catalogue and category model")).toBeVisible();
    await expect(panel.getByRole("link", { name: /E-commerce Website/ })).toBeVisible();
  });

  test("pricing states the package price and its exclusions", async ({ page }) => {
    await page.goto("/pricing");

    await expect(page.getByText("₹3,999").first()).toBeVisible();
    await expect(page.getByText("Growth Annual").first()).toBeVisible();
    await expect(page.getByText("Third-party charges are separate")).toBeVisible();
    await expect(
      page.getByText(/Domain registration and renewal charges/).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("region", { name: "Package comparison table" }),
    ).toBeVisible();
  });

  test("contact form validates before claiming anything was sent", async ({ page }) => {
    await page.goto("/contact");

    await page.getByRole("button", { name: "Send enquiry" }).click();

    await expect(page.getByText("Please correct the highlighted fields.")).toBeVisible();
    await expect(page.getByText("Enter your full name.")).toBeVisible();
    await expect(
      page.getByText(/Your enquiry has been received/),
    ).toHaveCount(0);
  });

  test("contact form prefills the service from the query string", async ({ page }) => {
    await page.goto("/contact?service=ecommerce");

    await expect(page.locator('select[name="service"]')).toHaveValue("ecommerce");
  });

  test("FAQ accordion expands an answer", async ({ page }) => {
    await page.goto("/faq");

    const question = page.getByText("How does the ₹3,999 annual package work?", {
      exact: true,
    });
    await question.click();

    await expect(
      page.getByText(/It is not unlimited development, unlimited hosting/i),
    ).toBeVisible();
  });

  test("newsletter form rejects an invalid address locally", async ({ page }) => {
    await page.goto("/");

    const field = page.getByLabel("Occasional updates");
    await field.fill("not-an-email");
    await page.getByRole("button", { name: "Subscribe to updates" }).click();

    await expect(page.getByText(/Enter a valid email address/)).toBeVisible();
    await expect(page.getByText(/You are on the list/)).toHaveCount(0);
  });

  test("unknown routes render the custom 404 page", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");

    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: "This page could not be found." }),
    ).toBeVisible();
  });
});

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("opens the mobile menu and follows a service link", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const mobileNav = page.getByRole("navigation", { name: "Mobile" });
    await expect(mobileNav).toBeVisible();

    await mobileNav.getByText("Services", { exact: true }).click();
    const serviceLink = mobileNav.getByRole("link", {
      name: "Business Website Development",
    });
    await expect(serviceLink).toBeVisible();

    await serviceLink.click();
    await expect(page).toHaveURL(/\/services\/business-website$/);
  });

  test("mobile solution tabs remain usable", async ({ page }) => {
    await page.goto("/solutions");

    await page.getByRole("tab", { name: /Keep a live product healthy/ }).click();
    await expect(
      page.getByRole("tabpanel").getByRole("heading", {
        level: 3,
        name: "Keep a live product healthy",
      }),
    ).toBeVisible();
  });
});
