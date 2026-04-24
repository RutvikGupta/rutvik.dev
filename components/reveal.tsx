"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type RevealProps = {
  children: ReactNode;
  /** Delay (ms) before the reveal starts once the element enters view. */
  delay?: number;
  className?: string;
  /** Translate distance before reveal — "sm" (10px) or "md" (28px). */
  distance?: "sm" | "md";
  /** Pre-reveal visual treatment. Defaults to blur + scale + translate. */
  variant?: "default" | "subtle" | "zoom";
};

/**
 * IntersectionObserver-backed scroll reveal. Default variant fades + blurs
 * + scales the child in for a cinematic feel (Yuto Takahashi / Apple-style).
 * Respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  distance = "sm",
  variant = "default",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      {
        rootMargin: "0px 0px 18% 0px",
        threshold: 0.01,
      }
    );

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const hiddenY = distance === "md" ? 28 : 10;
  const hiddenStyle =
    variant === "zoom"
      ? {
          opacity: 0,
          transform: `translateY(${hiddenY}px) scale(0.97)`,
          filter: "blur(3px)",
        }
      : variant === "subtle"
      ? {
          opacity: 0,
          transform: `translateY(${hiddenY}px)`,
          filter: "blur(0)",
        }
      : {
          opacity: 0,
          transform: `translateY(${hiddenY}px) scale(0.992)`,
          filter: "blur(2px)",
        };

  const visibleStyle = {
    opacity: 1,
    transform: "translateY(0) scale(1)",
    filter: "blur(0)",
  };

  return (
    <div
      ref={ref}
      style={{
        ...(visible ? visibleStyle : hiddenStyle),
        transition:
          "opacity 560ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 560ms cubic-bezier(0.2, 0.8, 0.2, 1), filter 560ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform, filter",
      }}
      className={className}
    >
      {children}
    </div>
  );
}
