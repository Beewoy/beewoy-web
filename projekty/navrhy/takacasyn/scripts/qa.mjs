import { chromium } from "/Users/tiborantal/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";

const browser = await chromium.launch({
  headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
const errors = [];

async function checkViewport(width, height, colorScheme) {
  const page = await browser.newPage({ viewport: { width, height }, colorScheme });
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("http://127.0.0.1:4173", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(900);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflow > 1) throw new Error(`Horizontal overflow at ${width}px: ${overflow}px`);
  return page;
}

const desktop = await checkViewport(1440, 1000, "light");
await desktop.screenshot({ path: "/tmp/takac-desktop.png", fullPage: false });

await desktop.locator("#company").fill("Potraviny U suseda");
await desktop.locator("#contact-person").fill("Jana Horváthová");
await desktop.locator("#email").fill("jana@example.sk");
await desktop.locator("#phone").fill("0900 123 456");
await desktop.locator("#delivery-address").fill("Hlavná 12, Trnava");
await desktop.locator("#week-start").fill("2026-09-14");
await desktop.locator("#order-next").click();
await desktop.locator(".picker-item").first().waitFor();
const productCount = await desktop.locator(".picker-item").count();
if (productCount !== 94) throw new Error(`Expected 94 products, found ${productCount}`);
await desktop.locator(".picker-add").nth(0).click();
await desktop.locator(".picker-add").nth(1).click();
await desktop.locator("#order-next").click();
await desktop.locator(".quantity-input").first().fill("12");
await desktop.locator("#order-next").click();
const reviewText = await desktop.locator("#order-review").innerText();
if (!reviewText.includes("Potraviny U suseda") || !reviewText.includes("12 ks.")) {
  throw new Error("Order review is missing submitted details");
}
await desktop.locator("#objednavka").screenshot({ path: "/tmp/takac-order.png" });

const excelHref = await desktop.locator(".excel-fallback a").getAttribute("href");
const excelResponse = await desktop.request.get(new URL(excelHref, desktop.url()).href);
if (!excelResponse.ok()) throw new Error(`Excel fallback returned ${excelResponse.status()}`);
await desktop.close();

for (const width of [375, 768, 1024]) {
  const page = await checkViewport(width, 900, width === 375 ? "dark" : "light");
  if (width === 375) await page.screenshot({ path: "/tmp/takac-mobile.png", fullPage: false });
  await page.close();
}

await browser.close();
if (errors.length) throw new Error(`Browser errors: ${errors.join(" | ")}`);
console.log("QA passed: responsive widths, 94 products, ordering flow, review and Excel download.");
