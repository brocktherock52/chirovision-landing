// Build marketing images for ChiroVision:
//   /public/hero-chirovision.jpg  (1600x2000, 4:5 portrait, browser frame + dashboard)
//   /public/hero-chirovision-laptop.jpg  (1600x1200, 4:3 landscape, browser frame + dashboard)
//   /public/og-chirovision.jpg     (1200x630, social card)
//
// All images use Eric's real dashboard screenshot as the device-frame content,
// composited on the ChiroVision cream canvas with the brand wordmark.
//
// Run: node scripts/build-marketing-images.mjs

import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const publicDir = path.join(repoRoot, "public");
const screenshot = path.join(publicDir, "screenshots", "dashboard.jpg");

// Brand colors (match src/index.css)
const CREAM = "#F7F1E6"; // background
const INK = "#161A24"; // foreground near-black
const PRIMARY = "#127E94"; // teal
const ACCENT = "#F39A2B"; // amber

function browserFrameSvg({ width, height, contentW, contentH, contentX, contentY, label }) {
  // Render a soft browser/window chrome around the screenshot area.
  const radius = 28;
  const trafficY = contentY - 30;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#F9F3E7"/>
      <stop offset="100%" stop-color="#F0E8D6"/>
    </linearGradient>
    <linearGradient id="accentGlow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${PRIMARY}" stop-opacity="0.18"/>
    </linearGradient>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="40" stdDeviation="40" flood-color="${INK}" flood-opacity="0.18"/>
    </filter>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <!-- Soft accent blob top-right -->
  <circle cx="${width * 0.85}" cy="${height * 0.15}" r="${Math.min(width, height) * 0.32}" fill="url(#accentGlow)"/>
  <!-- Soft accent blob bottom-left -->
  <circle cx="${width * 0.1}" cy="${height * 0.9}" r="${Math.min(width, height) * 0.28}" fill="url(#accentGlow)"/>
  <!-- Window card -->
  <g filter="url(#cardShadow)">
    <rect x="${contentX - 18}" y="${contentY - 60}" width="${contentW + 36}" height="${contentH + 78}" rx="${radius}" ry="${radius}" fill="#FFFFFF" stroke="#E6DBC4" stroke-width="2"/>
    <!-- Window chrome bar -->
    <rect x="${contentX - 18}" y="${contentY - 60}" width="${contentW + 36}" height="44" rx="${radius}" ry="${radius}" fill="#FFFFFF"/>
    <rect x="${contentX - 18}" y="${contentY - 32}" width="${contentW + 36}" height="14" fill="#FFFFFF"/>
    <!-- Traffic lights -->
    <circle cx="${contentX + 6}" cy="${trafficY - 8}" r="7" fill="#E26C5A"/>
    <circle cx="${contentX + 28}" cy="${trafficY - 8}" r="7" fill="#E6B650"/>
    <circle cx="${contentX + 50}" cy="${trafficY - 8}" r="7" fill="#7DB76A"/>
    <!-- URL pill -->
    <rect x="${contentX + 78}" y="${trafficY - 18}" width="${contentW - 96}" height="22" rx="11" ry="11" fill="#F4ECDC" stroke="#E6DBC4" stroke-width="1"/>
    <text x="${contentX + 100}" y="${trafficY - 3}" font-family="Inter, sans-serif" font-size="11" fill="#5F6577" font-weight="500">app.chirovision.com/${label || "dashboard"}</text>
  </g>
</svg>`;
}

async function compositeBrowser({ outPath, width, height, jpegQuality = 88 }) {
  // Reserve outer margins so the device frame floats on the cream canvas.
  // contentW/H is the screenshot area, centered horizontally, biased upward.
  const marginX = Math.round(width * 0.06);
  const marginTopExtra = 80; // room for window chrome above
  const contentW = width - marginX * 2;
  const contentH = Math.round((height - marginTopExtra) * 0.84);
  const contentX = marginX;
  const contentY = marginTopExtra + 40;
  const label = "dashboard";

  const frame = Buffer.from(browserFrameSvg({ width, height, contentW, contentH, contentX, contentY, label }));

  // Prepare the screenshot to fit the content area.
  const shot = await sharp(screenshot)
    .resize(contentW, contentH, { fit: "cover", position: "top" })
    .png()
    .toBuffer();

  const radius = 20;
  const maskSvg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${contentW}" height="${contentH}"><rect width="${contentW}" height="${contentH}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`,
  );
  const roundedShot = await sharp(shot)
    .composite([{ input: maskSvg, blend: "dest-in" }])
    .png()
    .toBuffer();

  await sharp(frame)
    .composite([{ input: roundedShot, left: contentX, top: contentY }])
    .jpeg({ quality: jpegQuality, mozjpeg: true })
    .toFile(outPath);

  // Also drop a webp sibling at same path with .webp extension.
  const webpPath = outPath.replace(/\.jpg$/i, ".webp");
  await sharp(frame)
    .composite([{ input: roundedShot, left: contentX, top: contentY }])
    .webp({ quality: 82 })
    .toFile(webpPath);
}

