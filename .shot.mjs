import { chromium, devices } from "@playwright/test";

const base = "http://127.0.0.1:3100";
const out = "/tmp/shots";
const browser = await chromium.launch();

// ---------- desktop ----------
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
await page.goto(base, { waitUntil: "networkidle" });
await page.waitForTimeout(4000);
await page.screenshot({ path: `${out}/01-hero-dark.png` });

// projects, with a row hovered so the pointer highlight + cursor label show
await page.evaluate(() =>
  document.querySelector("#projects").scrollIntoView({ block: "start" })
);
await page.waitForTimeout(2000);
const box = await page.locator("#projects li").first().boundingBox();
await page.mouse.move(box.x + box.width * 0.4, box.y + box.height / 2);
await page.mouse.move(box.x + box.width * 0.45, box.y + box.height / 2 + 6);
await page.waitForTimeout(900);
await page.screenshot({ path: `${out}/02-projects-hover.png` });

// experience + scroll spine
await page.evaluate(() =>
  document.querySelector("#experience").scrollIntoView({ block: "center" })
);
await page.mouse.wheel(0, 260);
await page.waitForTimeout(1400);
await page.screenshot({ path: `${out}/03-experience.png` });

// contact close
await page.evaluate(() =>
  document.querySelector("#contact").scrollIntoView({ block: "center" })
);
await page.waitForTimeout(1200);
await page.screenshot({ path: `${out}/04-contact.png` });

// light theme hero
await page.evaluate(() => window.scrollTo(0, 0));
await page.getByRole("button", { name: /switch to light theme/i }).click();
await page.waitForTimeout(2200);
await page.screenshot({ path: `${out}/05-hero-light.png` });
await ctx.close();

// ---------- mobile ----------
const mob = await browser.newContext({ ...devices["Pixel 7"] });
const mpage = await mob.newPage();
await mpage.goto(base, { waitUntil: "networkidle" });
await mpage.waitForTimeout(3000);
await mpage.screenshot({ path: `${out}/06-hero-mobile.png` });
await mpage.evaluate(() =>
  document.querySelector("#projects").scrollIntoView({ block: "start" })
);
await mpage.waitForTimeout(1600);
await mpage.screenshot({ path: `${out}/07-projects-mobile.png` });
await mob.close();

await browser.close();
console.log("done");
