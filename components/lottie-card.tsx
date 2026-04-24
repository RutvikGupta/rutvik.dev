"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Lottie renders only on the client — dynamic import with SSR disabled
// keeps the initial payload small and avoids DOM mismatch warnings.
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type LottieCardProps = {
  /** Path under /public, e.g. "/lottie/chat.json". */
  src: string;
  /** Optional label shown in the terminal title bar. */
  label?: string;
  /** Height class (Tailwind) — defaults to h-48 to match other previews. */
  heightClass?: string;
  /** Whether to play on hover of the parent .journey-card only. */
  hoverOnly?: boolean;
};

/**
 * Drop-in wrapper that renders a Lottie JSON inside the same terminal-tile
 * frame the rest of the previews use. Loads the JSON at runtime, so the
 * initial page ship doesn't pay for it.
 *
 * Usage (in a preview file):
 *   return <LottieCard src="/lottie/chat.json" label="dadbot.lottie" />;
 */
export function LottieCard({
  src,
  label = "animation.lottie",
  heightClass = "h-48",
  hoverOnly = false,
}: LottieCardProps) {
  const [data, setData] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((r) => r.json())
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <div
      aria-hidden="true"
      className={`relative ${heightClass} overflow-hidden border border-line-strong bg-[#0a0807]`}
    >
      <div className="absolute left-2 top-2 z-10 flex gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[#3a2f27]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#3a2f27]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--entry-accent)] opacity-60" />
      </div>
      <div className="absolute right-2 top-2 z-10 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
        {label}
      </div>

      <div className="flex h-full w-full items-center justify-center p-4 pt-6">
        {data ? (
          <Lottie
            animationData={data}
            loop={!hoverOnly}
            autoplay={!hoverOnly}
            className="h-full w-full"
          />
        ) : (
          <div className="font-mono text-[11px] text-muted">
            <span className="text-accent">$</span> loading…
            <span className="caret" />
          </div>
        )}
      </div>
    </div>
  );
}
