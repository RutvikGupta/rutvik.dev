import { Header } from "@/components/header";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Dad Bot — Rutvik Gupta",
  description:
    "A WhatsApp bot I built as a gift for my dad — replies 'Good Morning Papa' exactly once a day, no matter how he phrases it.",
};

const bugs = [
  {
    title: "apt collision on Ubuntu 22.04",
    body: "chromium-browser installs a snap that Puppeteer doesn't play with. A hung apt process held the dpkg lock. Killed it, ran dpkg --configure -a to recover state, switched to Google Chrome stable via the official apt repo.",
  },
  {
    title: "Chrome profile lock symlinks",
    body: "Tarred the .wwebjs_auth session from my Mac → uploaded to the VM → Chrome refused to start because SingletonLock/Socket/Cookie were symlinks pointing to the Mac's hostname. Deleted the Singleton* files after extract.",
  },
  {
    title: "Puppeteer --single-process bug",
    body: "To save RAM I set LOW_MEMORY=1, which added --single-process. Chromium died with 'Requesting main frame too early!' — a known Puppeteer issue. Dropped the flag; 2 GB swapfile picks up the slack.",
  },
  {
    title: "WhatsApp 'Linked ID' chat format",
    body: "My self-chat ('Message Yourself') uses @lid for message.to, not @c.us. Filter never fired. Switched to message.from (the chat's WID, direction-agnostic).",
  },
];

const stack: [string, string][] = [
  ["Runtime", "Node.js 20 LTS — matches whatsapp-web.js' supported range."],
  ["WhatsApp", "whatsapp-web.js — drives Chromium via Puppeteer against WhatsApp Web."],
  ["Classifier", "Gemini 2.5 Flash Lite. ~$0.0001/msg, handles Hindi transliterations, emojis, elongated spellings."],
  ["Fallback", "Hand-tuned Unicode regex — fires if Gemini returns 429/503/network. Bot never goes silent."],
  ["Supervisor", "systemd — auto-restart on crash, cgroup MemoryMax=900M on a 1 GB e2-micro."],
  ["Host", "GCP e2-micro, us-central1-a — Always Free forever."],
  ["Memory", "2 GB swapfile + MemoryHigh=700M. Steady state ~550 MB with headroom."],
  ["Auth", "WhatsApp Linked Devices — QR scan once, session persisted."],
];

