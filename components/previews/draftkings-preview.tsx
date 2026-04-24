"use client";

import { useEffect, useState } from "react";

/**
 * DraftKings — payments gateway.
 *
 * Live deposit counter on the left ticks up every ~550ms with a small
 * random amount as if real deposits were landing. Last-deposit flash on
 * the card shows the amount and the rail it came in on. Stream on the
 * right cycles AUTH → RETRY → SETTLED states on a 3.6s loop.
 */

type Rail = { label: string; color: string; baseWidth: number };

const RAILS: Rail[] = [
  { label: "VISA", color: "rgba(127,212,126,0.85)", baseWidth: 108 },
  { label: "MC",   color: "rgba(127,212,126,0.85)", baseWidth: 78  },
  { label: "ACH",  color: "rgba(127,212,126,0.85)", baseWidth: 124 },
];

const STREAM_EVENTS = ["AUTH OK", "RETRY", "SETTLED"];

const fmt = new Intl.NumberFormat("en-US");

export function DraftKingsPreview() {
  // Starts near the original $1.04M and climbs continuously.
  const [cents, setCents] = useState(1_040_126_44);
  const [lastDeposit, setLastDeposit] = useState<{ amount: number; rail: string } | null>(null);
  const [flashKey, setFlashKey] = useState(0);

  useEffect(() => {
    // Random deposit every 450-950ms. Amounts skew small with occasional
    // larger ones so the counter feels like real traffic.
    let alive = true;

    const tick = () => {
      if (!alive) return;
      const small = Math.random() < 0.82;
      const amountCents = small
        ? Math.floor(10_00 + Math.random() * 350_00)   // $10–$360
        : Math.floor(500_00 + Math.random() * 2500_00); // $500–$3000
      const rail = RAILS[Math.floor(Math.random() * RAILS.length)].label;

      setCents((c) => c + amountCents);
      setLastDeposit({ amount: amountCents, rail });
      setFlashKey((k) => k + 1);

      const nextDelay = 450 + Math.random() * 500;
      window.setTimeout(tick, nextDelay);
    };

    const initial = window.setTimeout(tick, 600);
    return () => {
      alive = false;
      window.clearTimeout(initial);
    };
  }, []);

  const dollars = Math.floor(cents / 100);
  const cpart = String(cents % 100).padStart(2, "0");
  const displayAmount = `$${fmt.format(dollars)}.${cpart}`;

  return (
    <div className="preview-frame">
      <div className="preview-caption">
        <span>payments · gateway</span>
        <span>24h volume</span>
      </div>

      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {/* volume card */}
        <rect
          x="16"
          y="34"
          width="176"
          height="134"
          rx="16"
          fill="rgba(255,255,255,0.03)"
          stroke="rgba(255,255,255,0.08)"
        />
        <text
          x="28"
          y="58"
          dominantBaseline="central"
          fontFamily="ui-monospace, monospace"
          fontSize="8"
          fontWeight="700"
          letterSpacing="0.18em"
          fill="rgba(239,242,255,0.52)"
        >
          DEPOSITS · LIVE
        </text>

        {/* live counter */}
        <text
          x="28"
          y="92"
          dominantBaseline="central"
          fontFamily="var(--font-sans)"
          fontSize="24"
          fontWeight="700"
          letterSpacing="-0.05em"
          fill="rgba(255,255,255,0.96)"
        >
          {displayAmount}
        </text>

        {/* last-deposit flash row */}
        {lastDeposit ? (
          <g key={flashKey}>
            <text
              x="28"
              y="110"
              dominantBaseline="central"
              fontFamily="ui-monospace, monospace"
              fontSize="8"
              fontWeight="700"
              letterSpacing="0.14em"
              fill="rgba(144,226,180,0.94)"
            >
              {`+$${fmt.format(Math.floor(lastDeposit.amount / 100))}.${String(lastDeposit.amount % 100).padStart(2, "0")} · ${lastDeposit.rail}`}
              <animate
                attributeName="opacity"
                values="1;1;0"
                keyTimes="0;0.6;1"
                dur="1s"
                fill="freeze"
              />
            </text>
          </g>
        ) : null}

        {/* rails — static geometry, pulsing fill */}
        {RAILS.map((rail, i) => (
          <g key={rail.label}>
            <text
              x="28"
              y={128 + i * 12}
              dominantBaseline="central"
              fontFamily="ui-monospace, monospace"
              fontSize="7"
              letterSpacing="0.18em"
              fill="rgba(239,242,255,0.5)"
            >
              {rail.label}
            </text>
            <rect
              x="58"
              y={125 + i * 12}
              width="120"
              height="4"
              rx="2"
              fill="rgba(255,255,255,0.06)"
            />
            <rect
              x="58"
              y={125 + i * 12}
              width={rail.baseWidth * 0.7}
              height="4"
              rx="2"
              fill={rail.color}
              data-preview-anim
            >
              <animate
                attributeName="width"
                values={`${rail.baseWidth * 0.62};${rail.baseWidth};${rail.baseWidth * 0.72}`}
                dur="3.6s"
                begin={`${i * 0.25}s`}
                repeatCount="indefinite"
              />
            </rect>
          </g>
        ))}

        {/* gateway stream */}
        <rect
          x="204"
          y="34"
          width="100"
          height="134"
          rx="16"
          fill="rgba(255,255,255,0.035)"
          stroke="rgba(255,255,255,0.08)"
        />
        <text
          x="216"
          y="58"
          dominantBaseline="central"
          fontFamily="ui-monospace, monospace"
          fontSize="8"
          fontWeight="700"
          letterSpacing="0.18em"
          fill="rgba(239,242,255,0.52)"
        >
          STREAM
        </text>

        {STREAM_EVENTS.map((event, i) => (
          <g key={event}>
            <rect
              x="216"
              y={78 + i * 28}
              width="76"
              height="22"
              rx="8"
              fill="rgba(0,0,0,0.22)"
              stroke="rgba(255,255,255,0.08)"
              data-preview-anim
            >
              <animate
                attributeName="stroke"
                values="rgba(255,255,255,0.08);rgba(127,212,126,0.44);rgba(255,255,255,0.08)"
                dur="3.6s"
                begin={`${i * 0.35}s`}
                repeatCount="indefinite"
              />
            </rect>
            <text
              x="226"
              y={89 + i * 28}
              dominantBaseline="central"
              fontFamily="ui-monospace, monospace"
              fontSize="8"
              letterSpacing="0.14em"
              fill="rgba(239,242,255,0.75)"
            >
              {event}
            </text>
            <circle
              cx="284"
              cy={89 + i * 28}
              r="2.6"
              fill="rgba(127,212,126,0.9)"
              data-preview-anim
            >
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="3.6s"
                begin={`${i * 0.35}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}
