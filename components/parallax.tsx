"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

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

/**
 * Public wrapper. Decides whether to mount the framer-motion impl at all.
 *
 * Originally the touch check lived inside the impl as a state flag, but the
 * useScroll/useSpring/useTransform hooks still ran every render and reacted
 * to scroll events even when their motion values weren't bound to the DOM.
 * That wasted JS per scroll across all twelve Parallax instances on the
 * page — enough to keep mobile feeling laggy.
 *
 * Splitting wrapper from impl means the impl's hooks are never instantiated
 * on touch devices or under prefers-reduced-motion.
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

function ParallaxImpl({
  children,
  distance = 60,
  tilt = 0,
  className = "",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(rawY, {
    stiffness: 110,
    damping: 22,
    mass: 0.35,
  });

  // Normalized pointer position inside the element (-0.5 .. 0.5). Mapping
  // to rotation with sign flips so the tilt reads as "looking into the
  // element" rather than a flat offset.
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const rotateY = useTransform(tx, [-0.5, 0.5], [-tilt, tilt]);
  const rotateX = useTransform(ty, [-0.5, 0.5], [tilt, -tilt]);
  const springRX = useSpring(rotateX, { stiffness: 90, damping: 18, mass: 0.25 });
  const springRY = useSpring(rotateY, { stiffness: 90, damping: 18, mass: 0.25 });

  useEffect(() => {
    if (!ref.current || tilt === 0) return;
    const el = ref.current;
    const handle = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      tx.set(nx);
      ty.set(ny);
    };
    const reset = () => {
      tx.set(0);
      ty.set(0);
    };
    el.addEventListener("pointermove", handle, { passive: true });
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", handle);
      el.removeEventListener("pointerleave", reset);
    };
  }, [tilt, tx, ty]);

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  const style: Record<string, unknown> = { y, willChange: "transform" };
  if (tilt > 0) {
    style.rotateX = springRX;
    style.rotateY = springRY;
    style.transformPerspective = 1100;
    style.transformStyle = "preserve-3d";
  }

  return (
    <motion.div ref={ref} style={style} className={className}>
      {children}
    </motion.div>
  );
}
