"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type WordRevealProps = {
  /** The text to split into words. Must be a plain string. */
  text: string;
  /**
   * Tokens (words or markers) that should be rendered as italic accent.
   * Case-sensitive exact-match on the word after whitespace split.
   */
  accentWords?: string[];
  /** Per-word stagger delay in ms. */
  stagger?: number;
  className?: string;
  /**
   * Optional wrapper for the entire rendered line — e.g. "h1" or "h2".
   * Defaults to a plain span so caller can wrap it.
   */
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/**
 * Splits text into words and fades + blurs + translates each one up as the
 * element enters view. Cinematic, used for display headlines.
 */
export function WordReveal({
  text,
  accentWords = [],
  stagger = 80,
  className = "",
  as: Tag = "span",
}: WordRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Split keeping punctuation glued to preceding word.
  const words = text.split(/\s+/);

  return (
    <Tag
      ref={ref as React.LegacyRef<HTMLHeadingElement & HTMLSpanElement & HTMLParagraphElement>}
      className={className}
      aria-label={text}
    >
      {words.map((word, i) => {
        const stripped = word.replace(/[.,!?;:]$/g, "");
        const isAccent = accentWords.includes(stripped);
        const delay = i * stagger;
        return (
          <span
            key={i}
            aria-hidden="true"
            style={{
              display: "inline-block",
              whiteSpace: "pre",
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translateY(0) scale(1)"
                : "translateY(0.4em) scale(0.96)",
              filter: visible ? "blur(0)" : "blur(6px)",
              transition:
                "opacity 0.9s cubic-bezier(0.2,0.8,0.2,1), transform 0.9s cubic-bezier(0.2,0.8,0.2,1), filter 0.9s cubic-bezier(0.2,0.8,0.2,1)",
              transitionDelay: `${delay}ms`,
              willChange: "opacity, transform, filter",
            }}
            className={isAccent ? "ink" : undefined}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </Tag>
  );
}
