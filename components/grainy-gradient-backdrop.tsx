/**
 * Site-wide backdrop that sits behind every section. The two ambient
 * glows that warm up the rest of the page are baked into a single SVG
 * (`feGaussianBlur` does the blur once at rasterization, then it's a
 * cached texture). Only the dark vignette stays as a CSS gradient
 * since it's cheap and lets the underlying body color show through.
 */
export function GrainyGradientBackdrop() {
  return (
    <div aria-hidden="true" className="site-backdrop">
      {/* Pre-baked WebP — see HeroStage for the rationale. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/backdrop-glows.webp"
        alt=""
        className="site-backdrop-img"
        loading="eager"
        decoding="async"
      />
      <div className="site-backdrop-vignette" />
    </div>
  );
}
