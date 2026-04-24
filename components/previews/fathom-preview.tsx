"use client";

import { useEffect, useState } from "react";

/**
 * Fathom — medical chart routing.
 *
 * Pulses travel source → router core → destination. Opacity keyTimes
 * hide each pulse while it is inside the core, so visually a packet enters
 * the router, gets "processed", and re-emerges on the output side.
 *
 * DIRECT BILL and REVIEW Q each run a live count-up that ticks when a
 * pulse reaches them, so the cards feel like real destinations receiving
 * charts rather than static labels.
 */

const CORE = { cx: 160, cy: 100, r: 24 };

function edgePoint(px: number, py: number) {
  const dx = CORE.cx - px;
  const dy = CORE.cy - py;
  const len = Math.hypot(dx, dy) || 1;
  return {
    x: CORE.cx - (dx / len) * CORE.r,
    y: CORE.cy - (dy / len) * CORE.r,
  };
}

const CHART_X = 10;
const CHART_W = 82;
const DEST_X = 228;
const DEST_W = 82;

const charts = [
  { id: "CHT-0831", y: 52 },
  { id: "CHT-1140", y: 100 },
  { id: "CHT-2044", y: 148 },
];

const destinations = [
  { label: "DIRECT BILL", y: 52,  tone: "teal"   as const },
  { label: "REVIEW Q",    y: 116, tone: "violet" as const },
];

const palette = {
  teal:   { fill: "rgba(73,230,210,0.1)",  stroke: "rgba(73,230,210,0.34)",  text: "rgba(200,248,238,0.95)", pulse: "rgba(73,230,210,0.55)" },
  violet: { fill: "rgba(124,140,255,0.1)", stroke: "rgba(124,140,255,0.34)", text: "rgba(208,214,255,0.95)", pulse: "rgba(124,140,255,0.55)" },
};

// Opacity timeline for each pulse: visible outbound to the core perimeter,
// hidden while it is inside the core, visible again outbound to destination.
// Enter-core t ≈ 0.37, exit-core t ≈ 0.68 (distance ratio on the 3-point path).
const PULSE_OPACITY_VALUES = "0;1;1;0;0;1;1;0";
const PULSE_OPACITY_KEYS   = "0;0.04;0.34;0.4;0.65;0.71;0.96;1";

const pulses = [
  { dest: "bill"   as const, d: `M${CHART_X + CHART_W},52  L${CORE.cx},${CORE.cy} L${DEST_X},68`,  delay: "0s"   },
  { dest: "review" as const, d: `M${CHART_X + CHART_W},100 L${CORE.cx},${CORE.cy} L${DEST_X},132`, delay: "1.2s" },
  { dest: "bill"   as const, d: `M${CHART_X + CHART_W},148 L${CORE.cx},${CORE.cy} L${DEST_X},68`,  delay: "2.4s" },
];

const PULSE_DUR_MS = 3600;
const CYCLE_MS = 3600;

