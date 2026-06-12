/**
 * Convierte public/center-figure.png (1024×1536, ~2.5MB) a WebP con alfa,
 * redimensionado al tamaño máximo real de render (560px locales × escala
 * 0.73 ≈ 410px CSS → 820px @2x). Usa el canvas de Chromium vía Playwright.
 *
 *   node scripts/optimize-center-figure.js
 */
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "public", "center-figure.png");
const OUT = path.join(__dirname, "..", "public", "center-figure.webp");
const TARGET_WIDTH = 820;
const QUALITY = 0.82;

(async () => {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage();
  const dataUrl =
    "data:image/png;base64," + fs.readFileSync(SRC).toString("base64");

  const webpDataUrl = await page.evaluate(
    async ({ dataUrl, width, quality }) => {
      const img = new Image();
      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
        img.src = dataUrl;
      });
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = Math.round((img.height / img.width) * width);
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/webp", quality);
    },
    { dataUrl, width: TARGET_WIDTH, quality: QUALITY },
  );

  fs.writeFileSync(OUT, Buffer.from(webpDataUrl.split(",")[1], "base64"));
  await browser.close();

  const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
  console.log(`${kb(fs.statSync(SRC).size)} → ${kb(fs.statSync(OUT).size)}`);
})();
