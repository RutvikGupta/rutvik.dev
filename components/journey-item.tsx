"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { JourneyItem } from "@/lib/content";
import { Parallax } from "@/components/parallax";
import { FathomPreview } from "@/components/previews/fathom-preview";
import { WhatsAppPreview } from "@/components/previews/whatsapp-preview";
import { SmartsPreview } from "@/components/previews/smarts-preview";
import { DraftKingsPreview } from "@/components/previews/draftkings-preview";
import { TDPreview } from "@/components/previews/td-preview";
import { UTSCPreview } from "@/components/previews/utsc-preview";

function PreviewFor({ kind }: { kind?: JourneyItem["hasPreview"] }) {
  switch (kind) {
    case "fathom":
      return <FathomPreview />;
    case "whatsapp":
      return <WhatsAppPreview />;
    case "smarts":
      return <SmartsPreview />;
    case "draftkings":
      return <DraftKingsPreview />;
    case "td":
      return <TDPreview />;
    case "utsc":
      return <UTSCPreview />;
    default:
      return null;
  }
}

export function JourneyEntry({
  item,
  isCurrent,
}: {
  item: JourneyItem;
  isCurrent?: boolean;
}) {
  const accent = item.theme.accent;
  const kindLabel =
    item.kind === "project" ? "Project" : isCurrent ? "Current role" : "Experience";
  const ref = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting && entry.intersectionRatio > 0.14);
      },
      {
        threshold: [0.08, 0.14, 0.24, 0.38],
        rootMargin: "-12% 0px -12% 0px",
      }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // One-shot reveal — slide up + fade in the first time the card enters
  // the viewport. Triggers once and disconnects, so transform never updates
  // on subsequent scroll events (no collision with the Parallax transforms
  // inside the card).
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <article
      id={item.slug}
      ref={ref}
      data-active={isActive ? "true" : "false"}
      className="journey-card group relative overflow-hidden rounded-[36px] border border-white/10 p-6 md:p-8 lg:min-h-[82vh] lg:p-10"
      style={{
        opacity: hasRevealed ? (isActive ? 1 : 0.95) : 0,
        transform: hasRevealed ? "translateY(0)" : "translateY(48px)",
        transition:
          "opacity 760ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 760ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        willChange: hasRevealed ? "auto" : "opacity, transform",
        ["--entry-accent" as string]: accent,
        background: `radial-gradient(circle at 16% 14%, ${accent}18, transparent 26%), linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.022))`,
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,14,0.22),rgba(5,7,14,0.5))]" />
      <div
        className="absolute -right-20 top-14 h-72 w-72 rounded-full blur-[120px]"
        style={{ background: `${accent}18` }}
      />
      <div
        className="absolute -left-16 bottom-4 h-52 w-52 rounded-full blur-[120px]"
        style={{ background: `${accent}10` }}
      />

      <div className="relative grid gap-10 lg:grid-cols-[minmax(320px,0.92fr)_1fr] lg:gap-14">
        <div
          className={`transition-opacity duration-700 lg:sticky lg:top-28 lg:self-start ${
            isActive ? "opacity-100" : "opacity-85"
          }`}
        >
          <Parallax distance={14} tilt={4}>
            <div className="journey-preview-shell p-4 md:p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <div className="label" style={{ color: accent }}>
                    {item.theme.command}
                  </div>
                  <div className="mt-2 text-[14px] font-medium tracking-[-0.03em] text-white/58">
                    {item.org}
                  </div>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60">
                  {kindLabel}
                </span>
              </div>

              <PreviewFor kind={item.hasPreview} />

              <div className="mt-4 flex flex-wrap gap-2">
                <span
                  className="rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/72"
                  style={{
                    borderColor: `${accent}35`,
                    backgroundColor: `${accent}14`,
                  }}
                >
                  {item.dates}
                </span>
                {item.location ? (
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/48">
                    {item.location}
                  </span>
                ) : null}
              </div>
            </div>
          </Parallax>
        </div>

        <Parallax
          distance={10}
          className={`max-w-2xl lg:pt-5 transition-opacity duration-700 ${
            isActive ? "opacity-100" : "opacity-90"
          }`}
        >
          <div className="mb-6 flex items-center gap-4">
            <span className="label" style={{ color: accent }}>
              {item.kind === "project" ? "Weekend build" : "Experience"}
            </span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <h3 className="max-w-2xl text-[34px] font-semibold leading-[0.92] tracking-[-0.07em] text-fg md:text-[52px]">
            {item.title}
          </h3>

          <a
            href={item.orgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/org mt-4 inline-flex items-center gap-2 text-[18px] font-medium tracking-[-0.04em] text-white/78 transition-colors hover:text-white md:text-[22px]"
          >
            <span style={{ color: accent }}>{item.org}</span>
            <ArrowUpRight
              size={16}
              strokeWidth={1.4}
              className="transition-transform group-hover/org:translate-x-0.5 group-hover/org:-translate-y-0.5"
            />
          </a>

          <p className="mt-6 max-w-xl text-[15px] leading-8 text-fg-muted md:text-[16px]">
            {item.blurb}
          </p>

          {item.highlight ? (
            <div className="mt-8 rounded-[28px] border border-white/10 bg-black/20 p-5 shadow-[0_16px_70px_rgba(0,0,0,0.18)] backdrop-blur">
              <div className="label mb-3" style={{ color: accent }}>
                Featured work
              </div>
              <h4 className="text-[22px] font-semibold leading-none tracking-[-0.05em] text-fg md:text-[28px]">
                {item.highlight.title.replace(/_/g, " ")}
              </h4>
              <p className="mt-4 text-[14px] leading-7 text-fg-muted/95 md:text-[15px]">
                {item.highlight.description}
              </p>
            </div>
          ) : null}

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {item.stack.map((s) => (
              <li key={s} className="tag">
                {s}
              </li>
            ))}
          </ul>

          {item.featuredLink ? (
            <a
              href={item.featuredLink.href}
              target={item.featuredLink.href.startsWith("http") ? "_blank" : undefined}
              rel={item.featuredLink.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group/cta mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/78 transition-all hover:border-white/18 hover:bg-white/[0.06] hover:text-white"
            >
              {item.featuredLink.label}
              <ArrowUpRight
                size={14}
                strokeWidth={1.4}
                className="transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              />
            </a>
          ) : null}
        </Parallax>
      </div>
    </article>
  );
}
