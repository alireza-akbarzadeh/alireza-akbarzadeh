## Alireza Akbarzadeh

Senior Frontend Engineer in Tehran. Six years in production web platforms — the
last four owning frontend architecture for [Tapsi Shop](https://tapsi.shop), a
high-traffic e-commerce platform.

I work at the level of structure rather than screens: module boundaries, state
ownership, rendering strategy, and the standards that keep a growing codebase fast
to change. Most of what I care about shows up six months later — whether a new
feature takes a day or a week, whether the design system holds or drifts, whether
p75 LCP survives the next release.

### What that looks like in practice

- A Feature-Sliced Design module structure across a storefront, an admin panel and
  a vendor panel, with explicit boundaries for state ownership and data flow — so
  three teams can work in parallel without stepping on each other.
- ~30% better Core Web Vitals and load performance from a deliberate SSR/SSG and
  caching strategy, bundle analysis, and image optimization.
- A Storybook-documented design system built on design tokens, shared across three
  products — roughly 20% faster feature delivery, and UI drift between panels
  stopped.
- The unglamorous standards: typed API contracts, lint and CI gates, error
  boundaries, production error monitoring. Production bugs down ~20%.

### Selected work

| Project | What it is |
|---|---|
| **[NovaStudio](https://github.com/alireza-akbarzadeh/NovaStudio)** | AI-native collaborative IDE in the browser — a Monaco workspace running real Node via WebContainers, a full git loop with GitHub clone and publish, live multiplayer editing (Liveblocks + Yjs), and AI chat grounded in the open files and project tree. Next.js 16, React 19, Convex, Vercel AI SDK. |
| **[Stramify](https://github.com/alireza-akbarzadeh/stramify-vue)** | A Twitch/YouTube-style streaming platform built architecture-first: Nuxt 4, Postgres + Drizzle, session auth with RBAC, WebSocket chat, a custom player. Every architectural decision is written down as an [ADR](https://github.com/alireza-akbarzadeh/stramify-vue/blob/master/docs/DECISIONS.md) — including the rejected alternatives. [Live →](https://stramify.vercel.app) |
| **[react-launchpad](https://github.com/alireza-akbarzadeh/react-launchpad)** | An opinionated React starter kit. The opinions are the point; the README explains why each default is there. |
| **[frontend-handbook](https://github.com/alireza-akbarzadeh/frontend-handbook)** | A guide to modern frontend development — what I'd want a mid-level engineer on my team to have read. |

### Stack

**Daily:** TypeScript · React · Next.js (App Router, RSC, streaming, caching) ·
TanStack Query · Tailwind · shadcn/ui · Zod · Vitest / Playwright

**Also work in:** Vue 3 / Nuxt · React Native · Node · Postgres + Drizzle ·
Nx / Turborepo · Docker · GitHub Actions

**AI:** Claude and LLM APIs in daily development and shipped in product features.

### Currently

Building NovaStudio, and writing up what I learned running a design system across
three products.

### Elsewhere

[LinkedIn](https://www.linkedin.com/in/alireza-akbarzadeh/) ·
[X](https://twitter.com/AAkbarzadehDev) ·
work.alireza.akbarzadeh@gmail.com
