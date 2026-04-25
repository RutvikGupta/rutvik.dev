"use client";

import { useEffect } from "react";

/**
 * Subtle cursor-following bloom. Smoothed via rAF lerp and fades on
 * scroll / pointer-leave so it stays background ambience rather than
 * dominant. Feeds CSS variables consumed by `.gradient-cursor`.
 */
export function Spotlight() {
  useEffect(() => {
    // Touch devices don't have a cursor, so the pointer bloom is invisible
    // overhead — and the rAF tick + pointermove listener was contributing
    // to mobile scroll jank. Bail before allocating anything.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none) and (pointer: coarse)").matches
    ) {
      return;
    }

    const root = document.documentElement;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let raf = 0;
    let idleTimer: number | undefined;

    const tick = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      root.style.setProperty("--mx", `${currentX}px`);
      root.style.setProperty("--my", `${currentY}px`);
      raf = window.requestAnimationFrame(tick);
    };

    const armIdleFade = () => {
      if (idleTimer) window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        root.style.setProperty("--cursor-opacity", "0.14");
      }, 600);
    };

    const handleMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      root.style.setProperty("--cursor-opacity", "0.42");
      armIdleFade();
    };

    const handleScroll = () => {
      root.style.setProperty("--cursor-opacity", "0.08");
      armIdleFade();
    };

    const handleLeave = () => {
      root.style.setProperty("--cursor-opacity", "0.04");
    };

    raf = window.requestAnimationFrame(tick);
    armIdleFade();
    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointerleave", handleLeave);

    return () => {
      window.cancelAnimationFrame(raf);
      if (idleTimer) window.clearTimeout(idleTimer);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return <div aria-hidden="true" className="gradient-cursor" />;
}
