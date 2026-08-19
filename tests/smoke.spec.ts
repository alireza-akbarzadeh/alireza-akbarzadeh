import { expect, test } from "@playwright/test";

import { projects } from "../data/projects";

/**
 * Routes are imported from the same data the pages are generated from, so
 * adding a project adds a test rather than quietly leaving one uncovered.
 */
const STATIC_ROUTES = ["/", "/resume"];
const PROJECT_ROUTES = projects.map((project) => `/work/${project.slug}`);
const ALL_ROUTES = [...STATIC_ROUTES, ...PROJECT_ROUTES];

test.describe("every route renders", () => {
  for (const route of ALL_ROUTES) {
    test(`${route} responds 200 with an h1 and no console errors`, async ({
      page,
    }) => {
      const errors: string[] = [];
      const failedRequests: string[] = [];

      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        // "Failed to load resource" duplicates what the response listener below
        // records, but without the URL — so it cannot be filtered on its own
        // merits. Drop it here and judge the request itself instead.
        if (
          message.type() === "error" &&
          !message.text().startsWith("Failed to load resource")
        ) {
          errors.push(message.text());
        }
      });

      page.on("response", (response) => {
        if (response.status() < 400) return;
        // Vercel's analytics and speed-insights scripts are injected by the
        // framework and only exist when served from Vercel. Outside it they
        // 404 by design, which is not a defect in this app.
        if (response.url().includes("/_vercel/")) return;
        failedRequests.push(`${response.status()} ${response.url()}`);
      });

      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      // Exactly one h1: more than one is the most common heading-outline defect,
      // and it is invisible without a check like this.
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).not.toBeEmpty();

      expect(errors, `console errors on ${route}`).toEqual([]);
      expect(failedRequests, `failed requests on ${route}`).toEqual([]);
    });
  }
});

test.describe("theme", () => {
  test("defaults to dark and the toggle switches it", async ({ page }) => {
    await page.goto("/");

    const html = page.locator("html");
    await expect(html).toHaveClass(/dark/);

    const toggle = page.getByRole("button", { name: /switch to light theme/i });
    await toggle.click();

    await expect(html).toHaveClass(/light/);
    // The choice has to survive navigation, or it is not a preference.
    await page.goto("/work/tapsi-shop");
    await expect(html).toHaveClass(/light/);
  });

  test("light theme actually repaints the canvas", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /switch to light theme/i }).click();

    const background = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor
    );
    // Guards the specific regression where the class flips but the token layer
    // does not follow.
    expect(background).not.toBe("rgb(10, 10, 10)");
  });
});

test.describe("reduced motion", () => {
  test("renders content and throws nothing with motion disabled", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    // emulateMedia rather than test.use({ reducedMotion }): applied to this
    // page before the first navigation, it covers the same ground and keeps the
    // option typed against the page rather than the project fixtures.
    await page.emulateMedia({ reducedMotion: "reduce" });

    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();

    // GSAP reveals start elements at opacity 0. If the reduced-motion branch
    // fails to run, content stays invisible while the page still "loads" — the
    // failure mode this test exists for. Assert on a section heading well below
    // the fold, since that is the content a scroll-triggered reveal owns.
    await expect(page.locator("#projects h2")).toBeVisible();
    await expect(page.locator("#contact h2")).toBeVisible();

    await page.goto("/work/tapsi-shop");
    await expect(page.locator("h1")).toBeVisible();

    expect(errors).toEqual([]);
  });
});

test.describe("SEO surfaces", () => {
  test("sitemap lists every project", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);

    const body = await response.text();
    for (const project of projects) {
      expect(body, `sitemap missing ${project.slug}`).toContain(
        `/work/${project.slug}`
      );
    }
  });

  test("the CV PDF is downloadable", async ({ request }) => {
    // The file is a generated artefact of /resume (pnpm cv:pdf). If it is
    // missing the Download button on that page is a dead link, which is the
    // one failure a visitor would actually notice.
    const response = await request.get("/alireza-akbarzadeh-cv.pdf");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("pdf");

    const body = await response.body();
    expect(body.subarray(0, 4).toString()).toBe("%PDF");
    expect(body.byteLength).toBeGreaterThan(10_000);
  });

  test("robots.txt points at the sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain("sitemap.xml");
  });

  test("each project has its own social card", async ({ request }) => {
    for (const project of projects) {
      const response = await request.get(
        `/work/${project.slug}/opengraph-image`
      );
      expect(response.status(), `og image for ${project.slug}`).toBe(200);
      expect(response.headers()["content-type"]).toContain("image/png");
    }
  });
});
