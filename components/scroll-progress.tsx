"use client";

import { useEffect, useRef } from "react";

/**
 * Ember-thin progress line across the top of the viewport. Smoothness
 * comes from driving `transform: scaleX()` on the bar via requestAnimationFrame
 * and lerping the current scroll value toward the target, rather than
 * reacting to raw scroll events with CSS transitions that stutter.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let target = 0;
    let current = 0;
    let raf = 0;

    const updateTarget = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      target = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
    };

    const tick = () => {
      // Lerp toward the target each frame — GPU-accelerated scaleX avoids
      // layout and paint. 0.14 feels responsive without jitter.
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.0005) current = target;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${current})`;
      }
      raf = window.requestAnimationFrame(tick);
    };

    updateTarget();
    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget);
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 right-0 top-0 z-50 h-[2px]"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-[linear-gradient(90deg,#ff7b3b,#ffbb6b,#5ddbc2)]"
        style={{ transform: "scaleX(0)", willChange: "transform" }}
      />
    </div>
  );
}
