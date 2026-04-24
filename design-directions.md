# Design direction research — rutvik.dev

## Method
Surveyed Figma community templates around the referenced grainy-gradient agency file, pulled recent Awwwards Site-of-the-Day winners (Apr 2026) via the portfolio index, and cross-checked well-known design-engineer portfolios (Chiang, Rauno, Paco, Comeau, Lee Robinson) plus studio sites (Locomotive, Basement, Active Theory, Silent House, Studio X, Shader, Ravi Klaassens) against Hover States' alternative-web archive. Figma community URLs 403 to bots but resolve in-browser; all other URLs below were fetched and rendered successfully.

---

## Direction 1 — Grainy Editorial Gradient
**Visual character.** Moody saturated gradients (violet/teal/amber) washed with fine film grain; big editorial serif headline (Tiempos / PP Editorial / GT Sectra) paired with a neutral grotesque (Inter, Neue Haas). Dark-leaning but warmer than our current near-black. Signature moves: animated grainy gradient hero (CSS + SVG noise or OGL shader), sticky serif "thesis" statement, generous whitespace, subtle cursor-follow orb. Closest to the template Rutvik referenced.

**Examples**
- [PORTFOLIO–GO™ grainy gradient agency template](https://www.figma.com/community/file/1492612133091338248/agency-portfolio-website-design-with-grainy-gradient-background-portfoliogo) — the reference; dark + animated noisy gradient + 3D accents.
- [Spline Gradient Portfolio Template](https://www.figma.com/community/file/1182182638859608833/spline-gradient-portfolio-template) — gradient + 3D Spline blob hero, same family.
- [Borealis Grainy Gradients pack](https://www.figma.com/community/file/1119649354639063614/borealis-themed-editable-grainy-gradients-free-pack) — reusable gradient swatches/BG system.
- [anthropic.com](https://www.anthropic.com/) — editorial serif + sans pairing done at production scale; warm neutrals instead of tech-grey.

**Fit for Rutvik.** Good if we want to reposition as "thoughtful operator" rather than "hacker" — the editorial serif reads senior/reflective, which matches a backend/LLM engineer who writes. Softer and more personal than our current terminal vibe. Slightly against Rutvik if we want the site to feel like infrastructure.

**Implementation cost.** Low-medium. Grain = single tiled SVG noise overlay (`mix-blend-mode: overlay`); gradient = CSS radial + Framer Motion hue rotation, or a 30-line OGL shader if we want it reactive. Serif face is a `next/font` swap. Can ship in a weekend on current Next 14 + Tailwind.

**Pros / cons**
- + Genuinely distinct from current site; photographs well in screenshots.
- + Editorial serif gives weight to written content (essays, project write-ups).
- − Gradient-grain is trending and risks looking "2024 agency template."
- − Warm palette competes with the rigor Rutvik's work implies.

---

## Direction 2 — Dense Futurist (Linear / Vercel school)
**Visual character.** Near-black canvas, razor-sharp geist/inter typography at tight tracking, dense multi-column info layouts, thin 1px dividers, subtle animated gradients behind headings only. Lots of data: live status pills, inline code, KBD shortcut hints, "last updated" timestamps. Signature moves: mouse-spotlight on cards, View Transitions API between pages, command-K palette, scroll-linked gradient seams.

**Examples**
- [linear.app](https://linear.app/) — reference palette/typography; restrained motion used as signal, not decoration.
- [vercel.com](https://vercel.com/) — same family; large bold hero over gradient, dense feature grid below.
- [paco.me](https://paco.me/) — design-engineer-at-Linear version, stripped to text and craft.
- [leerob.com](https://leerob.com/) — personal-scale blueprint: tight, text-first, View Transitions, uses the aesthetic on a one-person site.

**Fit for Rutvik.** Strongest narrative fit. Backend/data/LLM engineering IS infrastructure — Linear/Vercel's visual language is literally "we build infra you trust." The density lets us show actual substance (papers, systems diagrams, impact metrics from Fathom/DraftKings/TD) instead of hiding behind animation.

**Implementation cost.** Low. We already have Next 14 + Tailwind + dark theme. Add Framer Motion for transitions, adopt the Geist font, introduce a semantic-token color system (bg/bg-subtle/border/border-subtle/fg/fg-muted/accent). No WebGL, no scroll library.

**Pros / cons**
- + Best signal-to-design-noise ratio for a technical audience (hiring managers, eng peers).
- + Cheap to maintain — adding a new project = a content card, not a new WebGL scene.
- − Familiar. Risks looking like "another Vercel-inspired dev site" unless we push typography and density harder than default.
- − Less expressive; leans on writing quality to carry it.

---

## Direction 3 — OS / Spatial Canvas (Rauno school)
**Visual character.** The page behaves like a desktop or OS: dock-style nav, window-chrome project cards, subtle interface sounds, custom cursor, keyboard-driven navigation, physics-tuned spring animations (stiffness ~300, damping ~30). Dark tones with atmospheric background imagery; horizontal project feeds instead of vertical stacks. Obsessive micro-interactions.

**Examples**
- [rauno.me](https://rauno.me/) — canonical reference; dock, side-scrolling project feed, dark mode toggle with spring animation.
- [devouringdetails.com](https://devouringdetails.com/) — same author's 3-column reference-manual layout, production-polished.
- [Active Theory (activetheory.net)](https://activetheory.net/) — maximal version: full WebGL 3D office with AI navigator; same spatial-metaphor DNA at studio scale.

**Fit for Rutvik.** Medium. The craft signal is high and the OS metaphor reads "I build software systems." But it's a *design engineer* signature — Rauno and Paco are the archetype, and it sets an expectation Rutvik would need to deliver on (custom cursor that doesn't lag, sound design, spring tuning). Worth it only if Rutvik wants to explicitly position as design-engineer-adjacent.

**Implementation cost.** High. Framer Motion alone isn't enough — needs custom cursor, keyboard command stack, Web Audio for interface sounds, careful spring tuning, likely a hand-rolled dock component. 2–3 weeks realistic. No WebGL required for the Rauno flavor (Active Theory would be +OGL/Three on top).

**Pros / cons**
- + Most memorable of the five; sticks with visitors.
- + Scales to new content (each project = a window).
- − Expensive to build right; expensive to maintain (every new project needs motion polish or the canvas feels broken).
- − Can read as "showing off" if the underlying work doesn't match the craft of the shell.

---

## Direction 4 — Studio Bold / Horizontal (Locomotive / Basement school)
**Visual character.** Huge declarative display type (Editorial New, PP Neue Machina, monospace Mono 45 Headline), high-contrast color accents (Basement's #FF4D00 orange, Locomotive's gold), Locomotive-Scroll smooth scroll, horizontal project reels, oversized cursor hover states, bold filter-noise transitions. Studio-energy rather than personal-site-energy.

**Examples**
- [basement.studio](https://basement.studio/) — black + orange, Three.js hero, GSAP motion, confident headline-first.
- [locomotive.ca/en](https://locomotive.ca/en) — Editorial New + Helvetica Now, horizontal scrolls, understated but bold.
- [studioX — thisisstudiox.com](https://thisisstudiox.com/) — Awwwards SOTD Apr 17, 2026; drag-interactive hero carousel, grid-based showcase.
- [silent-house.com](https://silent-house.com/) — Awwwards Honorable Mention Apr 16, 2026; luxury-minimal variant of the same school.
- [Hover States archive](https://www.hoverstat.es/) — ongoing feed of alternative portfolios in this lineage (Ballet de Marseille, Simon Denny, Pawel Achtelik all recent).

**Fit for Rutvik.** Weakest narrative fit. This direction says "studio delivering client work" — Rutvik is an individual backend engineer. Co-opting it risks pretension. Only worth it if Rutvik wants to frame a deliberate alter-ego "studio of one" brand.

**Implementation cost.** Medium-high. Needs Locomotive Scroll or Lenis + GSAP for horizontal reels, custom cursor, probably a 3D accent via Spline or Three.js. 1–2 weeks.

**Pros / cons**
- + Awwwards-ready; strongest aesthetic impact.
- + Forces ruthless content curation (few projects, big).
- − Cultural mismatch with "individual engineer." Reads as affected.
- − Heaviest of the five; hurts Lighthouse, requires scroll-hijack which some users hate.

---

## Direction 5 — Craft-Minimal Text-First (Chiang / Comeau school)
**Visual character.** One-page or near-one-page, content-dominant, blue/teal accent on dark (Chiang) or warm off-white with 3D clay illustrations (Comeau). Inter or Söhne. No grain, no gradients — design retreats so writing leads. Signature moves: fixed side-nav scrollspy, section fade-ins on scroll, subtle hover underlines, résumé-archive link, tasteful easter egg (Chiang's TARDIS).

**Examples**
- [v4.brittanychiang.com](https://v4.brittanychiang.com/) — archetype; dark + navy, Inter, scrollspy nav, carousel work history.
- [brittanychiang.com](https://brittanychiang.com/) — current iteration; similar lineage refined.
- [joshwcomeau.com](https://www.joshwcomeau.com/) — warmer, illustrated variant; clay-3D assets, motion as teaching device.
- [leerob.com](https://leerob.com/) — ultra-minimal pole of this spectrum.

**Fit for Rutvik.** High. This is the default engineer-portfolio aesthetic because it works: writing and work history lead, design supports. But "default" also means undifferentiated — Rutvik already has a Claude-Code-inspired dark terminal site, which lives in this same genre. Moving further into it would be a refinement, not a new direction.

**Implementation cost.** Trivial. Our current stack already sits here. Could ship a v2 polish in 2–3 days.

**Pros / cons**
- + Lowest risk, highest legibility for recruiters.
- + Ages well; Chiang's v4 still reads modern years later.
- − Close to what we already have; the user asked for *different* directions.
- − Undifferentiated from hundreds of dev portfolios.

---

## Recommendation
The two strongest directions for Rutvik are **Direction 2 (Dense Futurist)** and **Direction 3 (OS / Spatial Canvas)**, in that order.

Direction 2 is the best narrative-to-aesthetic match: backend/data/LLM work IS infrastructure, and Linear/Vercel's language lets Rutvik show density of actual substance (Fathom LLM pipelines, DraftKings Payments, TD risk, Huawei SMARTS, UofT neural-net research) rather than hide it behind a shell. It's also near-free to ship from our current Next 14 + Tailwind base, so we can iterate fast.

Direction 3 is the upside play — if Rutvik wants the site itself to be a work sample (i.e., "I sweat craft"), the OS metaphor gives him a canvas no resume can match. Budget 2–3 weeks and commit to motion polish or don't start.

Direction 1 (Grainy Editorial) is the right hedge if Rutvik wants warmth and writing-forward personality over infrastructure vibes. Skip Direction 4 (Studio Bold) — cultural mismatch — and skip Direction 5 (Craft-Minimal) because it's where we already live.