async function buildOg() {
  const W = 1200;
  const H = 630;
  const padX = 64;
  const screenshotW = 580;
  const screenshotH = 380;
  const screenshotX = padX;
  const screenshotY = Math.round((H - screenshotH) / 2);
  const textX = screenshotX + screenshotW + 56;

  const bg = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F9F3E7"/>
      <stop offset="100%" stop-color="#EFE6D2"/>
    </linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${PRIMARY}" stop-opacity="0.22"/>
    </linearGradient>
    <filter id="sh" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="20" stdDeviation="22" flood-color="${INK}" flood-opacity="0.22"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="${W - 60}" cy="40" r="220" fill="url(#glow)"/>
  <circle cx="40" cy="${H - 40}" r="190" fill="url(#glow)"/>
  <g filter="url(#sh)">
    <rect x="${screenshotX - 10}" y="${screenshotY - 34}" width="${screenshotW + 20}" height="${screenshotH + 44}" rx="22" ry="22" fill="#FFFFFF" stroke="#E6DBC4" stroke-width="2"/>
    <circle cx="${screenshotX + 14}" cy="${screenshotY - 16}" r="6" fill="#E26C5A"/>
    <circle cx="${screenshotX + 32}" cy="${screenshotY - 16}" r="6" fill="#E6B650"/>
    <circle cx="${screenshotX + 50}" cy="${screenshotY - 16}" r="6" fill="#7DB76A"/>
  </g>
  <!-- Wordmark + tagline -->
  <text x="${textX}" y="216" font-family="Fraunces, Georgia, serif" font-size="68" font-weight="700" fill="${INK}">ChiroVision</text>
  <line x1="${textX}" y1="240" x2="${textX + 110}" y2="240" stroke="${ACCENT}" stroke-width="6" stroke-linecap="round"/>
  <text x="${textX}" y="296" font-family="Fraunces, Georgia, serif" font-size="30" font-weight="500" fill="${INK}">Imaging and diagnostics</text>
  <text x="${textX}" y="334" font-family="Fraunces, Georgia, serif" font-size="30" font-weight="500" fill="${INK}">for the modern</text>
  <text x="${textX}" y="372" font-family="Fraunces, Georgia, serif" font-size="30" font-weight="500" fill="${INK}">chiropractic practice.</text>
  <text x="${textX}" y="436" font-family="Inter, sans-serif" font-size="20" font-weight="600" fill="${PRIMARY}">10-day free trial . No credit card</text>
  <text x="${textX}" y="528" font-family="Inter, sans-serif" font-size="15" font-weight="500" fill="#5F6577">A product of Picture Perfect Health, LLC</text>
  <text x="${textX}" y="554" font-family="Inter, sans-serif" font-size="13" font-weight="500" fill="#5F6577">Dr. Eric Hal Feintuch, D.C., CCSD</text>
</svg>`);

  const shot = await sharp(screenshot)
    .resize(screenshotW, screenshotH, { fit: "cover", position: "top" })
    .png()
    .toBuffer();
  const maskSvg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${screenshotW}" height="${screenshotH}"><rect width="${screenshotW}" height="${screenshotH}" rx="14" ry="14" fill="#fff"/></svg>`,
  );
  const roundedShot = await sharp(shot)
    .composite([{ input: maskSvg, blend: "dest-in" }])
    .png()
    .toBuffer();

  const out = path.join(publicDir, "og-chirovision.jpg");
  await sharp(bg)
    .composite([{ input: roundedShot, left: screenshotX, top: screenshotY }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(out);

  // Also write a webp twin (some scrapers prefer it).
  await sharp(bg)
    .composite([{ input: roundedShot, left: screenshotX, top: screenshotY }])
    .webp({ quality: 82 })
    .toFile(path.join(publicDir, "og-chirovision.webp"));
}

async function main() {
  // Hero portrait, used in the right column of the cinematic hero (aspect ~4:5).
  await compositeBrowser({
    outPath: path.join(publicDir, "hero-chirovision.jpg"),
    width: 1600,
    height: 2000,
  });

  // Hero landscape, used in the trial form right rail (aspect ~4:3).
  await compositeBrowser({
    outPath: path.join(publicDir, "hero-chirovision-laptop.jpg"),
    width: 1600,
    height: 1200,
  });

  await buildOg();

  console.log("Marketing images written:");
  console.log("  /public/hero-chirovision.jpg + .webp");
  console.log("  /public/hero-chirovision-laptop.jpg + .webp");
  console.log("  /public/og-chirovision.jpg + .webp");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
