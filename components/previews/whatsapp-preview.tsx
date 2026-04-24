"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Dad Bot — WhatsApp good-morning auto-reply.
 *
 * Pure SVG. Every bubble (incoming, classifier chip, reply) measures its
 * actual rendered text via `getBBox()` after `document.fonts.ready` and
 * sizes its background rect to hug the content tightly. Each chip has
 * its own rect too — earlier iterations shared a single chip rect sized
 * for the widest label, which made shorter labels like EMOJI sit in a
 * disproportionately wide container.
 *
 * Whole-chat 6s CSS keyframe cycle: incoming in → chip in → reply in →
 * all fade out together at t=5.1s. React swaps the greeting index at
 * cycle boundary (t=6s); because everything is at opacity 0 at that
 * moment, the swap is visually silent.
 */

type Greeting = {
  text: string;
  fontSize: number;
  lang: string;
};

const GREETINGS: Greeting[] = [
  { text: "☀️",                fontSize: 20, lang: "EMOJI" },
  { text: "good morning beta",  fontSize: 13, lang: "ENGLISH" },
  { text: "shubh prabhat",      fontSize: 13, lang: "HINDI · ROMAN" },
  { text: "सुप्रभात",            fontSize: 14, lang: "DEVANAGARI" },
];

// Incoming bubble geometry
const IN_X = 26;
const IN_Y = 44;
const IN_H = 34;
const IN_CY = IN_Y + IN_H / 2;
const IN_PAD_X = 12;

// Classifier chip
const CHIP_X = 26;
const CHIP_Y = 86;
const CHIP_H = 22;
const CHIP_CY = CHIP_Y + CHIP_H / 2;
const CHIP_LABEL_X = CHIP_X + 26; // after dot (cx=CHIP_X+14, r=3) + gap
const CHIP_PAD_R = 14;

// Reply bubble
const REPLY_Y = 118;
const REPLY_H = 44;
const REPLY_RIGHT = 304 - 14; // right edge of reply bubble in viewBox units
const REPLY_PAD_X = 14;

// Once/day anchor
const ANCHOR_W = 120;

// Conservative fallbacks used for the very first paint.
const FB_IN = [40, 140, 112, 82];
const FB_CHIP = [80, 104, 156, 130];
const FB_REPLY = 152;