export function FathomPreview() {
  const [billCount, setBillCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [billBump, setBillBump] = useState(0);
  const [reviewBump, setReviewBump] = useState(0);

  // Drive counters from real pulse-arrival times so the visuals and numbers
  // stay in lockstep. Pulse N arrives at dest at: pulse.delay + PULSE_DUR_MS.
  useEffect(() => {
    const pending: ReturnType<typeof setTimeout>[] = [];

    const bump = (dest: "bill" | "review") => {
      if (dest === "bill") {
        setBillCount((c) => (c + 1) % 4);
        setBillBump((b) => b + 1);
      } else {
        setReviewCount((c) => (c + 1) % 4);
        setReviewBump((b) => b + 1);
      }
    };

    const schedule = pulses.map((p, i) => ({
      dest: p.dest,
      firstArrivalMs: i * 1200 + PULSE_DUR_MS,
    }));

    schedule.forEach(({ dest, firstArrivalMs }) => {
      pending.push(
        setTimeout(() => {
          bump(dest);
          const id = setInterval(() => bump(dest), CYCLE_MS);
          pending.push(id as unknown as ReturnType<typeof setTimeout>);
        }, firstArrivalMs)
      );
    });

    return () => {
      pending.forEach((id) => {
        clearTimeout(id as unknown as number);
        clearInterval(id as unknown as number);
      });
    };
  }, []);

  return (
    <div className="preview-frame">
      <div className="preview-caption">
        <span>fathom · route</span>
        <span>chart → destination</span>
      </div>

      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <radialGradient id="fathom-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(73, 230, 210, 0.44)" />
            <stop offset="70%" stopColor="rgba(73, 230, 210, 0.06)" />
            <stop offset="100%" stopColor="rgba(73, 230, 210, 0)" />
          </radialGradient>
        </defs>

        {charts.map((c) => {
          const start = { x: CHART_X + CHART_W, y: c.y };
          const end = edgePoint(start.x, start.y);
          return (
            <line
              key={`in-${c.id}`}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="rgba(73,230,210,0.38)"
              strokeWidth="1"
            />
          );
        })}

        {destinations.map((d) => {
          const target = { x: DEST_X, y: d.y + 16 };
          const start = edgePoint(target.x, target.y);
          return (
            <line
              key={`out-${d.label}`}
              x1={start.x}
              y1={start.y}
              x2={target.x}
              y2={target.y}
              stroke="rgba(73,230,210,0.38)"
              strokeWidth="1"
            />
          );
        })}

        {charts.map((c) => (
          <g key={c.id}>
            <rect
              x={CHART_X}
              y={c.y - 14}
              width={CHART_W}
              height="28"
              rx="8"
              fill="rgba(255,255,255,0.035)"
              stroke="rgba(255,255,255,0.11)"
            />
            <text
              x={CHART_X + CHART_W / 2}
              y={c.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="ui-monospace, monospace"
              fontSize="9"
              fontWeight="600"
              letterSpacing="0.08em"
              fill="rgba(239,242,255,0.82)"
            >
              {c.id}
            </text>
          </g>
        ))}

        {/* router core */}
        <circle cx={CORE.cx} cy={CORE.cy} r={CORE.r + 16} fill="url(#fathom-core)" />
        <circle
          cx={CORE.cx}
          cy={CORE.cy}
          r={CORE.r}
          fill="rgba(8,10,16,0.96)"
          stroke="rgba(73,230,210,0.55)"
          strokeWidth="1.25"
          data-preview-anim
        >
          <animate
            attributeName="r"
            values={`${CORE.r - 1};${CORE.r + 1};${CORE.r - 1}`}
            dur="2.8s"
            repeatCount="indefinite"
          />
        </circle>
        <text
          x={CORE.cx}
          y={CORE.cy}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fontWeight="700"
          letterSpacing="0.18em"
          fill="rgba(130,248,224,0.95)"
        >
          ROUTE
        </text>

        {/* destinations */}
        {destinations.map((d) => {
          const p = palette[d.tone];
          const count = d.tone === "teal" ? billCount : reviewCount;
          const bumpKey = d.tone === "teal" ? billBump : reviewBump;
          return (
            <g key={d.label}>
              <rect
                x={DEST_X}
                y={d.y}
                width={DEST_W}
                height="32"
                rx="8"
                fill={p.fill}
                stroke={p.stroke}
              >
                {/* Flash the stroke briefly whenever this destination receives
                    a new chart. Tied to the React bump counter via key. */}
                <animate
                  key={`stroke-${bumpKey}`}
                  attributeName="stroke"
                  values={`${p.pulse};${p.stroke}`}
                  keyTimes="0;1"
                  dur="0.9s"
                  fill="freeze"
                />
              </rect>
              <text
                x={DEST_X + DEST_W / 2}
                y={d.y + 12}
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="ui-monospace, monospace"
                fontSize="8"
                fontWeight="700"
                letterSpacing="0.1em"
                fill={p.text}
              >
                {d.label}
              </text>
              <text
                x={DEST_X + DEST_W / 2}
                y={d.y + 23}
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="ui-monospace, monospace"
                fontSize="9"
                fontWeight="700"
                letterSpacing="0.14em"
                fill={p.text}
              >
                {count} / 3
              </text>
            </g>
          );
        })}

        {/* pulses */}
        {pulses.map((p, i) => (
          <circle key={i} r="3" fill="rgba(130,248,224,1)" data-preview-anim>
            <animateMotion
              path={p.d}
              dur="3.6s"
              begin={p.delay}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values={PULSE_OPACITY_VALUES}
              keyTimes={PULSE_OPACITY_KEYS}
              dur="3.6s"
              begin={p.delay}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
}
