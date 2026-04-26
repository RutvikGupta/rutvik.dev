"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

type ParallaxImplProps = {
  children: ReactNode;
  distance?: number;
  tilt?: number;
  className?: string;
};

/**
 * Heavy framer-motion path for the desktop parallax/tilt effect. This file
 * is dynamically imported by `parallax.tsx` so framer-motion never lands
 * in the mobile bundle (touch + reduced-motion users render the plain
 * wrapper from parallax.tsx without ever hitting this code).
 */
export function ParallaxImpl({
  children,
  distance = 60,
  tilt = 0,
  className = "",
}: ParallaxImplProps) {
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
