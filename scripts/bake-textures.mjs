/**
 * One-shot bake: rasterize hero-blob.svg + backdrop-glows.svg into WebP at
 * 2x display resolution.
 *
 * Why: SVG <feGaussianBlur> appears to be re-executed by the browser when
 * the rasterization scale changes (zoom, DPR change). That's an expensive
 * Gaussian pass and shows up as a brief tear when the user zooms in. A
 * pre-rasterized WebP has no filter to re-execute — the browser just
 * samples the bitmap at any scale.
 *
 * Run with: `node scripts/bake-textures.mjs`. Re-run whenever the SVGs
 * change.
 */

import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(here, "..", "public");

async function bake(svgName, webpName, width, height) {
  const svgPath = resolve(publicDir, svgName);
  const webpPath = resolve(publicDir, webpName);
  const svg = await readFile(svgPath);
  await sharp(svg)
    .resize(width, height, { fit: "fill" })
    // Quality 60 is fine — the source is a heavily-blurred gradient with
    // no high-frequency detail to preserve. The browser then samples this
    // bitmap to whatever resolution the DOM needs, including on zoom.
    .webp({ quality: 60, effort: 6, smartSubsample: true })
    .toFile(webpPath);
  const size = (await sharp(webpPath).metadata()).size;
  console.log(
    `✓ ${svgName} -> ${webpName} (${width}x${height}, ${(size / 1024).toFixed(1)}KB)`
  );
}

await Promise.all([
  // Modest resolution — these are very low-frequency images. Browser
  // up/downsamples cleanly at any zoom.
  bake("hero-blob.svg", "hero-blob.webp", 1600, 1000),
  bake("backdrop-glows.svg", "backdrop-glows.webp", 1600, 1200),
]);

console.log("Done.");
