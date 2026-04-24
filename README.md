# rutvik.dev

Personal portfolio — Next.js 14 + Tailwind, grainy-editorial-gradient aesthetic.

## Dev

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Structure

```
app/
├── layout.tsx                              # Root: fonts + orb backdrop + spotlight
├── page.tsx                                # Home: hero, journey, résumé, contact
├── globals.css                             # Palette, grain, orbs, typography
└── projects/
    └── dad-bot/
        └── page.tsx                        # Dad Bot case study

components/
├── header.tsx                              # Serif wordmark + sans nav
├── section-heading.tsx                     # Small-caps label + serif title
├── journey-item.tsx                        # Editorial journey card w/ animation
├── orb-field.tsx                           # 3 blurred gradient orbs (bg layer)
├── spotlight.tsx                           # Cursor-following radial tint
├── scroll-progress.tsx                     # Thin scroll progress bar
├── reveal.tsx                              # IntersectionObserver scroll reveal
├── lottie-card.tsx                         # Optional Lottie wrapper (unused)
└── previews/                               # One animated SVG per journey entry
    ├── fathom-preview.tsx
    ├── whatsapp-preview.tsx
    ├── smarts-preview.tsx
    ├── draftkings-preview.tsx
    ├── td-preview.tsx
    └── utsc-preview.tsx

lib/
└── content.ts                              # Journey entries + per-entry themes
```

## Design — Grainy Editorial Gradient

- **Palette:** deep aubergine canvas `#13101a`, warm cream `#ede6d6`, salmon
  accent `#ff8b5c`, with violet `#b593f5` and teal `#6fd4d0` gradient seeds.
- **Typography:** Instrument Serif (display + italic accents), Inter (body +
  nav), JetBrains Mono (small-caps labels + tags).
- **Signature moves:** 3-orb blurred gradient backdrop that slowly drifts;
  fine SVG noise overlay (mix-blend: overlay, ~14% opacity) for film grain;
  cursor-following warm spotlight; editorial serif headlines with italic
  accents; small-caps tracked section labels; pill-style stack tags.
- **Per-entry accents:** each journey card scopes its own `--entry-accent`
  (salmon, green, gold, blue, red, violet) so borders, hover states, and
  animation strokes all inherit the role's color.

See `DEPLOY.md` for Vercel deployment instructions.
See `design-directions.md` for the research that led here.
