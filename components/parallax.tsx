"use client";

import dynamic from "next/dynamic";
import { ReactNode, useEffect, useState } from "react";

type ParallaxProps = {
  children: ReactNode;
  /** Pixel range the element translates over its scroll lifetime. */
  distance?: number;
  /**
   * Maximum rotation (in degrees) applied when the pointer hovers over the
   * element. 0 disables cursor tilt and keeps the original scroll-only
   * parallax behaviour.
   */
  tilt?: number;
  className?: string;
};

// framer-motion only ships in the chunk that holds ParallaxImpl. On
// touch / reduced-motion the wrapper short-circuits to a plain div and
// this import is never requested, so phones never download or parse
// framer-motion (~40KB gzipped JS).
const ParallaxImpl = dynamic(
  () => import("./parallax-impl").then((m) => m.ParallaxImpl),
  { ssr: false, loading: () => null }
);

/**
 * Public wrapper. Decides whether to mount the framer-motion impl at all.
 *
 * On touch devices and under prefers-reduced-motion, renders a plain div
 * that simply passes through `children` and `className`. On desktop
 * (with motion enabled) it lazily loads `ParallaxImpl` via next/dynamic.
 */
export function Parallax(props: ParallaxProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    setEnabled(!reduced && !touch);
  }, []);

  if (!enabled) {
    return <div className={props.className}>{props.children}</div>;
  }

  return <ParallaxImpl {...props} />;
}
