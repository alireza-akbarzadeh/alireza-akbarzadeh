/**
 * Project data.
 *
 * Everything here is drawn from the repositories themselves. Where a project
 * has no measured outcome yet, the `sections` array simply omits a Result
 * rather than inventing one — see the TODO comments for the specific gaps only
 * Alireza can fill.
 */

export type ProjectSection = {
  id: number;
  label: string;
  body: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  /** One line, shown under the title on the detail page. */
  tagline: string;
  /** The list-row description on the home page. */
  summary: string;
  year: string;
  role: string;
  status: "Live" | "In development";
  /** Opening paragraph of the detail page. */
  context: string;
  /** Shown on the home-page row — keep to the 3-5 that actually matter. */
  stack: string[];
  /** Full stack listing for the detail page. */
  stackDetail: { group: string; items: string[] }[];
  links: ProjectLink[];
  sections: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "tapsi-shop",
    title: "Tapsi Shop",
    tagline: "Three products, one frontend, three teams shipping in parallel",
    summary:
      "Q-commerce platform with storefront, admin and vendor panels. I own the frontend architecture: a Feature-Sliced Design module structure with explicit state and data-flow boundaries, a shared design system, and a caching strategy that cut load time by roughly 30%.",
    year: "2022 — Present",
    role: "Senior Frontend Engineer · frontend architecture owner",
    status: "Live",
    context:
      "A Q-commerce platform with a customer storefront, an internal admin panel and a vendor panel — built in a Next.js and TypeScript monorepo. As it grew, every team was reaching into everyone else's code.",
    stack: ["Next.js", "TypeScript", "Monorepo", "Storybook"],
    stackDetail: [
      {
        group: "Core",
        items: ["Next.js", "React", "TypeScript", "Monorepo"],
      },
      {
        group: "Architecture",
        items: [
          "Feature-Sliced Design",
          "Atomic Design",
          "Design tokens",
          "Storybook",
        ],
      },
      {
        group: "Quality",
        items: [
          "Typed API contracts",
          "Lint & CI gates",
          "Error boundaries",
          "Production error monitoring",
        ],
      },
    ],
    links: [{ label: "tapsi.shop", href: "https://tapsi.shop" }],
    sections: [
      {
        id: 1,
        label: "Problem",
        body: "Features were coupled across surfaces: shared state with no clear owner, data fetching wherever it was convenient, and UI drifting apart between the three panels. Parallel work meant merge pain, and small changes carried unpredictable blast radius.",
      },
      {
        id: 2,
        label: "Approach",
        body: "Restructured the frontend on Feature-Sliced Design with explicit module boundaries for state ownership, data flow and feature isolation. Rendering strategy became deliberate — SSR/SSG and caching chosen per route rather than by default — and the shared UI moved to a Storybook-documented design system built on design tokens and Atomic Design.",
      },
      {
        id: 3,
        label: "Trade-offs",
        body: "Feature-Sliced Design adds ceremony: a trivial feature touches more files, and the layering has to be taught before it pays off. We accepted that cost because the alternative — implicit boundaries — was already charging us more, in review time and in regressions.",
      },
      {
        id: 4,
        label: "Result",
        body: "Roughly 30% better Core Web Vitals and load performance, feature delivery around 20% faster, production bugs down about 20%, and UI drift between the panels stopped.",
      },
    ],
  },

  {
    slug: "luxe",
    title: "Luxe",
    tagline: "A domain-driven Go backend, and a frontend whose API types can't drift from it",
    summary:
      "A full-stack e-commerce platform: a Go/Gin backend running catalog, cart, checkout, fulfillment and returns behind a generic DB-driven workflow engine, and a Next.js storefront + admin dashboard whose entire API layer is generated from the backend's own OpenAPI spec.",
    year: "2026",
    role: "Solo — full-stack",
    status: "In development",
    context:
      "An e-commerce platform built as two repositories — a Go API (luxe) and a Next.js storefront/admin (luxe-front) — covering the full commerce lifecycle: catalog and search, cart, multi-method checkout, order fulfillment, returns, and an admin surface for running all of it, rather than just the customer-facing half.",
    stack: ["Go", "Gin", "Next.js 16", "PostgreSQL", "Stripe"],
    stackDetail: [
      {
        group: "Backend",
        items: [
          "Go",
          "Gin",
          "GORM / pgx",
          "PostgreSQL",
          "Redis",
          "Asynq",
          "Stripe",
        ],
      },
      {
        group: "Frontend",
        items: [
          "Next.js 16",
          "React 19",
          "TypeScript",
          "Tailwind CSS v4",
          "TanStack Query / Table / Form",
          "Zustand",
          "next-intl",
        ],
      },
      {
        group: "Platform & quality",
        items: [
          "Orval (OpenAPI codegen)",
          "Sentry",
          "OpenTelemetry",
          "Prometheus",
          "Playwright",
          "Vitest",
        ],
      },
    ],
    links: [
      {
        label: "github.com/luxe (backend)",
        href: "https://github.com/alireza-akbarzadeh/luxe",
      },
      {
        label: "github.com/luxe-front",
        href: "https://github.com/alireza-akbarzadeh/luxe-front",
      },
    ],
    sections: [
      {
        id: 1,
        label: "Problem",
        body: "A real store needs more than a product list and a buy button: stock has to stay correct through checkout, payments have to support more than one path, fulfillment and returns are their own workflows, and someone running the store needs an admin surface for all of it. Layer a frontend on top and there's a second problem — keeping its API types honest as the backend's contract keeps changing underneath it.",
      },
      {
        id: 2,
        label: "Approach",
        body: "The backend is Go and Gin, layered so HTTP handlers bind and validate a request, hand off to a per-domain application layer, and land on domain rules sitting over GORM/pgx repositories. Checkout, payment and stock-decrement paths run inside database transactions; slower work — order and shipment processing, transactional email — goes through an Asynq queue backed by Redis, falling back to an in-memory worker when Redis isn't configured, so the same code path runs in local dev without extra infrastructure. On the frontend, REST types and query hooks aren't hand-written: the backend's Swagger annotations produce an OpenAPI 3 spec, and Orval generates typed TanStack Query hooks straight from it into `src/services/` — editing a generated file is treated as a bug, not a shortcut.",
      },
      {
        id: 3,
        label: "Decisions",
        body: "The deliberate architectural bet is the workflow engine: order, product, shipment, return, coupon, brand, category, collection and user lifecycles all run on one generic, database-driven state machine — states, transitions, guards and hooks stored as data — instead of nine separate hardcoded status enums scattered through the codebase. Every admin screen that touches a lifecycle gets the same transitions editor rather than a bare status dropdown, so adding a new stateful entity means writing a definition, not a parallel set of if/else branches.",
      },
      {
        id: 4,
        label: "Trade-offs",
        body: "The admin and storefront are explicit in their own docs about what's real versus stubbed, rather than presenting a finished surface: gift cards exist as UI with no backend entity behind them yet, social login shows a \"coming soon\" toast, and a handful of admin routes are roadmap placeholders rather than wired pages. The trade-off was deliberate — ship the core buy flow (catalog through checkout through fulfillment through returns) completely, and leave the remaining surface visibly unfinished instead of quietly half-working.",
      },
      // TODO (Alireza): a few things only you can fill in before this goes live —
      // (1) why you built this one (portfolio depth piece vs. a specific business
      // idea), (2) the hardest bug or trade-off you actually hit building the
      // workflow engine or the Stripe/wallet payment split, (3) whether the
      // Render API (luxe-3pvz.onrender.com) and the Vercel storefront are meant
      // to stay public — I couldn't reach either from this sandbox to confirm
      // they're live, so no demo link is included above. Add one once confirmed,
      // and flip `status` to "Live" once the deploys are stable and worth linking.
    ],
  },

  {
    slug: "nexora",
    title: "Nexora",
    tagline: "A spot-trading terminal where the API keys never touch the client",
    summary:
      "A full-stack crypto trading platform: users connect exchange accounts, watch live order books over Binance WebSocket streams, and place spot orders. Credentials are encrypted at rest and every exchange call runs server-side.",
    year: "2025",
    role: "Solo — full-stack",
    status: "Live",
    context:
      "A Binance-inspired trading platform that connects a user's own exchange account, streams live market data, and executes spot trades. The interesting constraint is not the UI — it's that the application handles credentials which, if leaked, cost the user real money.",
    stack: ["Next.js 16", "React 19", "CCXT", "Postgres", "WebSockets"],
    stackDetail: [
      {
        group: "Frontend",
        items: [
          "Next.js 16",
          "React 19",
          "TypeScript",
          "Tailwind CSS v4",
          "shadcn/ui",
          "TradingView Lightweight Charts",
        ],
      },
      {
        group: "Backend & data",
        items: [
          "Next.js API routes",
          "CCXT",
          "Neon PostgreSQL",
          "Drizzle ORM",
          "Better Auth",
        ],
      },
      {
        group: "Realtime & state",
        items: ["Binance WebSocket streams", "TanStack Query", "Zustand"],
      },
    ],
    links: [
      {
        label: "github.com/Nexora",
        href: "https://github.com/alireza-akbarzadeh/Nexora",
      },
    ],
    sections: [
      {
        id: 1,
        label: "Problem",
        body: "A trading client has to hold exchange API credentials to be useful at all. Do that naively — keys in the browser, calls straight from the client to the exchange — and any XSS, any leaked bundle, any malicious dependency drains a real account. The security model has to be decided before the first order form gets built.",
      },
      {
        id: 2,
        label: "Approach",
        body: "Credentials are encrypted at rest with AES-256-GCM and stored in PostgreSQL; the plaintext key never leaves the server. Every exchange interaction goes through CCXT on the server side, so the browser talks only to this application's own API and never directly to the exchange. Market data — which needs no authentication — streams straight to the client over Binance WebSockets, keeping the live ticker and order book fast without widening the trust boundary.",
      },
      {
        id: 3,
        label: "Decisions",
        body: "Splitting the data path in two was the central call: authenticated actions (balances, orders) route through the server where the keys live, while public market data streams directly to the browser. That keeps the hot path — price and order-book updates — off the server entirely, and confines the security-sensitive surface to a small, auditable set of routes.",
      },
      // TODO (Alireza): add a Result section once there is something measured —
      // e.g. WebSocket reconnect behaviour under network loss, p95 order latency,
      // or the outcome of a security review. Leave it out rather than guess.
    ],
  },

  {
    slug: "novastudio",
    title: "NovaStudio",
    tagline: "A browser IDE that runs real Node, with the team in the same file",
    summary:
      "An AI-native collaborative IDE that runs in the browser — a Monaco workspace executing real Node via WebContainers, a full git loop with GitHub clone and publish, live multiplayer editing over CRDTs, and AI chat grounded in the open files and project tree.",
    year: "2025",
    role: "Solo — full-stack",
    status: "In development",
    context:
      "Development normally means juggling an editor, a terminal, a git client and an AI chat window, with the AI having no idea what any of the others are doing. NovaStudio puts all four in one browser tab and — the part that matters — gives the AI the same view of the project that the developer has.",
    stack: ["Next.js 16", "React 19", "WebContainers", "Yjs", "Convex"],
    stackDetail: [
      {
        group: "Frontend",
        items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4"],
      },
      {
        group: "Editor & runtime",
        items: ["Monaco", "WebContainers", "xterm", "Prettier"],
      },
      {
        group: "Collaboration",
        items: ["Liveblocks", "Yjs (CRDT)"],
      },
      {
        group: "Platform",
        items: [
          "Convex",
          "Clerk",
          "Vercel AI SDK",
          "Inngest",
          "GitHub OAuth",
        ],
      },
    ],
    links: [
      {
        label: "github.com/NovaStudio",
        href: "https://github.com/alireza-akbarzadeh/NovaStudio",
      },
    ],
    sections: [
      {
        id: 1,
        label: "Problem",
        body: "An in-browser editor is easy. An in-browser editor where code actually executes, several people edit the same file at once without clobbering each other, and an assistant can answer questions about the project rather than about a pasted snippet — those are three separate hard problems that have to coexist in one runtime.",
      },
      {
        id: 2,
        label: "Approach",
        body: "WebContainers provide a real Node runtime in the browser, so the terminal and package installs are genuine rather than simulated. Concurrent editing runs on Yjs CRDTs via Liveblocks, which resolves conflicting edits without a central lock. The AI layer is wired to the open files and the project tree, so its context is the workspace itself rather than whatever the user remembered to paste.",
      },
      {
        id: 3,
        label: "Decisions",
        body: "The codebase is organised by domain — `src/features/*` for workspace, projects and GitHub integration — rather than by technical layer. With four subsystems this size, grouping by feature keeps each one's state, UI and server calls in one place; grouping by layer would have scattered every feature across four directories and made the boundaries impossible to enforce.",
      },
      // TODO (Alireza): a Trade-offs section would strengthen this a lot.
      // Candidates you actually hit: WebContainers' browser/COOP-COEP constraints,
      // CRDT memory growth on long sessions, or why Convex over a conventional
      // Postgres + WebSocket server.
    ],
  },

  {
    slug: "notely",
    title: "Notely",
    tagline: "Realtime sync, and an honest note about where it stops scaling",
    summary:
      "A collaborative notes workspace with spaces, tags, shared checklists and email-based sharing — synced across devices in realtime over authenticated Server-Sent Events, with the scaling limit of that choice written down rather than hidden.",
    year: "2025",
    role: "Solo — full-stack",
    status: "Live",
    context:
      "A notes workspace that syncs across devices in realtime: spaces, notes, tags, favourites, a Today view, shared checklists, attachments and email-based sharing with an invite accept/decline flow.",
    stack: ["Next.js 16", "React 19", "SSE", "Postgres", "Drizzle"],
    stackDetail: [
      {
        group: "Frontend",
        items: [
          "Next.js 16",
          "React 19",
          "TypeScript",
          "Tailwind CSS v4",
          "shadcn/ui",
        ],
      },
      {
        group: "Backend & data",
        items: [
          "Better Auth (with 2FA)",
          "Neon PostgreSQL",
          "Drizzle ORM",
        ],
      },
      {
        group: "Realtime & state",
        items: [
          "Authenticated Server-Sent Events",
          "TanStack Query",
          "Zustand",
        ],
      },
    ],
    links: [
      {
        label: "github.com/notely",
        href: "https://github.com/alireza-akbarzadeh/notely",
      },
    ],
    sections: [
      {
        id: 1,
        label: "Problem",
        body: "Multi-device sync means a change made in one tab has to appear in every other open tab, belonging to every user with access, without the originating tab reacting to its own echo — and without opening a realtime channel that any unauthenticated client can subscribe to.",
      },
      {
        id: 2,
        label: "Approach",
        body: "Mutations publish typed events to an in-process hub, and subscribed clients receive them over authenticated Server-Sent Events. Each browser tab identifies itself with an `x-client-id` header, which lets the hub filter a tab's own echoes back out. SSE rather than WebSockets because the traffic is genuinely one-directional — the server pushes, the client mutates over ordinary HTTP — and SSE costs far less to operate at that shape.",
      },
      {
        id: 3,
        label: "Trade-offs",
        body: "The in-process hub is correct for a single instance and wrong the moment there are two: events published on one instance never reach clients subscribed to another. That limit is documented in the repository rather than discovered in production — scaling out means moving the hub to Redis or a dedicated service such as PartyKit. Building the simple version first, with the failure mode written down, was the deliberate choice.",
      },
    ],
  },

  {
    slug: "stramify",
    title: "Stramify",
    tagline: "A streaming platform where every decision is written down",
    summary:
      "A Twitch/YouTube-style streaming platform built architecture-first in Nuxt 4 — session auth, chat, a custom-skinned player and recommendation feeds — with every architectural decision recorded as an ADR, including the ones that were rejected.",
    year: "2025",
    role: "Solo — full-stack",
    status: "Live",
    context:
      "An open-source alternative to commercial streaming platforms, built full-stack on Nuxt 4. The point of the project was less the feature set than the discipline: making architectural decisions explicitly, and recording the reasoning where the next person can read it.",
    stack: ["Nuxt 4", "Vue 3", "Postgres", "Drizzle", "Playwright"],
    stackDetail: [
      {
        group: "Frontend",
        items: ["Nuxt 4", "Vue 3", "TypeScript"],
      },
      {
        group: "Backend & data",
        items: ["Node.js", "Drizzle ORM", "PostgreSQL"],
      },
      {
        group: "Quality & tooling",
        items: ["Vitest", "Playwright", "ESLint", "pnpm"],
      },
    ],
    links: [
      {
        label: "stramify.vercel.app",
        href: "https://stramify.vercel.app",
      },
    ],
    sections: [
      {
        id: 1,
        label: "Problem",
        body: "Solo projects accumulate undocumented decisions. Six months later the reasoning is gone, and the only way to find out why something was built a particular way is to change it and see what breaks.",
      },
      {
        id: 2,
        label: "Approach",
        body: "Architecture decisions live in `docs/DECISIONS.md` as numbered ADRs, each recording the context, the options considered, the choice and the consequences — including options that were rejected and why. ADR-025, for example, covers consolidating on pnpm as the sole package manager, with the remaining migration steps tracked separately in `docs/PROGRESS.md`.",
      },
      {
        id: 3,
        label: "Decisions",
        body: "Testing was split deliberately rather than defaulting to one tool: Vitest for unit-level logic where feedback needs to be immediate, Playwright for the end-to-end paths where the value is confidence that a real browser can complete a real flow.",
      },
      // TODO (Alireza): worth adding a Trade-offs entry on the cost of the ADR
      // discipline itself — it slows the first version down measurably, and the
      // honest case for paying that cost is a strong senior signal.
    ],
  },

  {
    slug: "react-launchpad",
    title: "react-launchpad",
    tagline: "The defaults I reach for, with the reasoning attached",
    summary:
      "An opinionated React starter kit — the tooling, hooks and conventions I start a new project with, each choice documented rather than assumed. Used by other developers as a project baseline.",
    year: "2024",
    role: "Solo — author and maintainer",
    status: "Live",
    context:
      "Every new React project starts with the same two days of setup: build tooling, linting, formatting, test infrastructure, commit hooks, a component library, a handful of hooks you always end up writing. This is that setup, done once, with the reasoning for each default written down.",
    stack: ["React", "TypeScript", "Vite", "Vitest"],
    stackDetail: [
      {
        group: "Core",
        items: ["React", "TypeScript", "Vite"],
      },
      {
        group: "UI & state",
        items: [
          "Tailwind CSS",
          "shadcn/ui",
          "Zustand",
          "React Hook Form",
          "React Query",
          "Framer Motion",
          "Lucide",
        ],
      },
      {
        group: "Quality",
        items: [
          "Vitest",
          "React Testing Library",
          "MSW",
          "Storybook",
          "ESLint",
          "Prettier",
          "Husky",
          "commitlint",
        ],
      },
    ],
    links: [
      {
        label: "github.com/react-launchpad",
        href: "https://github.com/alireza-akbarzadeh/react-launchpad",
      },
    ],
    sections: [
      {
        id: 1,
        label: "Problem",
        body: "Starter kits are usually either too thin to save real time or so opinionated that removing what you don't want costs more than starting from scratch. The useful middle is a small set of defaults that are genuinely defensible, with the reasoning visible so anyone can disagree with a specific one and swap it.",
      },
      {
        id: 2,
        label: "Approach",
        body: "The kit ships the decisions rather than just the dependencies: MSW-backed test infrastructure so tests never hit a real network, Storybook for developing components in isolation, and Husky with commitlint so the mistakes that would otherwise reach review get caught at commit time. Alongside the tooling are the hooks that get rewritten on every project — `useIntersectionObserver`, `useLocalStorage`, `useScroll` — implemented once.",
      },
      {
        id: 3,
        label: "Decisions",
        body: "Enforcement is pushed as early in the loop as it will go. Lint, format and commit-message checks run as git hooks rather than only in CI, on the principle that the cheapest place to catch a mistake is before it becomes a commit — the same standard-over-heroics argument that shows up in the production work.",
      },
    ],
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);

/**
 * TODO (Alireza): these repositories were private/404 at the time of writing, so
 * they are not represented here. To add one, copy any object above and fill it
 * in — the detail page and the home-page list both derive from this array, so
 * nothing else needs touching:
 *   - devtools-2
 *
 * `luxe` and `luxe-front` were added 2026-08-18, now that both repos are
 * public. See the TODO comment inside that entry for the specific gaps
 * (role/motivation, live-demo links) still worth filling in.
 *
 * Also deliberately excluded, and worth keeping excluded: `alirezas-os` (an
 * unmodified create-t3-app scaffold) and `orders` (four commits, no README).
 * A reviewer who clicks through to boilerplate discounts everything around it.
 *
 * `vibe` (vibecinema.vercel.app) is a second streaming platform with a larger
 * commit history than Stramify. Only one is listed, to avoid the obvious
 * "why build this twice?" question — swap the entry above if you'd rather
 * lead with Vibe.
 */
