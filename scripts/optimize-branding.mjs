/**
 * Generates web-optimized branding assets from /assets/brand/source.
 * Run: npm run branding:optimize
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SOURCE_DIR = path.join(ROOT, 'assets', 'brand', 'source');
const OUT_DIR = path.join(ROOT, 'public', 'brand');
const APP_DIR = path.join(ROOT, 'app');

const SOURCES = {
  infinitus: 'infinitus-logo.png',
  rit: 'rit-logo-black.png',
};

const INFINITUS_VARIANTS = [
  { name: 'infinitus-nav', size: 80, quality: 88 },
  { name: 'infinitus-hero', size: 320, quality: 92 },
  { name: 'infinitus-footer', size: 112, quality: 90 },
  { name: 'infinitus-loader', size: 256, quality: 92 },
];

const RIT_VARIANTS = [
  { name: 'rit-sm', width: 160, quality: 90 },
  { name: 'rit-md', width: 220, quality: 90 },
  { name: 'rit-lg', width: 280, quality: 92 },
];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function optimizeSquareLogo(inputPath, variants) {
  for (const variant of variants) {
    const webpPath = path.join(OUT_DIR, `${variant.name}.webp`);
    await sharp(inputPath)
      .resize(variant.size, variant.size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .webp({ quality: variant.quality, effort: 6 })
      .toFile(webpPath);

    const stats = await fs.stat(webpPath);
    console.log(`  ✓ ${path.basename(webpPath)} (${(stats.size / 1024).toFixed(1)} KB)`);
  }
}

async function optimizeRitLogo(inputPath) {
  for (const variant of RIT_VARIANTS) {
    const webpPath = path.join(OUT_DIR, `${variant.name}.webp`);
    await sharp(inputPath)
      .resize({ width: variant.width, withoutEnlargement: true })
      .webp({ quality: variant.quality, effort: 6 })
      .toFile(webpPath);

    const stats = await fs.stat(webpPath);
    console.log(`  ✓ ${path.basename(webpPath)} (${(stats.size / 1024).toFixed(1)} KB)`);
  }
}

async function main() {
  await ensureDir(OUT_DIR);
  await ensureDir(APP_DIR);

  const infinitusSrc = path.join(SOURCE_DIR, SOURCES.infinitus);
  const ritSrc = path.join(SOURCE_DIR, SOURCES.rit);

  console.log('Optimizing Infinitus logo…');
  await optimizeSquareLogo(infinitusSrc, INFINITUS_VARIANTS);

  console.log('Optimizing RIT logo…');
  await optimizeRitLogo(ritSrc);

  const ogPngPath = path.join(OUT_DIR, 'infinitus-og.png');
  await sharp(infinitusSrc)
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9, palette: false })
    .toFile(ogPngPath);
  console.log(`  ✓ ${path.basename(ogPngPath)} (${((await fs.stat(ogPngPath)).size / 1024).toFixed(1)} KB)`);

  const faviconPath = path.join(OUT_DIR, 'favicon.png');
  await sharp(infinitusSrc)
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(faviconPath);
  console.log(`  ✓ favicon.png (${((await fs.stat(faviconPath)).size / 1024).toFixed(1)} KB)`);

  // Next.js App Router tab icons
  await sharp(infinitusSrc)
    .resize(48, 48, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(path.join(APP_DIR, 'icon.png'));
  await sharp(infinitusSrc)
    .resize(180, 180, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(path.join(APP_DIR, 'apple-icon.png'));
  console.log('  ✓ app/icon.png + app/apple-icon.png');

  console.log('\nDone — optimized assets written to public/brand/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
