/**
 * Renders /resume to public/alireza-akbarzadeh-cv.pdf.
 *
 * Run with `pnpm cv:pdf` after changing anything in data/resume.ts.
 *
 * Why a script and not a build step: generating this needs a real browser, and
 * putting a Chromium download inside `next build` would add ~40s and ~150MB to
 * every deploy to produce a file that changes a few times a year. It is a
 * release artefact, not a build output.
 *
 * Why generated from the page rather than authored separately: a hand-made PDF
 * is a second copy of the content, and second copies drift. This one is the
 * page, printed — if the page is right, the PDF is right.
 *
 * Playwright is already a devDependency for the smoke suite, so this adds no
 * new tooling.
 */
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { setTimeout as delay } from "node:timers/promises";

import { chromium } from "@playwright/test";

const PORT = Number(process.env.CV_PORT ?? 3410);
const ORIGIN = `http://127.0.0.1:${PORT}`;
const OUTPUT = "public/alireza-akbarzadeh-cv.pdf";

/** Poll until the server answers, rather than guessing at a sleep duration. */
async function waitForServer(url, timeoutMs = 90_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // not up yet
    }
    await delay(400);
  }
  throw new Error(`Server did not become ready at ${url} within ${timeoutMs}ms`);
}

const server = spawn(
  "npx",
  ["next", "start", "-p", String(PORT), "-H", "127.0.0.1"],
  { stdio: "ignore" }
);

let browser;
try {
  await waitForServer(`${ORIGIN}/resume`);

  browser = await chromium.launch(
    process.env.CV_CHROMIUM ? { executablePath: process.env.CV_CHROMIUM } : {}
  );

  // page.pdf() never fires beforeprint, so the runtime theme swap that covers
  // a human hitting Print does not apply here. Seed the stored preference
  // instead, so the document renders light from first paint.
  const context = await browser.newContext({ colorScheme: "light" });
  await context.addInitScript(() => {
    try {
      localStorage.setItem("theme", "light");
    } catch {
      // Storage disabled — the print stylesheet still handles the content box.
    }
  });
  const page = await context.newPage();

  // Light explicitly: the print stylesheet already forces a light surface, but
  // asking for it here means the PDF is never at the mercy of whatever theme
  // the automation profile happened to default to.
  await page.emulateMedia({ media: "print", colorScheme: "light" });
  await page.goto(`${ORIGIN}/resume`, { waitUntil: "networkidle" });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    // The @page rule in globals.css sets the real margins; zero here so the two
    // do not stack into an oversized gutter.
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });

  await mkdir("public", { recursive: true });
  await writeFile(OUTPUT, pdf);

  console.log(`Wrote ${OUTPUT} (${(pdf.length / 1024).toFixed(0)} KB)`);
} finally {
  await browser?.close();
  server.kill();
}
