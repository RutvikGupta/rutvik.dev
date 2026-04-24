import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

const aspekta = localFont({
  src: [
    {
      path: "../../public/fonts/aspekta/Aspekta-300.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/aspekta/Aspekta-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/aspekta/Aspekta-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/aspekta/Aspekta-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

const corePalette = [
  {
    name: "Void",
    hex: "#080812",
    note: "Primary canvas for the site shell and fullscreen scenes.",
  },
  {
    name: "Deep Ink",
    hex: "#101225",
    note: "Default panel surface for cards, sticky scenes, and nav chrome.",
  },
  {
    name: "Glass Panel",
    hex: "#181b35",
    note: "Raised 3D planes and scene backplates.",
  },
  {
    name: "Cloud",
    hex: "#eff2ff",
    note: "Primary text and high-contrast highlights.",
  },
  {
    name: "Mist",
    hex: "#a8b0ca",
    note: "Secondary labels, metadata, and rules.",
  },
  {
    name: "Electric Violet",
    hex: "#8e6cff",
    note: "Animated cursor gradient seed and shared motion accent.",
  },
  {
    name: "Neon Cyan",
    hex: "#59efff",
    note: "Infrastructure state, routing, and healthy system feedback.",
  },
  {
    name: "Rose Pulse",
    hex: "#ff78c7",
    note: "Grainy gradient depth, glossy glow, and hero contrast.",
  },
];

const chapters = [
  {
    title: "Fathom Health",
    period: "Current role",
    accent: "#49e6d2",
    accentSoft: "#7aa7ff",
    surface: "#121c27",
    copy:
      "Medical charts flow through a routing and capacity-allocation engine, with configurable destination caps and ICD-coded outcomes visible in the scene.",
    scene:
      "Sticky 3D chart trays. Incoming chart packets pick up client and review metadata, fill destination lanes, and reroute when a lane hits its cap.",
    typography: "Sharp grotesk + mono metadata. Clinical, precise, audit-friendly.",
    palette: ["#121c27", "#49e6d2", "#dce8ff", "#49a6ff"],
  },
  {
    title: "Dad Bot",
    period: "Personal project",
    accent: "#9cc36b",
    accentSoft: "#f0b36b",
    surface: "#1a1716",
    copy:
      "A warm, human interlude in the journey: incoming WhatsApp messages, Gemini classification, once-per-day reply gating, and a tiny production system running for one person who matters.",
    scene:
      "Floating chat panes in shallow 3D. Messages land, classifier traces pulse beside them, and one reply bubble locks into place while infra layers slide behind.",
    typography: "Humanist sans for chat, mono for traces. Softer, but still technical.",
    palette: ["#15171f", "#9cc36b", "#49a6ff", "#7c8cff"],
  },
  {
    title: "DraftKings",
    period: "2023 to 2024",
    accent: "#7fd47e",
    accentSoft: "#d5a85c",
    surface: "#151716",
    copy:
      "High-throughput transaction lanes, gateway migrations, load spikes, and operational safeguards for money moving at production scale.",
    scene:
      "A 3D payments board with deposit and withdrawal lanes, volume counters, gateway switches, and validation checks flaring during peak traffic.",
    typography: "Condensed display numerics + clean sans. Fast, dense, high-pressure.",
    palette: ["#141821", "#7fd47e", "#49a6ff", "#7c8cff"],
  },
  {
    title: "TD Bank",
    period: "2022",
    accent: "#73c7aa",
    accentSoft: "#d46d61",
    surface: "#131923",
    copy:
      "Service health, incident automation, and internal platform tooling represented as a live observability wall rather than a static dashboard screenshot.",
    scene:
      "Layered service tiles rise off the page. Healthy, degraded, and incident states cycle while a JIRA ticket materializes out of an outage event.",
    typography: "Enterprise grotesk with dashboard labels. Reliable, structured, operational.",
    palette: ["#131923", "#73c7aa", "#49a6ff", "#d46d61"],
  },
  {
    title: "Huawei / SMARTS",
    period: "2021 to 2022",
    accent: "#74c6ff",
    accentSoft: "#7c8cff",
    surface: "#111722",
    copy:
      "Autonomous-driving simulation rendered as an explorable top-down road network, with agents, scenario layers, and research tooling cues.",
    scene:
      "A floating simulation grid with intersections, moving agents, and scenario overlays that peel upward as the reader scrolls deeper into the chapter.",
    typography: "Technical sans + lab-grade mono. Research, tooling, and simulation.",
    palette: ["#111722", "#74c6ff", "#7c8cff", "#49e6d2"],
  },
];

const motionSystem = [
  {
    title: "Animated Gradient Cursor",
    detail:
      "Replace the current soft spotlight with a sharper aurora cursor that mixes cyan, violet, and rose in motion. It should leave a subtle refracted glow on nearby surfaces rather than just brightening the background.",
  },
  {
    title: "Scroll Parallax",
    detail:
      "Each chapter gets a pinned 3D scene. Background haze, midground geometry, and foreground labels move at different speeds so the page feels spatial instead of flat.",
  },
  {
    title: "3D Scene Language",
    detail:
      "Use beveled cards, shadowed trays, tilted rails, and layered glass planes. Keep it code-native in CSS and SVG first; use heavier 3D only when a scene needs it.",
  },
  {
    title: "Vercel Delivery",
    detail:
      "Design within a Next.js + Vercel budget: responsive, performant, no unnecessary heavy runtimes, and graceful degradation on mobile and reduced-motion systems.",
  },
];

function Swatch({
  name,
  hex,
  note,
}: {
  name: string;
  hex: string;
  note: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur">
      <div
        className="mb-4 h-24 rounded-[18px] border border-white/10"
        style={{
          background: `linear-gradient(135deg, ${hex}, ${hex}dd 55%, #ffffff10)`,
        }}
      />
      <div
        className={`${aspekta.className} mb-1 text-[11px] font-bold uppercase tracking-[0.04em] text-fg-muted`}
      >
        {name}
      </div>
      <div
        className={`${aspekta.className} mb-2 text-[26px] font-semibold leading-none tracking-[-0.03em] text-fg`}
      >
        {hex}
      </div>
      <p className="text-sm leading-6 text-fg-muted">{note}</p>
    </div>
  );
}

export default function DesignSpecPage() {
  return (
    <main
      className={`${aspekta.className} relative z-10 min-h-screen overflow-hidden tracking-[-0.02em]`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="spec-mesh absolute inset-0" />
        <div className="spec-gradient-stage absolute inset-0 overflow-hidden">
          <div className="spec-gradient-layer spec-gradient-layer-a absolute left-[-12%] top-[-8%] h-[36rem] w-[42rem] opacity-80 md:h-[42rem] md:w-[52rem]">
            <Image
              src="/figma-reference/gradient-a.png"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="spec-gradient-layer spec-gradient-layer-b absolute right-[-18%] top-[10%] h-[34rem] w-[44rem] opacity-75 md:h-[40rem] md:w-[56rem]">
            <Image
              src="/figma-reference/gradient-b.png"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="spec-gradient-layer spec-gradient-layer-c absolute left-[12%] top-[38%] h-[30rem] w-[40rem] opacity-65 md:h-[36rem] md:w-[54rem]">
            <Image
              src="/figma-reference/gradient-c.png"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
        <div className="spec-noise absolute inset-0 opacity-60" />
        <div className="spec-grid absolute inset-0 opacity-20" />
        <div className="spec-glow spec-glow-a absolute left-[-10%] top-[-12%] h-[40rem] w-[40rem] rounded-full bg-[#8e6cff]/24 blur-[120px]" />
        <div className="spec-glow spec-glow-b absolute right-[-10%] top-[8%] h-[36rem] w-[36rem] rounded-full bg-[#59efff]/18 blur-[120px]" />
        <div className="spec-glow spec-glow-c absolute bottom-[-16%] left-[18%] h-[32rem] w-[32rem] rounded-full bg-[#ff78c7]/16 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-8 md:px-12 lg:px-20">
        <div className="mb-12 flex items-center justify-between">
          <Link
            href="/"
            className={`${aspekta.className} text-[12px] font-bold uppercase tracking-[0.04em] text-fg-muted transition-colors hover:text-fg`}
          >
            Back to site
          </Link>
          <div
            className={`${aspekta.className} text-[12px] font-bold uppercase tracking-[0.04em] text-fg-muted`}
          >
            Design Spec v1
          </div>
        </div>

        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#59efff]" />
              <span
                className={`${aspekta.className} text-[12px] font-bold uppercase tracking-[0.04em] text-fg-muted`}
              >
                Grainy gradient dark shell + 3D + animated cursor
              </span>
            </div>

            <div>
              <p
                className={`${aspekta.className} mb-4 text-[12px] font-bold uppercase tracking-[0.04em] text-fg-muted`}
              >
                Direction
              </p>
              <h1
                className={`${aspekta.className} max-w-4xl text-[48px] leading-[0.9] tracking-[-0.06em] text-fg md:text-[72px] lg:text-[92px]`}
              >
                <span className="block font-light">Grainy gradient energy,</span>
                <span className="block font-semibold">adapted to a technical resume.</span>
              </h1>
            </div>

            <p className="max-w-3xl text-[17px] font-medium leading-8 text-fg-muted md:text-[18px]">
              The shell should borrow the dark grainy-gradient, glossy 3D, and
              animated-atmosphere feel of the Figma reference, then anchor it
              in your actual work: scroll-driven chapter scenes, modern sans
              typography, and motion that makes each role feel spatial without
              turning the site into a generic agency clone.
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                "Dark interface shell",
                "Grainy gradient background",
                "Pinned 3D chapter scenes",
                "Animated gradient cursor",
                "Glossy glass panels",
                "Parallax depth on scroll",
                "Next.js on Vercel",
              ].map((item) => (
                <span
                  key={item}
                  className={`${aspekta.className} rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.04em] text-fg-muted`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-h-[40rem] overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01))] shadow-[0_36px_120px_rgba(0,0,0,0.5)] backdrop-blur-[3px]">
            <div className="absolute inset-[1px] rounded-[33px] bg-[linear-gradient(180deg,rgba(8,8,18,0.42),rgba(8,8,18,0.18))]" />
            <div className="absolute left-6 top-6 right-6 flex items-start justify-between">
              <div>
                <div
                  className={`${aspekta.className} text-[12px] font-bold uppercase tracking-[0.04em] text-white/72`}
                >
                  Hero composition
                </div>
                <div className="mt-2 max-w-[16rem] text-[14px] font-medium leading-6 text-white/62">
                  Grainy gradient motion lives in the background, while the
                  objects float above it in shallow 3D.
                </div>
              </div>
              <div
                className={`${aspekta.className} rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.04em] text-white/72`}
              >
                Template shell
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_22%,rgba(255,255,255,0.05),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.04),transparent_22%)]" />

              <div className="absolute left-[4%] top-[18%] w-[22%] min-w-[110px] rotate-[-12deg]">
                <Image
                  src="/figma-reference/phone.png"
                  alt="Reference phone mockup"
                  width={375}
                  height={282}
                  className="h-auto w-full drop-shadow-[0_28px_48px_rgba(0,0,0,0.6)]"
                />
              </div>

              <div className="absolute left-[34%] top-[28%] w-[34%] min-w-[170px] rotate-[-9deg]">
                <Image
                  src="/figma-reference/card-stack.png"
                  alt="Reference stacked panel mockup"
                  width={3000}
                  height={2250}
                  className="h-auto w-full drop-shadow-[0_28px_48px_rgba(0,0,0,0.6)]"
                />
              </div>

              <div className="absolute left-[12%] top-[60%] w-[16%] min-w-[82px] rotate-[-10deg]">
                <Image
                  src="/figma-reference/display.png"
                  alt="Reference display mockup"
                  width={375}
                  height={282}
                  className="h-auto w-full drop-shadow-[0_24px_42px_rgba(0,0,0,0.6)]"
                />
              </div>

              <div className="absolute right-[4%] bottom-[2%] w-[34%] min-w-[170px] rotate-[4deg]">
                <Image
                  src="/figma-reference/laptop.png"
                  alt="Reference laptop mockup"
                  width={375}
                  height={282}
                  className="h-auto w-full drop-shadow-[0_32px_56px_rgba(0,0,0,0.62)]"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <div className="mx-auto max-w-3xl text-center">
            <p
              className={`${aspekta.className} mb-4 text-[12px] font-bold uppercase tracking-[0.04em] text-fg-muted`}
            >
              Template cues locked in
            </p>
            <p className="text-sm font-medium leading-8 text-fg-muted md:text-[15px]">
              The background treatment is now doing the main aesthetic work:
              animated grain, drifting gradient fields, and floating glossy
              objects. The next step is to rebuild the foreground layout so it
              follows the template composition more literally, but with your own
              content and chapters.
            </p>
          </div>
        </section>

        <section className="mt-24">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p
                className={`${aspekta.className} mb-3 text-[12px] font-bold uppercase tracking-[0.04em] text-fg-muted`}
              >
                Core palette
              </p>
              <h2
                className={`${aspekta.className} text-[36px] font-semibold leading-[0.98] tracking-[-0.04em] text-fg md:text-[52px]`}
              >
                Dark, grainy, luminous, and still usable for real content.
              </h2>
            </div>
            <p className="max-w-xl text-sm font-medium leading-7 text-fg-muted">
              The shell stays consistent across the site. Experience chapters
              then tint the same system with their own domain-specific accents
              rather than becoming separate micro-sites.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {corePalette.map((swatch) => (
              <Swatch key={swatch.hex} {...swatch} />
            ))}
          </div>
        </section>

        <section className="mt-24">
          <div className="mb-10">
            <p
              className={`${aspekta.className} mb-3 text-[12px] font-bold uppercase tracking-[0.04em] text-fg-muted`}
            >
              Chapter system
            </p>
            <h2
                className={`${aspekta.className} text-[36px] font-semibold leading-[0.98] tracking-[-0.04em] text-fg md:text-[52px]`}
              >
                Each experience gets its own scene, motion vocabulary, and
                accent palette.
            </h2>
          </div>

          <div className="space-y-8">
            {chapters.map((chapter) => (
              <article
                key={chapter.title}
                className="grid gap-6 rounded-[30px] border border-white/10 bg-white/[0.035] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur md:p-8 lg:grid-cols-[1.1fr_0.9fr]"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <p
                        className={`${aspekta.className} text-[12px] font-bold uppercase tracking-[0.04em] text-fg-muted`}
                      >
                        {chapter.period}
                      </p>
                      <h3
                        className={`${aspekta.className} mt-2 text-[34px] font-semibold leading-none tracking-[-0.04em] text-fg md:text-[42px]`}
                      >
                        {chapter.title}
                      </h3>
                    </div>
                    <div className="flex gap-2">
                      {chapter.palette.map((hex) => (
                        <span
                          key={hex}
                          className="h-10 w-10 rounded-full border border-white/10"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="mb-5 max-w-2xl text-[15px] font-medium leading-7 text-fg-muted">
                    {chapter.copy}
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                      <div
                        className={`${aspekta.className} mb-2 text-[12px] font-bold uppercase tracking-[0.04em] text-fg-muted`}
                      >
                        Scene concept
                      </div>
                      <p className="text-sm font-medium leading-7 text-fg-muted">
                        {chapter.scene}
                      </p>
                    </div>
                    <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                      <div
                        className={`${aspekta.className} mb-2 text-[12px] font-bold uppercase tracking-[0.04em] text-fg-muted`}
                      >
                        Typography direction
                      </div>
                      <p className="text-sm font-medium leading-7 text-fg-muted">
                        {chapter.typography}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative min-h-[18rem] [perspective:1400px]">
                  <div
                    className="absolute inset-3 rounded-[28px] border border-white/10"
                    style={{
                      background: `radial-gradient(circle at 22% 18%, ${chapter.accentSoft}22, transparent 30%), radial-gradient(circle at 78% 16%, ${chapter.accent}16, transparent 28%), linear-gradient(180deg, ${chapter.surface}, #0b0f15)`,
                    }}
                  />
                  <div
                    className="absolute left-[8%] top-[14%] h-[58%] w-[70%] rounded-[24px] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
                    style={{
                      background: `linear-gradient(180deg, ${chapter.surface}, #0e131b)`,
                      transform: "rotateX(58deg) rotateZ(-16deg)",
                    }}
                  />
                  <div
                    className="absolute left-[20%] top-[22%] h-[44%] w-[40%] rounded-[18px] border shadow-[0_18px_40px_rgba(0,0,0,0.3)]"
                    style={{
                      background: `linear-gradient(180deg, ${chapter.accent}24, transparent)`,
                      borderColor: `${chapter.accent}55`,
                      transform: "rotateX(58deg) rotateZ(-16deg) translateZ(24px)",
                    }}
                  />
                  <div
                    className="absolute right-[16%] top-[20%] h-24 w-24 rounded-full blur-[48px]"
                    style={{ backgroundColor: `${chapter.accentSoft}40` }}
                  />
                  <div className="absolute bottom-6 left-6 right-6 rounded-[20px] border border-white/10 bg-black/28 p-4 backdrop-blur">
                    <div
                      className={`${aspekta.className} mb-2 text-[12px] font-bold uppercase tracking-[0.04em] text-fg-muted`}
                    >
                      Visual cue
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: "68%",
                          background: `linear-gradient(90deg, ${chapter.accent}, ${chapter.accentSoft})`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-24 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p
              className={`${aspekta.className} mb-3 text-[12px] font-bold uppercase tracking-[0.04em] text-fg-muted`}
            >
              Motion spec
            </p>
            <h2
                className={`${aspekta.className} text-[36px] font-semibold leading-[0.98] tracking-[-0.04em] text-fg md:text-[52px]`}
              >
                Movement should add depth, not noise.
              </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {motionSystem.map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)]"
              >
                <div
                  className={`${aspekta.className} mb-2 text-[28px] font-semibold leading-none tracking-[-0.03em] text-fg`}
                >
                  {item.title}
                </div>
                <p className="text-sm font-medium leading-7 text-fg-muted">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
