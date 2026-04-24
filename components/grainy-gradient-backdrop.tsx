/**
 * Site-wide backdrop that sits behind every section. The hero has its own
 * local gradient blob — this component carries the subtler glows that
 * warm up the rest of the page without competing with the hero.
 */
export function GrainyGradientBackdrop() {
  return (
    <div aria-hidden="true" className="site-backdrop">
      <div className="site-backdrop-glow-a" />
      <div className="site-backdrop-glow-b" />
      <div className="site-backdrop-vignette" />
    </div>
  );
}
