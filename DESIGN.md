---
version: 1.0
name: Alireza Akbarzadeh — Portfolio Design System
description: The `geist-system` skill's structure (ink/canvas/hairline scale, tight Geist type discipline, 4px spacing, bimodal radius, hairline-first elevation) applied to a dark-first Next.js/Tailwind portfolio, with two deliberate deviations from the skill's literal Vercel palette — a dual dark/light theme instead of light-only, and an original amber accent + optional original-hue hero mesh instead of Vercel's own #0070f3 link blue and cyan/blue/violet/magenta/amber gradient.

colors:
  ink: "hsl(var(--ink))"
  body: "hsl(var(--body-text))"
  mute: "hsl(var(--mute))"
  faint: "hsl(var(--faint))"
  hairline: "hsl(var(--hairline))"
  hairline-soft: "hsl(var(--hairline-soft))"
  canvas: "hsl(var(--canvas))"
  canvas-elevated: "hsl(var(--canvas-elevated))"
  accent-brand: "hsl(var(--accent-brand))"
  accent-brand-deep: "hsl(var(--accent-brand-deep))"
  accent-brand-soft: "hsl(var(--accent-brand-soft))"
  destructive: "hsl(var(--destructive))"

typography:
  display-xl: { size: 48px, weight: 600, leading: 48px, tracking: -2.4px, use: "Hero headline" }
  heading-lg: { size: 32px, weight: 600, leading: 40px, tracking: -1.28px, use: "Section headings" }
  heading-md: { size: 20px, weight: 600, leading: 28px, tracking: -0.4px, use: "Card / case-study titles" }
  label-sm: { size: 14px, weight: 500, leading: 20px, tracking: -0.28px, use: "Nav links, strong labels" }
  mono-eyebrow: { size: 12px, weight: 500, leading: 16px, tracking: 0px, use: "Section eyebrows (uppercase)" }
  body-lg: { size: 16px, weight: 400, leading: 24px, use: "Hero subhead, lead paragraphs" }
  body-md: { size: 14px, weight: 400, leading: 20px, use: "Default paragraph copy" }
  body-sm: { size: 12px, weight: 400, leading: 16px, use: "Captions, metadata, dates" }
  code: { size: 14px, weight: 400, leading: 20px, use: "Tech-stack tags, inline code" }

rounded:
  button: 6px
  card: 12px
  panel: 16px
  pill-category: 64px
  pill: 100px
  full: 9999px

spacing:
  base-unit: 4px
  scale: "4 xxs · 8 xs · 12 sm · 16 md · 24 lg · 32 xl · 40 2xl · 64 3xl · 96 4xl · 128 section"
  tailwind-mapping: "Implemented via Tailwind's existing numeric scale (p-1=4px … p-32=128px) — no separate named spacing tokens were added; see Deviations below."

---

## Overview

This is the `geist-system` skill applied to this repo, not reinvented. The skill's discipline — one neutral ink/canvas/hairline scale, hairline-first elevation, Geist type at tight negative tracking, bimodal button shapes (pill for marketing, 6px square for nav/app) — is the actual design system here, byte-for-byte where it doesn't conflict with this project's own constraints. `tailwind.config.ts` and `app/globals.css` are wired directly to it.

Two things were changed, on purpose, after checking the skill's literal output against this project's own instructions (`What Not To Do`: *"avoid excessive gradients... avoid generic developer portfolio aesthetics"*; `Professional Software Engineer Portfolio` §6) and against the app's actual runtime config (`app/layout.tsx` already sets `defaultTheme="dark"` via `next-themes`):

1. **Dark is the flagship theme, light is fully specified too.** The skill ships light-only. A senior engineer's portfolio that silently reverts every visitor to light mode on first paint, then flashes to dark, is a worse first impression than just building the dark theme the app already defaults to. Both themes use the identical desaturated ink scale — only the direction (near-black canvas vs. near-white) and a few lightness values change.
2. **The accent is an original amber, not Vercel's own `#0070f3`.** Re-using Vercel's exact link blue and its literal five-stop hero mesh (cyan → blue → violet → magenta → amber) on a personal engineer's portfolio reads as "styled with vercel.com's brand kit," not as original positioning — exactly the "generic template" risk the project brief rules out. The accent hue changed; the *rule* — one chromatic token, confined to links/focus/one CTA highlight, never a chrome fill — did not.

Everything else — type scale, spacing rhythm, radius scale, elevation model, hairline-first cards, pill-vs-square button logic — is the skill, unmodified.

