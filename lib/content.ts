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
    | "utsc";
  featuredLink?: { label: string; href: string };
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
      "Backend and data infrastructure for LLM-driven medical coding. I own the routing engine — which chart goes to which reviewer, per-destination capacity caps, scaling per hospital client (hardcoded thresholds when I got there, adaptive now). Plus self-recovery for corrupt files and flaky upstream systems so the data team stops waking up at 3am, a GCP Cloud Function running a daily HIPAA-access audit that pings Slack when something looks off, and safeguards on the AI coding prediction pipeline so bad model output never lands on a bill.",
    stack: ["python", "airflow", "pyspark", "gcp", "bigquery", "dbt", "llms"],
    hasPreview: "fathom",
    theme: { accent: "#49e6d2", command: "fathom --route" },
  },

  // 2. DAD BOT — personal project (2026)
  {
    slug: "dad-bot",
    kind: "project",
    dates: "2026 · weekend",
    title: "Dad Bot",
    org: "Personal project",
    orgUrl: "https://github.com/RutvikGupta/dad-bot",
    blurb:
      "My dad texts me “good morning” every day. English, Hindi, sometimes just a sunrise emoji. Some days I missed it. He noticed. So I built a bot that watches his messages and replies “Good Morning Papa” for me — once a day, no matter how he phrased it.",
    highlight: {
      title: "the machinery",
      description:
        "Gemini 2.5 Flash Lite classifies each incoming message in ~400ms across languages, spelling variants, and emojis. A hand-tuned Unicode regex takes over when Gemini 429s or the API blips, so the bot never goes silent. Runs 24/7 on a GCP e2-micro in the always-free tier, with systemd + cgroup caps keeping Chromium under a gigabyte of RAM. Total cost: $0/month. My dad doesn’t know it’s a bot.",
    },
    stack: ["node.js", "gemini-2.5", "puppeteer", "systemd", "gcp"],
    hasPreview: "whatsapp",
    featuredLink: { label: "github", href: "https://github.com/RutvikGupta/dad-bot" },
    theme: { accent: "#9cc36b", command: "dadbot --watch" },
  },

  // 3. DRAFTKINGS
  {
    slug: "draftkings",
    kind: "role",
    dates: "2023-06 → 2024-11",
    title: "Software Engineer, Payments",
    org: "DraftKings",
    orgUrl: "https://draftkings.com",
    location: "Toronto (remote)",
    blurb:
      "Payments team. Roughly $1M/day in deposits and withdrawals flowing through .NET services talking to external card and ACH gateways. I led the card-deposit migration off the legacy stack onto modern Gateway APIs, mentored a couple of interns through it, and knocked about $100K/year off our API bill. On-call during peak sporting events was its own sport.",
    highlight: {
      title: "the migration",
      description:
        "Rewrote the card deposit flow end to end, validated it with functional + regression + load tests calibrated for Super Bowl Sunday spikes, and shipped it without a production payments incident. Also introduced automated end-to-end tests and Airflow-based data validation so on-call stopped being 60% chasing phantom alerts.",
    },
    stack: ["c#", ".net", "servicestack", "mysql", "rabbitmq", "elasticsearch", "datadog"],
    hasPreview: "draftkings",
    theme: { accent: "#7fd47e", command: "payments --process" },
  },

  // 4. HUAWEI — SMARTS open source
  {
    slug: "huawei",
    kind: "role",
    dates: "2021-05 → 2022-04",
    title: "SWE Intern, Autonomous Driving Sim",
    org: "Huawei Noah's Ark Lab",
    orgUrl: "https://github.com/huawei-noah/SMARTS",
    location: "Toronto",
    blurb:
      "Core contributor to SMARTS — Noah’s Ark Lab’s open-source multi-agent RL simulator for self-driving research. I wrote a Python CLI that let researchers query and animate Waymo road networks across 100+ scenarios, and extended the simulator’s SUMO Map API to also ingest OpenDRIVE and Waymo formats. Basically made the tool work for more people’s research, not just the ones already inside SUMO-land.",
    stack: ["python", "sumo", "waymo-open", "gh-actions"],
    hasPreview: "smarts",
    featuredLink: { label: "github", href: "https://github.com/huawei-noah/SMARTS" },
    theme: { accent: "#74c6ff", command: "smarts --simulate" },
  },

  // 5. TD BANK
  {
    slug: "td",
    kind: "role",
    dates: "2022-05 → 2022-08",
    title: "SWE Intern, Developer Experience",
    org: "TD Bank",
    orgUrl: "https://td.com",
    location: "Toronto",
    blurb:
      "Summer internship on the Developer Experience team. I built an internal Status Page app for TD’s engineering orgs — live service health, metrics dashboards, a searchable service directory. Hooked up JIRA so outages auto-filed tickets and pinged service owners the moment downtime showed up, which cut a lot of incident-triage busywork for on-call.",
    stack: ["spring-boot", "java", "angularjs", "typescript", "mongodb"],
    hasPreview: "td",
    theme: { accent: "#73c7aa", command: "status --tail" },
  },

  // 6. UTSC CAP LAB
  {
    slug: "utsc",
    kind: "role",
    dates: "2020-05 → 2023-04",
    title: "Research Assistant",
    org: "UTSC CAP Lab",
    orgUrl: "https://www.utsc.utoronto.ca/labs/caplab/",
    location: "Toronto",
    blurb:
      "Three years with Prof. Blair Armstrong at UTSC’s cognitive-neuroscience lab — started May 2020 as the lab’s programmer and stayed through the end of undergrad, later adding a supervised-research slot on top. Two parallel tracks, both neural-network-based: building shared lab infrastructure with a team of students, and running my own independent study on how humans actually read. The infrastructure side ended up as a small Python framework the lab used to simulate a range of cognitive abilities, plus a pipeline that parsed 8,000+ CSVs of behavioural experiment data into usable training sets.",
    highlight: {
      title: "the independent study",
      description:
        "Designed and trained neural-network models to simulate why human readers fixate at different positions inside a word across different languages — a question that needed the reading-science literature as much as the network architecture. First real taste of owning a research problem end-to-end: framing the hypothesis, picking the model, running experiments, and defending the results.",
    },
    stack: ["python", "pytorch", "numpy", "pandas", "r"],
    hasPreview: "utsc",
    theme: { accent: "#a78bc4", command: "train --model" },
  },
];
