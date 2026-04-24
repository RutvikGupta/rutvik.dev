"use client";

/**
 * TD Bank — internal status page with auto-logging incident automation.
 *
 * Four service tiles sized so mono-spaced state labels always fit without
 * clipping. One tile flips to DEGRADED with a pulsing red dot; the JIRA
 * ticket row below fades in when the incident auto-logs, with a separate
 * "NOTIFIED" pill so no single line ever runs off the edge.
 */

const TILE_W = 70;
const TILE_H = 66;
const TILE_Y = 36;
const TILE_GAP = 6;
const TILE_MARGIN = 10;

const services = [
  { name: "AUTH",   state: "HEALTHY",  alert: false },
  { name: "CORE",   state: "HEALTHY",  alert: false },
  { name: "LEDGER", state: "DEGRADED", alert: true  },
  { name: "NOTIFY", state: "HEALTHY",  alert: false },
];

export function TDPreview() {
  return (
    <div className="preview-frame">
      <div className="preview-caption">
        <span>status page · tail</span>
        <span>incident auto-log</span>
      </div>

      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {/* service tiles — fixed-geometry row */}
        {services.map((s, i) => {
          const x = TILE_MARGIN + i * (TILE_W + TILE_GAP);
          const cx = x + TILE_W / 2;
          const dotColor = s.alert
            ? "rgba(255,120,120,0.92)"
            : "rgba(115,199,170,0.92)";
          const stateColor = s.alert
            ? "rgba(255,170,150,0.95)"
            : "rgba(200,236,214,0.92)";
          return (
            <g key={s.name}>
              <rect
                x={x}
                y={TILE_Y}
                width={TILE_W}
                height={TILE_H}
                rx="10"
                fill="rgba(255,255,255,0.035)"
                stroke="rgba(255,255,255,0.09)"
              />
              {/* dot + name row */}
              <circle
                cx={x + 12}
                cy={TILE_Y + 16}
                r="3.6"
                fill={dotColor}
                data-preview-anim
              >
                {s.alert ? (
                  <animate
                    attributeName="opacity"
                    values="0.5;1;0.5"
                    dur="1.6s"
                    repeatCount="indefinite"
                  />
                ) : null}
              </circle>
              <text
                x={x + 22}
                y={TILE_Y + 17}
                dominantBaseline="central"
                fontFamily="ui-monospace, monospace"
                fontSize="8"
                fontWeight="700"
                letterSpacing="0.14em"
                fill="rgba(239,242,255,0.78)"
              >
                {s.name}
              </text>
              {/* state row — centered in the tile so nothing overflows */}
              <text
                x={cx}
                y={TILE_Y + 46}
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="ui-monospace, monospace"
                fontSize="10"
                fontWeight="700"
                letterSpacing="0.08em"
                fill={stateColor}
              >
                {s.state}
              </text>
            </g>
          );
        })}

        {/* JIRA incident row — split into a label row, a title row, and a
            separate NOTIFIED pill so no single text line overflows. */}
        <g data-preview-anim>
          <rect
            x="10"
            y="124"
            width="300"
            height="52"
            rx="12"
            fill="rgba(115,199,170,0.08)"
            stroke="rgba(115,199,170,0.28)"
          />
          <text
            x="24"
            y="144"
            dominantBaseline="central"
            fontFamily="ui-monospace, monospace"
            fontSize="8"
            fontWeight="700"
            letterSpacing="0.18em"
            fill="rgba(130,230,190,0.95)"
          >
            JIRA · AUTO-CREATED
          </text>
          <text
            x="24"
            y="162"
            dominantBaseline="central"
            fontFamily="ui-monospace, monospace"
            fontSize="9"
            letterSpacing="0.1em"
            fill="rgba(239,242,255,0.8)"
          >
            TD-4218 · LEDGER LATENCY SPIKE
          </text>

          {/* NOTIFIED pill, right-aligned */}
          <rect
            x="228"
            y="138"
            width="70"
            height="22"
            rx="11"
            fill="rgba(115,199,170,0.14)"
            stroke="rgba(115,199,170,0.38)"
          />
          <text
            x="263"
            y="149"
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="ui-monospace, monospace"
            fontSize="8"
            fontWeight="700"
            letterSpacing="0.16em"
            fill="rgba(130,230,190,0.95)"
          >
            NOTIFIED
          </text>

          <animate
            attributeName="opacity"
            values="0.24;0.24;1;1;0.24"
            keyTimes="0;0.35;0.5;0.9;1"
            dur="4s"
            repeatCount="indefinite"
          />
        </g>
      </svg>
    </div>
  );
}