export default function DadBotPage() {
  return (
    <div className="relative z-10 mx-auto max-w-4xl">
      <Header />

      <main className="px-6 py-8 md:px-12 lg:px-20">
        {/* Back link */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-sans text-[13px] text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft
            size={14}
            strokeWidth={1.4}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Back to journey
        </Link>

        {/* Hero */}
        <section className="stagger mt-10 pb-14">
          <div className="label mb-6 flex items-center gap-3">
            <span className="text-accent">Project</span>
            <span className="h-px w-8 bg-line-strong" />
            <span>2026 · Weekend</span>
          </div>
          <h1 className="display max-w-3xl text-[40px] text-fg md:text-[64px]">
            A WhatsApp bot that replies to my dad&apos;s{" "}
            <span className="display-italic text-accent">good morning</span>{" "}
            messages — exactly once a day, no matter how he phrases them.
          </h1>
          <p className="mt-10 max-w-2xl font-sans text-[16px] leading-[1.72] text-fg-muted">
            Dad texts me &ldquo;good morning&rdquo; every day — in English,
            Hindi, sometimes just a sunrise emoji. Some days I miss it. He
            notices. So I built a bot that quietly replies &ldquo;Good
            Morning Papa&rdquo; on my behalf. Dad never had to change a thing.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-5">
            <div className="rounded-sm border border-line-strong/60 bg-bg-panel/40 p-5">
              <div className="label mb-2">Monthly cost</div>
              <div className="font-serif text-[32px] text-accent">$0</div>
            </div>
            <div className="rounded-sm border border-line-strong/60 bg-bg-panel/40 p-5">
              <div className="label mb-2">Latency</div>
              <div className="font-serif text-[32px] text-accent">~500ms</div>
            </div>
            <div className="rounded-sm border border-line-strong/60 bg-bg-panel/40 p-5">
              <div className="label mb-2">Code for Dad</div>
              <div className="font-serif text-[32px] text-accent">0 lines</div>
            </div>
          </div>
        </section>

        {/* How it feels */}
        <section className="py-14">
          <div className="label mb-4 flex items-center gap-3">
            <span className="text-accent">01</span>
            <span className="h-px w-8 bg-line-strong" />
            <span>How it feels</span>
          </div>
          <h2 className="display mb-8 text-[32px] text-fg md:text-[40px]">
            One reply. Once a day. Always.
          </h2>

          <div className="rounded-sm border border-line-strong/60 bg-bg-panel/40 p-6 font-sans text-[14px] leading-[1.85]">
            <div className="flex items-baseline gap-3">
              <span className="label">07:04 · Dad</span>
              <span className="font-serif text-[22px] italic text-fg">☀️</span>
            </div>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="label" style={{ color: "var(--color-accent)" }}>
                07:04 · Bot
              </span>
              <span className="font-serif text-[18px] italic text-fg">
                Good Morning Papa
              </span>
            </div>
            <div className="mt-4 font-mono text-[12px] text-muted">
              gemini → YES · reply sent · state recorded
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="label">09:12 · Dad</span>
              <span className="font-serif text-[18px] italic text-fg">
                shubh prabhat beta
              </span>
            </div>
            <div className="mt-1 font-mono text-[12px] text-muted">
              already replied today — skipped
            </div>
          </div>
        </section>

        {/* Stack */}
        <section className="py-14">
          <div className="label mb-4 flex items-center gap-3">
            <span className="text-accent">02</span>
            <span className="h-px w-8 bg-line-strong" />
            <span>Stack</span>
          </div>
          <h2 className="display mb-8 text-[32px] text-fg md:text-[40px]">
            Free tier, squeezed.
          </h2>
          <ul className="divide-y divide-line border-y border-line">
            {stack.map(([k, v]) => (
              <li
                key={k}
                className="grid grid-cols-1 gap-2 py-4 md:grid-cols-[180px_1fr] md:gap-8"
              >
                <div className="label" style={{ color: "var(--color-accent)" }}>
                  {k}
                </div>
                <div className="font-sans text-[15px] leading-[1.7] text-fg-muted">
                  {v}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Bugs */}
        <section className="py-14">
          <div className="label mb-4 flex items-center gap-3">
            <span className="text-accent">03</span>
            <span className="h-px w-8 bg-line-strong" />
            <span>Bugs</span>
          </div>
          <h2 className="display mb-8 text-[32px] text-fg md:text-[40px]">
            Four things that broke in one afternoon.
          </h2>
          <ol className="space-y-8">
            {bugs.map((b, i) => (
              <li key={b.title} className="border-l-2 border-accent/40 pl-6">
                <div className="label mb-2" style={{ color: "var(--color-accent)" }}>
                  Bug {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="display-italic text-[24px] text-fg md:text-[28px]">
                  {b.title}
                </h3>
                <p className="mt-3 font-sans text-[15px] leading-[1.72] text-fg-muted">
                  {b.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Takeaway */}
        <section className="py-14">
          <div className="label mb-4 flex items-center gap-3">
            <span className="text-accent">04</span>
            <span className="h-px w-8 bg-line-strong" />
            <span>Takeaway</span>
          </div>
          <div className="max-w-3xl space-y-6 font-serif text-[22px] leading-[1.55] text-fg md:text-[28px]">
            <p>
              The best personal projects are ones{" "}
              <span className="italic text-accent">nobody asked for</span>.
              Dad never said &ldquo;build me a bot.&rdquo; He just noticed
              when I didn&apos;t reply.
            </p>
            <p>
              Running in production at $0/month with strict memory caps forced
              decisions I&apos;d have hand-waved on a beefier host.
              Fallbacks. cgroup limits. A classifier cheap enough to forget
              about. <span className="italic">Constraints are a gift.</span>
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 border border-line-strong px-5 py-2.5 font-sans text-[13px] text-fg transition-all hover:border-accent hover:text-accent"
            >
              <ArrowLeft
                size={13}
                strokeWidth={1.4}
                className="transition-transform group-hover:-translate-x-0.5"
              />
              Back to journey
            </Link>
            <a
              href="mailto:hello@rutvik.dev"
              className="group inline-flex items-baseline gap-1.5 font-serif italic text-[18px] text-fg-muted transition-colors hover:text-accent"
            >
              Ask about this project
              <ArrowUpRight
                size={14}
                strokeWidth={1.4}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </section>
      </main>

      <footer className="mt-12 flex items-center justify-between px-6 pb-10 pt-6 md:px-12 lg:px-20">
        <span className="label">Rutvik Gupta · {new Date().getFullYear()}</span>
        <span className="label">Toronto</span>
      </footer>
    </div>
  );
}
