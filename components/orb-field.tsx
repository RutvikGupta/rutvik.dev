/**
 * Ambient gradient backdrop — three large blurred orbs (salmon, violet, teal)
 * that slowly drift behind all content. Pairs with the SVG grain overlay in
 * globals.css to create the grainy-editorial aesthetic.
 *
 * Fixed-position, non-interactive, z-index 0 (sits beneath everything else).
 */
export function OrbField() {
  return (
    <div aria-hidden="true" className="orb-field">
      <span className="orb orb-1" />
      <span className="orb orb-2" />
      <span className="orb orb-3" />
    </div>
  );
}
