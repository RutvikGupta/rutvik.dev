import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { Header } from "@/components/header";
import { HeroStage } from "@/components/hero-stage";
import { JourneyEntry } from "@/components/journey-item";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { journey } from "@/lib/content";

// Three short bio lines that sit under the hero. No counters — research
// on good personal sites shows counter grids ("5Y / 4 companies") read as
// portfolio/resume language, not personal voice.
const heroFacts = [
  {
    label: "Now",
    value: "Fathom Health",
    detail: "Backend + data, LLM-driven medical coding",
  },
  {
    label: "Shipping",
    value: "5 years",
    detail: "Since my first real codebase at Huawei in 2021",
  },
  {
    label: "Based",
    value: "Toronto",
    detail: "Mostly remote, sometimes downtown",
  },
  {
    label: "Offline",
    value: "Tennis · Reading · Biking · Building",
    detail: "A court, a book, a trail — or another weekend build",
  },
];

export default function Home() {
  return (
    <div className="relative z-10">
      <Header />

      <main className="relative">
        {/* HERO */}
        <section
          id="intro"
          className="relative mx-auto flex min-h-[92dvh] max-w-[1400px] flex-col justify-between px-6 pb-10 pt-8 md:px-10 md:pb-14 md:pt-4"
        >
          <HeroStage />

          <div className="relative z-10 flex flex-1 flex-col justify-end">
            <h1 className="hero-headline">
              <span className="block">Hi,</span>
              <span className="block">
                <span className="hero-italic">I&apos;m</span> Rutvik.
              </span>
              <span className="block">
                <span className="hero-italic">I build</span> systems.
              </span>
            </h1>

            <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,26rem)_1fr] md:items-end md:gap-10">
              <p className="max-w-md text-[14px] leading-[1.6] text-white/72 md:text-[15px]">
                I&apos;m a software engineer in Toronto. Right now I&apos;m at
                Fathom Health, building LLM-driven infrastructure that
                automates medical coding for US hospital networks — data
                pipelines, AI inference, and the operational tooling around
                both. Before that: payments at DraftKings, an internal status
                page at TD, self-driving simulation at Huawei Noah&apos;s Ark,
                and three years of cognitive-neuroscience research at UTSC.
              </p>

              <div className="flex flex-wrap items-center gap-3 md:justify-end">
                <a
                  href="#journey"
                  className="group/cta inline-flex items-center gap-2 rounded-full border border-white/28 bg-white/[0.04] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-all hover:border-white/48 hover:bg-white/[0.08]"
                >
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/44 text-[9px]">
                    ↓
                  </span>
                  Read on
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/64 transition-colors hover:text-white"
                >
                  Resume
                  <ArrowUpRight size={12} strokeWidth={1.6} />
                </a>
              </div>
            </div>
          </div>

          {/* Bio strip — not counters, just small facts. */}
          <div className="relative z-10 mt-10 border-t border-white/10 pt-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-8">
              {heroFacts.map((f) => (
                <div key={f.label} className="flex flex-col gap-2">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/44">
                    [ {f.label} ]
                  </div>
                  <div className="text-[17px] font-semibold leading-tight tracking-[-0.035em] text-white/92 md:text-[18px]">
                    {f.value}
                  </div>
                  <div className="text-[12px] leading-[1.5] text-white/52">
                    {f.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* JOURNEY — lightweight overview of the career arc. Hover a dot */}
        {/* to pull the job title + company. Sits before the detailed cards */}
        {/* so visitors can orient themselves before reading each chapter. */}
        <section
          id="timeline"
          className="mx-auto max-w-[1400px] px-6 pt-20 md:px-10 md:pt-28"
        >
          <Reveal>
            <SectionHeading
              number="01"
              label="Journey"
              title="Journey."
            />
            <p className="max-w-xl text-[14px] leading-[1.6] text-white/56 md:text-[15px]">
              Five roles, five years.
            </p>
          </Reveal>

          <ExperienceTimeline />
        </section>

        {/* WORK */}
        <section
          id="journey"
          className="mx-auto max-w-[1400px] px-6 pb-12 pt-10 md:px-10 md:pt-16"
        >
          <Reveal>
            <SectionHeading
              number="02"
              label="Work"
              title="What I’ve actually done."
            />
            <p className="mb-14 max-w-xl text-[14px] leading-[1.6] text-white/56 md:text-[15px]">
              The longer story behind each chapter.
            </p>
          </Reveal>

          <div className="space-y-6 lg:space-y-10">
            {journey.map((item, index) => (
              <JourneyEntry
                key={item.slug}
                item={item}
                isCurrent={index === 0}
              />
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <Reveal>
          <section
            id="contact"
            className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32"
          >
            <SectionHeading
              number="03"
              label="Contact"
              title="Say hi."
            />
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] p-8 md:p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(255,140,80,0.08),transparent_30%),radial-gradient(circle_at_88%_82%,rgba(89,239,255,0.06),transparent_34%)]" />
              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="max-w-xl text-[15px] leading-[1.7] text-white/68 md:text-[16px]">
                    Open to new opportunities, collaborations, and roles —
                    especially anything backend, data, or AI-adjacent.
                  </p>
                  <a
                    href="mailto:rutvikragupta@gmail.com"
                    className="group/mail mt-8 inline-flex items-center gap-4 text-[32px] font-semibold leading-none tracking-[-0.06em] text-white transition-colors hover:text-white/84 md:text-[56px]"
                  >
                    rutvikragupta@gmail.com
                    <ArrowRight
                      size={28}
                      strokeWidth={1.4}
                      className="transition-transform group-hover/mail:translate-x-1"
                    />
                  </a>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <a
                    href="https://github.com/rutvikgupta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/76 transition-all hover:border-white/28 hover:bg-white/[0.07] hover:text-white"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/rutvikrgupta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/76 transition-all hover:border-white/28 hover:bg-white/[0.07] hover:text-white"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/76 transition-all hover:border-white/28 hover:bg-white/[0.07] hover:text-white"
                  >
                    Resume
                  </a>
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      </main>

      <footer className="mx-auto flex max-w-[1400px] items-center justify-between px-6 pb-8 text-[10px] font-bold uppercase tracking-[0.18em] text-white/38 md:px-10">
        <span>Rutvik Gupta · {new Date().getFullYear()}</span>
        <span>Built in Toronto</span>
      </footer>
    </div>
  );
}
