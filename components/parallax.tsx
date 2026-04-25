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
 * Scroll-driven parallax + optional cursor-driven 3D tilt. The scroll
 * component animates translateY over the element's viewport lifetime; the
 * tilt component rotates the element around its center based on the
 * pointer's normalized position. Both are spring-smoothed so motion feels
 * organic rather than direct.
 */
export function Parallax({
  children,
  distance = 60,
  tilt = 0,
  className = "",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  // On touch devices the cursor-tilt is meaningless, and the scroll
  // parallax adds non-trivial framer-motion work per card (six cards × two
  // Parallaxes = twelve scroll/spring chains). Disable both on touch.
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(hover: none) and (pointer: coarse)");
    const sync = () => setIsTouch(mql.matches);
    sync();
    mql.addEventListener?.("change", sync);
    return () => mql.removeEventListener?.("change", sync);
  }, []);

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
    if (!ref.current || tilt === 0 || isTouch) return;
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
  }, [tilt, tx, ty, isTouch]);

  if (prefersReducedMotion || isTouch) {
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