export function WhatsAppPreview() {
  const [idx, setIdx] = useState(0);
  const [inWidths, setInWidths] = useState<number[]>(FB_IN);
  const [chipWidths, setChipWidths] = useState<number[]>(FB_CHIP);
  const [replyW, setReplyW] = useState<number>(FB_REPLY);

  const inTextRefs = useRef<Array<SVGTextElement | null>>([]);
  const chipTextRefs = useRef<Array<SVGTextElement | null>>([]);
  const replyTitleRef = useRef<SVGTextElement | null>(null);
  const replyStampRef = useRef<SVGTextElement | null>(null);
  const cycleSourceRef = useRef<SVGGElement | null>(null);

  // Measure after fonts load so getBBox reports final-render widths.
  useEffect(() => {
    const run = () => {
      const inMeasured = inTextRefs.current.map((el) =>
        el ? Math.ceil(el.getBBox().width + IN_PAD_X * 2) : 100
      );
      setInWidths(inMeasured);

      const chipMeasured = chipTextRefs.current.map((el) =>
        el ? Math.ceil(CHIP_LABEL_X - CHIP_X + el.getBBox().width + CHIP_PAD_R) : 140
      );
      setChipWidths(chipMeasured);

      const titleW = replyTitleRef.current?.getBBox().width ?? 0;
      const stampW = replyStampRef.current?.getBBox().width ?? 0;
      setReplyW(Math.ceil(Math.max(titleW, stampW) + REPLY_PAD_X * 2));
    };

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(run);
    } else {
      run();
    }
  }, []);

  // Advance the greeting exactly at each CSS animation loop boundary.
  // setInterval would drift from the keyframe cycle over time, producing
  // either a skipped swap (same greeting appears twice) or a mid-cycle
  // snap. Listening to `animationiteration` binds the React update to
  // the browser's compositor-driven iteration event, so the swap lands
  // at t=0 of every loop when opacity is 0 — visually silent.
  useEffect(() => {
    const el = cycleSourceRef.current;
    if (!el) return;
    const handle = (e: AnimationEvent) => {
      if (e.animationName !== "dadbot-incoming") return;
      setIdx((i) => (i + 1) % GREETINGS.length);
    };
    el.addEventListener("animationiteration", handle);
    return () => el.removeEventListener("animationiteration", handle);
  }, []);

  const replyX = REPLY_RIGHT - replyW;

  return (
    <div className="preview-frame">
      <div className="preview-caption">
        <span>dad bot · watch</span>
        <span>once / day</span>
      </div>

      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {/* chat frame */}
        <rect
          x="16"
          y="28"
          width="288"
          height="158"
          rx="18"
          fill="rgba(12,16,14,0.72)"
          stroke="rgba(255,255,255,0.08)"
        />

        {/* ---------- incoming bubbles (dad, left) ---------- */}
        <g
          ref={cycleSourceRef}
          data-preview-anim
          style={{ animation: "dadbot-incoming 6s ease-in-out infinite" }}
        >
          {GREETINGS.map((g, i) => (
            <g
              key={i}
              style={{
                opacity: i === idx ? 1 : 0,
                transition: "opacity 0.4s ease",
              }}
            >
              <rect
                x={IN_X}
                y={IN_Y}
                width={inWidths[i]}
                height={IN_H}
                rx="14"
                fill="rgba(255,255,255,0.07)"
                stroke="rgba(255,255,255,0.12)"
              />
              <text
                ref={(el) => {
                  inTextRefs.current[i] = el;
                }}
                x={IN_X + IN_PAD_X}
                y={IN_CY}
                textAnchor="start"
                dominantBaseline="central"
                fontFamily="var(--font-sans)"
                fontSize={g.fontSize}
                fill="rgba(239,242,255,0.94)"
                letterSpacing="-0.01em"
              >
                {g.text}
              </text>
            </g>
          ))}
        </g>

        {/* ---------- classifier chips — per-greeting rect hugs label ---------- */}
        <g
          data-preview-anim
          style={{ animation: "dadbot-chip 6s ease-in-out infinite" }}
        >
          {GREETINGS.map((g, i) => (
            <g
              key={i}
              style={{
                opacity: i === idx ? 1 : 0,
                transition: "opacity 0.4s ease",
              }}
            >
              <rect
                x={CHIP_X}
                y={CHIP_Y}
                width={chipWidths[i]}
                height={CHIP_H}
                rx="11"
                fill="rgba(156,195,107,0.12)"
                stroke="rgba(156,195,107,0.3)"
              />
              <circle
                cx={CHIP_X + 14}
                cy={CHIP_CY}
                r="3"
                fill="rgba(156,195,107,0.95)"
                data-preview-anim
              >
                {/* Only the active chip's dot animates (it's the only one
                    visible); others run too but contribute nothing. */}
                <animate
                  attributeName="opacity"
                  values="0.4;1;0.4"
                  dur="1.4s"
                  repeatCount="indefinite"
                />
              </circle>
              <text
                ref={(el) => {
                  chipTextRefs.current[i] = el;
                }}
                x={CHIP_LABEL_X}
                y={CHIP_CY}
                textAnchor="start"
                dominantBaseline="central"
                fontFamily="ui-monospace, monospace"
                fontSize="9.5"
                letterSpacing="0.08em"
              >
                <tspan fill="rgba(156,195,107,0.74)" fontWeight="700">
                  GEMINI 2.5
                </tspan>
                <tspan dx="6" fill="rgba(156,195,107,0.44)">
                  →
                </tspan>
                <tspan dx="6" fill="rgba(239,242,255,0.92)" fontWeight="600">
                  {g.lang}
                </tspan>
              </text>
            </g>
          ))}
        </g>

        {/* ---------- reply bubble (me, right) — hugs its text ---------- */}
        <g
          data-preview-anim
          style={{ animation: "dadbot-reply 6s ease-in-out infinite" }}
        >
          <rect
            x={replyX}
            y={REPLY_Y}
            width={replyW}
            height={REPLY_H}
            rx="14"
            fill="rgba(156,195,107,0.16)"
            stroke="rgba(156,195,107,0.38)"
          />
          <text
            ref={replyTitleRef}
            x={REPLY_RIGHT - REPLY_PAD_X}
            y={REPLY_Y + 17}
            textAnchor="end"
            dominantBaseline="central"
            fontFamily="var(--font-sans)"
            fontSize="13"
            fontWeight="600"
            fill="rgba(239,242,255,0.96)"
            letterSpacing="-0.02em"
          >
            Good Morning Papa
          </text>
          <text
            ref={replyStampRef}
            x={REPLY_RIGHT - REPLY_PAD_X}
            y={REPLY_Y + 34}
            textAnchor="end"
            dominantBaseline="central"
            fontFamily="ui-monospace, monospace"
            fontSize="7.5"
            letterSpacing="0.16em"
            fill="rgba(156,195,107,0.88)"
          >
            TODAY · 6:42 AM ✓
          </text>
        </g>

        {/* once/day anchor */}
        <rect
          x="26"
          y="168"
          width={ANCHOR_W}
          height="14"
          rx="7"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.1)"
        />
        <text
          x={26 + ANCHOR_W / 2}
          y="175"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="ui-monospace, monospace"
          fontSize="7.5"
          letterSpacing="0.16em"
          fill="rgba(239,242,255,0.62)"
        >
          ONCE / DAY · LOCKED
        </text>
      </svg>
    </div>
  );
}
