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
      "Backend and data infra for LLM-driven medical coding. I own the chart-routing engine, adaptive scaling per hospital client, and the safeguards that keep bad model output off real bills.",
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
      "My dad texts me “good morning” every day — English, Hindi, sometimes a sunrise emoji. Some days I missed it. He noticed. So I built a bot that replies for me, once a day, however he phrased it.",
    highlight: {
      title: "the machinery",
      description:
        "Gemini 2.5 Flash Lite classifies each message in ~400ms; a Unicode regex covers API blips. Runs 24/7 on a GCP e2-micro free tier, systemd + cgroup caps holding Chromium under a gigabyte. $0/month.",
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
      "Core contributor to SMARTS — Noah’s Ark Lab’s open-source multi-agent RL simulator. Wrote a Python CLI for querying Waymo road networks across 100+ scenarios, and extended the SUMO Map API to ingest OpenDRIVE and Waymo too — so researchers outside SUMO-land could use the tool.",
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
      "Built an internal Status Page for TD’s engineering orgs — live service health, metrics, searchable directory. JIRA hookup auto-filed tickets and pinged service owners the moment downtime showed up.",
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
