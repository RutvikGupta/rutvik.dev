"use client";

/**
 * SMARTS — multi-agent autonomous-driving simulator.
 *
 * Top-down intersection with correct right-hand-drive lanes:
 *   • East-bound on the south lane   (y = 108)
 *   • West-bound on the north lane   (y = 92)
 *   • North-bound on the east lane   (x = 168)
 *   • South-bound on the west lane   (x = 152)
 *
 * Delays are staggered so each agent crosses the intersection center at
 * ~1.3s apart — four clean through-passes, no overlap at the center.
 * Every rect is drawn centered on its motion origin and uses
 * `rotate="auto"` so north/south cars automatically render as vertical
 * and moving vehicles point the direction of travel.
 */

const agents = [
  {
    id: "east",
    path: "M -28 108 L 348 108",
    fill: "rgba(116,198,255,0.94)",
    dur: "5.4s",
    delay: "0s",
  },
  {
    id: "south",
    path: "M 152 -28 L 152 228",
    fill: "rgba(154,226,180,0.95)",
    dur: "5.2s",
    delay: "1.4s",
  },
  {
    id: "west",
    path: "M 348 92 L -28 92",
    fill: "rgba(239,242,255,0.82)",
    dur: "6s",
    delay: "2.8s",
  },
  {
    id: "north",
    path: "M 168 228 L 168 -28",
    fill: "rgba(124,140,255,0.92)",
    dur: "5.6s",
    delay: "4.2s",
  },
];

export function SmartsPreview() {
  return (
    <div className="preview-frame">
      <div className="preview-caption">
        <span>smarts · simulate</span>
        <span>scenario 042</span>
      </div>

      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {/* road plates */}
        <rect x="0" y="84" width="320" height="32" fill="rgba(116,198,255,0.06)" />
        <rect x="144" y="0" width="32" height="200" fill="rgba(116,198,255,0.06)" />

        {/* lane centrelines — these are the solid divider between the two
            directions of travel on each street. */}
        <line
          x1="0"
          y1="100"
          x2="320"
          y2="100"
          stroke="rgba(116,198,255,0.28)"
          strokeDasharray="6 6"
          strokeWidth="1"
        />
        <line
          x1="160"
          y1="0"
          x2="160"
          y2="200"
          stroke="rgba(116,198,255,0.28)"
          strokeDasharray="6 6"
          strokeWidth="1"
        />

        {/* thin directional indicators along each lane. Chevrons-as-dots so
            you can read the flow of traffic at rest. */}
        {[
          // east-bound arrows on y=108 pointing right
          { cx: 40, cy: 108 }, { cx: 90, cy: 108 }, { cx: 260, cy: 108 }, { cx: 290, cy: 108 },
          // west-bound arrows on y=92 pointing left (visual dot is symmetric)
          { cx: 40, cy: 92 }, { cx: 90, cy: 92 }, { cx: 260, cy: 92 }, { cx: 290, cy: 92 },
          // north/south arrows
          { cx: 152, cy: 36 }, { cx: 152, cy: 172 },
          { cx: 168, cy: 36 }, { cx: 168, cy: 172 },
        ].map((d, i) => (
          <circle
            key={i}
            cx={d.cx}
            cy={d.cy}
            r="0.8"
            fill="rgba(116,198,255,0.32)"
          />
        ))}

        {/* pulsing sensor ring at the intersection */}
        <circle
          cx="160"
          cy="100"
          r="34"
          fill="none"
          stroke="rgba(116,198,255,0.3)"
          strokeWidth="1"
          strokeDasharray="3 4"
          data-preview-anim
        >
          <animate attributeName="r" values="28;42;28" dur="3.6s" repeatCount="indefinite" />
          <animate
            attributeName="opacity"
            values="0.45;0.85;0.45"
            dur="3.6s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="160" cy="100" r="2.6" fill="rgba(116,198,255,0.94)" data-preview-anim>
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </circle>

        {/* agents — centered on motion origin; rotate="auto" re-orients
            the car along its path so vertical motion renders upright. */}
        {agents.map((a) => (
          <rect
            key={a.id}
            x="-12"
            y="-4"
            width="24"
            height="8"
            rx="2.5"
            fill={a.fill}
            data-preview-anim
          >
            <animateMotion
              path={a.path}
              dur={a.dur}
              begin={a.delay}
              repeatCount="indefinite"
              rotate="auto"
            />
          </rect>
        ))}
      </svg>

      <div className="preview-caption preview-caption-bottom">
        <span>agents · 4</span>
        <span>waymo · opendrive</span>
      </div>
    </div>
  );
}
