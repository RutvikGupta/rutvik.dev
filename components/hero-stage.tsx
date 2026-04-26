/**
 * Hero stage — single baked SVG of the warm gradient blob plus the
 * existing grain overlay and edge fade.
 *
 * Previously this stacked three absolutely-positioned divs each running
 * `filter: blur(90px) saturate(1.35)` on continuous infinite animations,
 * which forced the browser to re-rasterize big offscreen bitmaps every
 * frame on mobile GPUs. The SVG bakes both the blur and saturate once
 * at first paint via `feGaussianBlur` + `feColorMatrix`, then the
 * browser caches the rasterized result and just samples a texture.
 *
 * The slow drift animation lives on the img itself in CSS — a single
 * compositor-only translate keyframe (no re-paint, no re-rasterize).
 */
export function HeroStage() {
  return (
    <div aria-hidden="true" className="hero-blob">
      {/* Pre-baked WebP (rasterized from public/hero-blob.svg via
          scripts/bake-textures.mjs). The SVG version had `feGaussianBlur`
          which the browser re-executes when the rasterization scale
          changes — visible as a tear when zooming. The WebP is just a
          bitmap; the browser samples it at any scale, no filter to run. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-blob.webp"
        alt=""
        className="hero-blob-img"
        loading="eager"
        decoding="async"
      />
      <div className="hero-blob-grain" />
      <div className="hero-blob-fade" />
    </div>
  );
}
