"use client";

import { useState } from "react";
import { journey } from "@/lib/content";

// The source journey array isn't sorted by date, so parse YYYY-MM off each
// dates string and sort ascending for the timeline.
function startTimestamp(dates: string): number {
  const m = dates.match(/(\d{4})(?:-(\d{2}))?/);
  if (!m) return 0;
  const year = parseInt(m[1], 10);
  const month = m[2] ? parseInt(m[2], 10) : 1;
  return year * 12 + month;
}

function yearLabel(dates: string): string {
  if (/present/i.test(dates)) {
    const m = dates.match(/(\d{4})/);
    return m ? `${m[1]} → Now` : "Now";
  }
  const m = dates.match(/(\d{4})/);
  return m ? m[1] : dates;
}

export function ExperienceTimeline() {
  const roles = journey
    .filter((j) => j.kind === "role")
    .slice()
    .sort((a, b) => startTimestamp(a.dates) - startTimestamp(b.dates));

  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const hoveredIndex = hoveredSlug
    ? roles.findIndex((r) => r.slug === hoveredSlug)
    : -1;
  const hovered = hoveredIndex >= 0 ? roles[hoveredIndex] : null;

  // Layout math: 5 equal grid columns, each 20% wide. Dots sit in the
  // horizontal center of each cell, so dot centers land at 10%, 30%, 50%,
  // 70%, 90%. The progress bar starts at the first dot (10%) and extends
  // exactly to the hovered dot's center — that's 20% per step.
  const fillWidthPct = hoveredIndex > 0 ? hoveredIndex * 20 : 0;

  return (
    <div className="select-none pb-6 pt-20 md:pb-10 md:pt-24">
      {/* Year row — lives above the dots. Colour flips to the role's accent */}
      {/* when the matching dot is hovered. */}
      <div className="grid grid-cols-5 gap-2">
        {roles.map((role) => {
          const isHovered = role.slug === hoveredSlug;
          return (
            <div key={role.slug + "-yr"} className="flex justify-center">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 md:text-[11px]"
                style={{
                  color: isHovered
                    ? role.theme.accent
                    : "rgba(255,255,255,0.42)",
                }}
              >
                {yearLabel(role.dates)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Dot row — the cell height is intentionally much larger than the */}
      {/* dot itself so hovering anywhere near a point reveals the tooltip. */}
      {/* Track and fill stay centred on the dot's Y axis via top-1/2. */}
      <div className="relative mt-2 h-14">
        <div
          aria-hidden
          className="pointer-events-none absolute left-[10%] right-[10%] top-1/2 h-px -translate-y-1/2 bg-white/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-[10%] top-1/2 h-px -translate-y-1/2 transition-all duration-500 ease-out"
          style={{
            width: `${fillWidthPct}%`,
            background: hovered
              ? `linear-gradient(90deg, ${hovered.theme.accent}33, ${hovered.theme.accent})`
              : "transparent",
            boxShadow: hovered
              ? `0 0 10px ${hovered.theme.accent}55`
              : "none",
          }}
        />

        <div className="relative grid h-full grid-cols-5 gap-2">
          {roles.map((role) => {
            const isHovered = role.slug === hoveredSlug;
            const accent = role.theme.accent;
            return (
              <div
                key={role.slug}
                className="relative flex cursor-pointer items-center justify-center"
                onMouseEnter={() => setHoveredSlug(role.slug)}
                onMouseLeave={() =>
                  setHoveredSlug((prev) => (prev === role.slug ? null : prev))
                }
                onFocus={() => setHoveredSlug(role.slug)}
                onBlur={() =>
                  setHoveredSlug((prev) => (prev === role.slug ? null : prev))
                }
              >
                {/* Nested wrapper: tooltip anchors to the dot, not the */}
                {/* full (now much taller) hover cell. */}
                <div className="relative">
                  <button
                    type="button"
                    aria-label={`${role.title} at ${role.org}`}
                    className="relative flex h-5 w-5 items-center justify-center focus:outline-none"
                  >
                    <span
                      className="block h-3 w-3 rounded-full border transition-all duration-300 ease-out"
                      style={{
                        borderColor: isHovered
                          ? "transparent"
                          : "rgba(255,255,255,0.28)",
                        background: isHovered ? accent : "rgba(10,12,20,0.9)",
                        boxShadow: isHovered
                          ? `0 0 22px ${accent}99, 0 0 0 6px ${accent}22`
                          : "none",
                        transform: isHovered ? "scale(1.5)" : "scale(1)",
                      }}
                    />
                  </button>

                  {isHovered ? (
                    <div
                      className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2 rounded-[14px] border border-white/15 bg-[rgba(10,12,20,0.95)] px-4 py-3 shadow-[0_18px_48px_rgba(0,0,0,0.55)] backdrop-blur"
                      style={{
                        animation:
                          "timeline-tooltip 160ms cubic-bezier(0.2, 0.8, 0.2, 1) both",
                      }}
                    >
                      <div className="whitespace-nowrap text-[12px] font-semibold tracking-[-0.01em] text-white md:text-[13px]">
                        {role.title}
                      </div>
                      <div
                        className="whitespace-nowrap text-[11px] font-medium tracking-[-0.005em] md:text-[12px]"
                        style={{ color: accent }}
                      >
                        {role.org}
                      </div>
                      <span
                        aria-hidden
                        className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-white/15"
                        style={{ background: "rgba(10,12,20,0.95)" }}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
