/**
 * Journey content for Rutvik's personal site.
 *
 * Voice rules (post research pass):
 *   - First person. Never "passionate about", never "scalable solutions".
 *   - Lead with the concrete thing I actually touched / wrote / owned.
 *   - Weird specific nouns beat smooth abstractions. Medical charts >
 *     healthcare systems. Good-morning texts > messaging platform.
 *   - Highlight cards are the "zoom in" on one specific story per role.
 */

export type StackItem = string;

export type Highlight = {
  title: string;
  description: string;
};

export type EntryTheme = {
  accent: string;
  command: string;
};

export type JourneyItem = {
  slug: string;
  kind: "role" | "project";
  dates: string;
  title: string;
  org: string;
  orgUrl: string;
  location?: string;
  blurb: string;
  highlight?: Highlight;
  stack: StackItem[];
  hasPreview?:
    | "fathom"
    | "whatsapp"
    | "smarts"
    | "draftkings"
    | "td"
    | "utsc"
    | "lyra";
  featuredLinks?: Array<{ label: string; href: string }>;
  theme: EntryTheme;
};

export const journey: JourneyItem[] = [
  // 1. FATHOM — current role
  {
    slug: "fathom",
    kind: "role",
    dates: "2024-11 → present",
    title: "Software Engineer, Data Infrastructure",
    org: "Fathom Health",
    orgUrl: "https://fathomhealth.co",
    location: "Toronto (remote)",
    blurb:
      "Building LLM-driven infrastructure that automates medical coding for US hospital networks — shipping production systems across data pipelines, AI inference, and operational tooling.",
    stack: ["python", "airflow", "pyspark", "gcp", "bigquery", "dbt", "llms"],
    hasPreview: "fathom",
    theme: { accent: "#49e6d2", command: "fathom --route" },
  },

  // 2. LYRA — personal project (2026)
  {
    slug: "lyra",
    kind: "project",
    dates: "2026 · weekend",
    title: "Lyra",
    org: "Personal project",
    orgUrl: "https://lyra00.vercel.app",
    blurb:
      "Turns Spotify listening into a 3D force-directed graph. Artists and tracks are nodes; edges link items sharing a Last.fm genre. Sign in, or upload the data-export ZIP for the multi-year view — the currently-playing track lights up its node in real time.",
    highlight: {
      title: "the constellation",
      description:
        "Three.js + d3-force-3d in WebGL, community detection for cluster coloring, a toggleable co-play overlay. Export ZIPs parse client-side via fflate into IndexedDB — millions of plays, no server upload. Anonymous visitors hit Vercel-Blob snapshots baked nightly, so the public view costs zero Spotify rate-limit budget.",
    },
    stack: ["next.js", "three.js", "d3-force-3d", "spotify api", "last.fm", "vercel blob"],
    hasPreview: "lyra",
    featuredLinks: [
      { label: "live", href: "https://lyra00.vercel.app" },
      { label: "github", href: "https://github.com/RutvikGupta/lyra" },
    ],
    theme: { accent: "#e892b8", command: "lyra --listen" },
  },

  // 3. DAD BOT — personal project (2026)
  {
    slug: "dad-bot",
    kind: "project",
    dates: "2026 · weekend",
    title: "Dad Bot",
    org: "Personal project",
    orgUrl: "https://github.com/RutvikGupta/dad-bot",
    blurb:
      "My dad texts me “good morning” every day — English, Hindi, sometimes a sunrise emoji. Some days I missed it. He noticed. So I built a bot that replies for me, once a day, however he phrased it.",
    highlight: {
      title: "the machinery",
      description:
        "Gemini 2.5 Flash Lite classifies each message in ~400ms; a Unicode regex covers API blips. Runs 24/7 on a GCP e2-micro free tier, systemd + cgroup caps holding Chromium under a gigabyte. $0/month.",
    },
    stack: ["node.js", "gemini-2.5", "puppeteer", "systemd", "gcp"],
    hasPreview: "whatsapp",
    featuredLinks: [{ label: "github", href: "https://github.com/RutvikGupta/dad-bot" }],
    theme: { accent: "#9cc36b", command: "dadbot --watch" },
  },

  // 4. DRAFTKINGS
  {
    slug: "draftkings",
    kind: "role",
    dates: "2023-06 → 2024-11",
    title: "Software Engineer, Payments",
    org: "DraftKings",
    orgUrl: "https://draftkings.com",
    location: "Toronto (remote)",
    blurb:
      "Payments. ~$1M/day in deposits and withdrawals through .NET services into card and ACH gateways. I led the card-deposit migration onto modern Gateway APIs and knocked $100K/year off the API bill. On-call during peak sporting events was its own sport.",
    highlight: {
      title: "the migration",
      description:
        "Rewrote the card deposit flow end to end, validated with load tests calibrated for Super Bowl Sunday, shipped without a payments incident. Added E2E tests and Airflow-based data validation so on-call stopped being 60% phantom alerts.",
    },
    stack: ["c#", ".net", "servicestack", "mysql", "rabbitmq", "elasticsearch", "datadog"],
    hasPreview: "draftkings",
    theme: { accent: "#7fd47e", command: "payments --process" },
  },

  // 5. HUAWEI — SMARTS open source
  {
    slug: "huawei",
    kind: "role",
    dates: "2021-05 → 2022-04",
    title: "SWE Intern, Autonomous Driving Sim",
    org: "Huawei Noah's Ark Lab",
    orgUrl: "https://github.com/huawei-noah/SMARTS",
    location: "Toronto",
    blurb:
      "Core contributor to SMARTS — Noah’s Ark Lab’s open-source multi-agent RL simulator. Wrote a Python CLI for querying Waymo road networks across 100+ scenarios, and extended the SUMO Map API to ingest OpenDRIVE and Waymo too — so researchers outside SUMO-land could use the tool.",
    stack: ["python", "sumo", "waymo-open", "gh-actions"],
    hasPreview: "smarts",
    featuredLinks: [{ label: "github", href: "https://github.com/huawei-noah/SMARTS" }],
    theme: { accent: "#74c6ff", command: "smarts --simulate" },
  },

  // 6. TD BANK
  {
    slug: "td",
    kind: "role",
    dates: "2022-05 → 2022-08",
    title: "SWE Intern, Developer Experience",
    org: "TD Bank",
    orgUrl: "https://td.com",
    location: "Toronto",
    blurb:
      "Built an internal Status Page for TD’s engineering orgs — live service health, metrics, searchable directory. JIRA hookup auto-filed tickets and pinged service owners the moment downtime showed up.",
    stack: ["spring-boot", "java", "angularjs", "typescript", "mongodb"],
    hasPreview: "td",
    theme: { accent: "#73c7aa", command: "status --tail" },
  },

  // 7. UTSC CAP LAB
  {
    slug: "utsc",
    kind: "role",
    dates: "2020-05 → 2023-04",
    title: "Research Assistant",
    org: "UTSC CAP Lab",
    orgUrl: "https://www.utsc.utoronto.ca/labs/caplab/",
    location: "Toronto",
    blurb:
      "Three years with Prof. Blair Armstrong at UTSC’s cognitive-neuroscience lab — started as the lab’s programmer in 2020, later added a supervised-research slot. Built a Python framework for simulating cognitive tasks and a pipeline parsing 8,000+ CSVs of behavioural data into training sets. Plus my own study on how humans actually read.",
    highlight: {
      title: "the independent study",
      description:
        "Trained neural-network models to simulate why human readers fixate at different positions inside a word across languages. First real taste of owning a research problem end-to-end: hypothesis, model, experiments, defense.",
    },
    stack: ["python", "pytorch", "numpy", "pandas", "r"],
    hasPreview: "utsc",
    theme: { accent: "#a78bc4", command: "train --model" },
  },
];
