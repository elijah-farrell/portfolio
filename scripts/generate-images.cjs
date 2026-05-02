/**
 * Generates responsive image sizes for Lighthouse / LCP optimization.
 * Run: node scripts/generate-images.cjs
 * Requires: npm install --save-dev sharp
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const PUBLIC = path.resolve(__dirname, "../public/assets");

const HERO_WIDTHS = [320, 400, 800];
const PROJECT_WIDTHS = [400, 800];
const LOGO_WIDTHS = [64, 128];

const webpOptions = { quality: 76, effort: 5 };

async function resizeToWidths(inputPath, widths, suffix = "w") {
  const dir = path.dirname(inputPath);
  const ext = path.extname(inputPath);
  const base = path.basename(inputPath, ext);

  for (const w of widths) {
    const outPath = path.join(dir, `${base}-${w}${suffix}.webp`);
    const meta = await sharp(inputPath).metadata();
    if (meta.width <= w) continue; // skip if source is smaller
    await sharp(inputPath)
      .resize(w, null, { withoutEnlargement: true })
      .webp(webpOptions)
      .toFile(outPath);
    console.log("  ", path.relative(PUBLIC, outPath));
  }
}

async function main() {
  const hero = [
    path.join(PUBLIC, "pfp.webp"),
    path.join(PUBLIC, "animated.webp"),
  ];
  const projects = [
    path.join(PUBLIC, "projects/portfolio-thumb.webp"),
    path.join(PUBLIC, "projects/awwards.webp"),
    path.join(PUBLIC, "projects/MoreArmorLogo.webp"),
    path.join(PUBLIC, "projects/olies-island-adventure-cover.png"),
    path.join(PUBLIC, "projects/cyber-developer-portfolio.png"),
  ];
  const logos = [
    path.join(PUBLIC, "logos/suny-poly-logo.webp"),
    path.join(PUBLIC, "logos/workplace.webp"),
    path.join(PUBLIC, "logos/the-arc-logo.webp"),
  ];

  const arcLogoPng = path.join(PUBLIC, "logos/the-arc-logo.png");
  const arcLogoWebp = path.join(PUBLIC, "logos/the-arc-logo.webp");
  if (fs.existsSync(arcLogoPng)) {
    await sharp(arcLogoPng).webp(webpOptions).toFile(arcLogoWebp);
    console.log("Logo master:", path.relative(PUBLIC, arcLogoWebp));
  }

  const sunyLogoSrc = path.join(PUBLIC, "logos/suny-poly-logo.jpg");
  const sunyLogoWebp = path.join(PUBLIC, "logos/suny-poly-logo.webp");
  if (fs.existsSync(sunyLogoSrc)) {
    await sharp(sunyLogoSrc).webp(webpOptions).toFile(sunyLogoWebp);
    console.log("Logo master:", path.relative(PUBLIC, sunyLogoWebp));
  }

  for (const p of hero) {
    if (!fs.existsSync(p)) continue;
    console.log("Hero:", path.relative(PUBLIC, p));
    await resizeToWidths(p, HERO_WIDTHS);
  }
  for (const p of projects) {
    if (!fs.existsSync(p)) continue;
    console.log("Project:", path.relative(PUBLIC, p));
    await resizeToWidths(p, PROJECT_WIDTHS);
  }
  for (const p of logos) {
    if (!fs.existsSync(p)) continue;
    console.log("Logo:", path.relative(PUBLIC, p));
    await resizeToWidths(p, LOGO_WIDTHS);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
