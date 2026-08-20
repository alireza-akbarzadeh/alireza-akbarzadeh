import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration.
 *
 * `tests/smoke.spec.ts` has been in the repo for a while, but `pnpm test` could
 * never actually run: without a config there is no baseURL, and every
 * `page.goto("/")` in the suite resolves against nothing. This file is what
 * makes the existing tests executable — the specs themselves are unchanged.
 *
 * The server under test is the production build, not `next dev`. Prerendering,
 * static generation and the real bundle are exactly what the smoke suite is
 * asserting on, and the dev server's behaviour differs on all three.
 *
 * Port 3100 rather than 3000 so a running dev server doesn't get tested by
 * accident — or, worse, silently satisfy `reuseExistingServer` and have the
 * suite pass against unbuilt code.
 */
const PORT = Number(process.env.PLAYWRIGHT_PORT ?? 3100);
const baseURL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",

  use: {
    baseURL,
    trace: "on-first-retry",
  },

  /**
   * Both projects matter here rather than being belt-and-braces: the hero's
   * WebGL field, the contextual cursor and every magnetic control are gated on
   * pointer capability, so desktop and mobile genuinely execute different code
   * paths. A suite that only ran one of them would leave the other untested.
   */
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],

  webServer: {
    command: `npx next start --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
