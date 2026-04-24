/**
 * Hero stage is now just the grainy gradient blob that sits behind the
 * headline. The collage of floating device mockups was replaced with a
 * single atmospheric blob so the homepage reads like the Figma reference
 * — dark canvas + one hero gradient + massive typography.
 */
export function HeroStage() {
  return (
    <div aria-hidden="true" className="hero-blob">
      <div className="hero-blob-core" />
      <div className="hero-blob-warm" />
      <div className="hero-blob-cool" />
      <div className="hero-blob-grain" />
      <div className="hero-blob-fade" />
    </div>
  );
}