**Key characteristics:**
- One neutral ink/canvas/hairline scale carries headings, body, and borders — dark by default (`#0A0A0A` canvas / `#FAFAFA` ink), light fully specified as the second theme (`#FAFAFA` canvas / `#171717` ink, i.e. the skill's own light values).
- One chromatic token, `accent-brand` — a warm amber (`hsl(36 90% 37%)` light / `hsl(36 87% 59%)` dark) — for links, focus, and a single CTA highlight. No gradient anywhere by default; an optional original-hue hero mesh is documented but off unless a section explicitly opts in.
- Two button shapes by context, never mixed: full pill (`rounded-pill`) for marketing CTAs, tight 6px square (`rounded-button`) for nav/utility controls.
- Depth is a 1px hairline before a shadow. `shadow-whisper`/`shadow-floating` are theme-aware CSS vars — dark mode needs real alpha (black is invisible on black), light mode keeps the skill's exact `0.04`/`0.08` values.
- Geist type scale verbatim from the skill: display-xl at -2.4px tracking down to mono-eyebrow uppercase labels, weight binary at 600/500/400.

## Colors

### Ink scale (0% saturation both themes — lightness only)
| Token | Dark | Light | Use |
|---|---|---|---|
| `ink` | `#FAFAFA` | `#171717` | Headings, primary text, primary-button foreground |
| `body` | `#A1A1A1` | `#4D4D4D` | Paragraph copy, nav links |
| `mute` | `#737373` | `#8F8F8F` | Captions, metadata, eyebrow labels |
| `faint` | `#525252` | `#A1A1A1` | Placeholders, disabled text |
| `hairline` | `#292929` | `#EBEBEB` | Every card, input, divider border |
| `hairline-soft` | `#1F1F1F` | `#F2F2F2` | Faint alternating panel / inset well fill |
| `canvas` | `#0A0A0A` | `#FAFAFA` | Page background |
| `canvas-elevated` | `#121212` | `#FFFFFF` | Cards, inputs, popovers |

### Accent — the one deviation from the skill's literal palette
- **`accent-brand`** — light `hsl(36 90% 37%)` / dark `hsl(36 87% 59%)`, an original warm amber. `accent-brand-deep` is the pressed/hover tone, `accent-brand-soft` a pale wash for selected backgrounds. Same job as the skill's `link` token (links, focus rings, one CTA highlight) — different hue, so the portfolio doesn't read as a Vercel re-skin.

### Semantic
- **`destructive`** — dark `hsl(0 84% 60%)`, light `hsl(0 89% 47%)`, tracking the skill's `error`/`error-deep` values. Wired through the existing shadcn-style `--destructive` token for form validation, unlikely to see real use on a portfolio.

## Typography

Inter (already loaded via `next/font/google` in `app/layout.tsx`) fills the "Geist Sans" role — it's the skill's own documented fallback. `font-mono` uses the real system-mono stack (`ui-monospace, SFMono-Regular, Menlo, Consolas`) rather than naming unloaded webfonts, so section eyebrows and tags render correctly with zero added dependencies today; swap in the `geist` npm package's `GeistMono` later by editing one line in `tailwind.config.ts` — no component call-sites change, since they'll already be using `font-mono`.

| Token | Tailwind | Use |
|---|---|---|
| `display-xl` | `text-display-xl font-sans` | Hero headline |
| `heading-lg` | `text-heading-lg font-sans` | Section headings |
| `heading-md` | `text-heading-md font-sans` | Card / project titles |
| `label-sm` | `text-label-sm font-sans` | Nav links, strong labels |
| `mono-eyebrow` | `text-mono-eyebrow font-mono uppercase text-mute` | Section eyebrows, role tags |
| `body-lg` | `text-body-lg text-body` | Hero subhead, lead paragraphs |
| `body-md` | `text-body-md text-body` | Default paragraph copy |
| `body-sm` | `text-body-sm text-mute` | Captions, dates, metadata |
| `button-lg` / `button-md` | `text-button-lg` / `text-button-md` | Pill / square button labels |
| `code` | `text-code font-mono` | Tech-stack tags, inline code |

All eleven sizes are wired into `tailwind.config.ts` `theme.extend.fontSize` with the skill's exact size/leading/tracking/weight — additive to Tailwind's default scale, nothing removed.

## Layout & Spacing

4px base unit, per the skill. **Deviation:** rather than adding a second, named spacing scale (`xxs`/`sm`/`lg`/…) alongside Tailwind's existing numeric one, this project maps the skill's scale onto Tailwind's built-in spacing directly — they're the same 4px arithmetic, so a parallel vocabulary would be pure duplication:

| Skill token | px | Tailwind |
|---|---|---|
| `xxs` | 4 | `1` |
| `xs` | 8 | `2` |
| `sm` | 12 | `3` |
| `md` | 16 | `4` |
| `lg` | 24 | `6` |
| `xl` | 32 | `8` |
| `2xl` | 40 | `10` |
| `3xl` | 64 | `16` |
| `4xl` | 96 | `24` |
| `section` | 128 | `32` |

Card interiors: `p-6`–`p-8` (24–32px). Section bands: `py-24 md:py-32` (96–128px vertical rhythm) — the skill's whitespace-does-the-separating philosophy, unchanged.

## Elevation

| Level | Tailwind | Use |
|---|---|---|
| 0 — Flat | `border border-hairline`, no shadow | Default cards, inputs, dividers |
| 1 — Whisper | `border border-hairline shadow-whisper` | Lightly-raised project cards |
| 2 — Floating | `border border-hairline shadow-floating` | Mobile nav sheet, tooltips, modals |

`shadow-whisper`/`shadow-floating` resolve to theme-aware CSS vars — light mode keeps the skill's literal `rgba(0,0,0,0.04)`/`0.08`; dark mode uses `0.4`/`0.5–0.6` alpha, since a black shadow has no contrast against a near-black canvas. Never stack more than one level.

## Shapes

| Token | Value | Tailwind | Use |
|---|---|---|---|
| `button` | 6px | `rounded-button` | Nav links, utility/icon buttons |
| `card` | 12px | `rounded-card` | Case-study cards, skill-group panels |
| `panel` | 16px | `rounded-panel` | Larger panels (about, contact) |
| `pill-category` | 64px | `rounded-pill-category` | Category/filter tabs, if the project list gets one |
| `pill` | 100px | `rounded-pill` | Marketing CTAs, tech-stack tags |
| `full` | 9999px | `rounded-full` | Circular icon buttons, avatars |

Bimodal, per the skill: rectangles at 12–16px for content, pills for anything that's an action or a tag — never in between, never mixed within one context.

## Components

- **`nav-bar`** — `canvas`/~80% opacity + backdrop-blur on scroll (functional legibility blur, not decorative glass), bottom `hairline`, `label-sm` links. Active section marked by an `accent-brand` underline/dot, not a fill.
- **`button-primary`** (pill) — `ink` fill, inverse-canvas text, `rounded-pill`, `button-lg`, horizontal padding only. Hero + footer's main CTA.
- **`button-secondary`** (pill, outline) — transparent, 1px `hairline`, `ink` text, same shape as primary. Pairs as a secondary action.
- **`button-nav`** (square) — `canvas-elevated` fill, 1px `hairline`, `rounded-button`, `button-md`. Theme toggle, menu trigger, social links.
- **`tag-pill`** — `canvas-elevated`, 1px `hairline`, `rounded-pill`, `code` text. Tech-stack tags — quiet, support the case study, don't headline it.
- **`case-study-card`** — `canvas-elevated`, 1px `hairline`, `rounded-card`, `p-6`–`p-8`. `mono-eyebrow` role/year → `heading-md` title → `body-md` one-line problem statement → 2–4 `tag-pill`s → text link to the full case study. Elevation 0 default, 1 on hover.
- **`timeline-item`** (Experience) — left `hairline` spine, `mono-eyebrow` date range, `heading-md` role + company, `body-md` contribution summary. No logo decoration.
- **`skill-group`** — `heading-md`-labeled cluster of `tag-pill`s (Frontend / Backend / Data / Engineering per the mission doc's own grouping), not one undifferentiated wall.
- **`footer`** — `canvas`, top `hairline`, `body-md` links in a simple row.

## Optional: Hero Mesh (off by default)

The skill's one sanctioned decorative element — a soft, blurred multi-stop gradient confined to the hero, never repeated elsewhere. Given the project brief's explicit caution against gradients as a genericness signal, this is documented but **not applied** until a specific hero design calls for it. If used, original stops — not Vercel's:

```css
background:
  radial-gradient(circle at 15% 20%, hsla(36, 87%, 59%, 0.30), transparent 40%),  /* amber   — accent-brand */
  radial-gradient(circle at 80% 20%, hsla(339, 76%, 63%, 0.24), transparent 45%), /* rose */
  radial-gradient(circle at 50% 80%, hsla(176, 69%, 39%, 0.22), transparent 45%); /* teal */
filter: blur(60px);
opacity: 0.7; /* lower than the skill's 0.8 — restraint over the literal spec */
```
Three stops (not five), confined to the hero, never reused. If the hero reads well without it — which a hairline-and-type-driven hero usually does — leave it off.

## What changed in the repo (this pass)

`app/globals.css` and `tailwind.config.ts` now carry the full token set above — `bg-canvas`, `text-ink`, `border-hairline`, `text-display-xl`, `rounded-pill`, `shadow-whisper`, etc. are real, usable Tailwind classes. All changes are additive: existing shadcn-style tokens (`background`, `foreground`, `border`, `primary`, …) were retuned in place to the new neutral values (not renamed), so anything already using them — `body`'s `bg-background text-foreground`, for instance — picks up the new look automatically. Nothing was deleted.

**Not done in this pass**, because it's section-rebuild work, not token work, and the mission doc calls for establishing the system before touching sections (§6):
1. Retiring the installed template's decorative components — `GradientBg`, `Spotlight`, `MovingBorders`, `CanvasRevealEffect`, `HoverBorder`, the confetti/globe assets, and the blob keyframes in `tailwind.config.ts`. They're the exact multi-color/glassmorphism aesthetic this system replaces; leaving them in place means the site will look inconsistent — new tokens next to old decorative chrome — until sections are rebuilt against this spec.
2. Rebuilding `Hero`, `RecentProjects`, `Experience`, `About`, `Footer` against the component specs above.
