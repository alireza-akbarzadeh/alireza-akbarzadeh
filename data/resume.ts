/**
 * Résumé content.
 *
 * Kept separate from `data/index.ts` on purpose, and the duplication is
 * deliberate rather than accidental:
 *
 * - The homepage groups skills by how often they are used ("Daily", "Also work
 *   in"), which is a claim about depth. A CV groups them by category, because
 *   that is what a human skim and an applicant tracking system both expect.
 *   Same facts, two audiences, two shapes.
 * - Experience bullets belong to the CV; the homepage renders one prose
 *   paragraph per role. The *identity* of each role — title, company, period —
 *   is not duplicated: it is read from `workExperience`, so the two surfaces
 *   can never disagree about where he worked or when.
 *
 * Everything here is Alireza's own copy, entered verbatim. Nothing is inferred.
 */

export type ResumeSkillGroup = {
  label: string;
  items: string;
};

export const resumeHeader = {
  name: "Alireza Akbarzadeh",
  title: "Senior Frontend Engineer",
  location: "Tehran, Iran",
  languages: "Persian / English",
};

export const resumeSummary =
  "Senior Frontend Engineer, six years in production web platforms — the last four owning frontend architecture for Tapsi Shop, a high-traffic e-commerce platform. I work at the level of structure rather than screens: module boundaries, state ownership, rendering strategy, and the standards that keep a growing codebase fast to change. AI is normal engineering practice for me — Claude and LLM APIs in daily development and shipped in product.";

export const resumeSkills: ResumeSkillGroup[] = [
  {
    label: "Languages",
    items: "TypeScript, JavaScript (ES2015+), HTML5, CSS3",
  },
  {
    label: "Frameworks",
    items:
      "React, Next.js (App Router, RSC, SSR/SSG, streaming, caching), React Native, Vue 3",
  },
  {
    label: "Architecture",
    items:
      "Frontend system design, Feature-Sliced Design, Atomic Design, monorepos (Nx, Turborepo)",
  },
  {
    label: "State & Data",
    items:
      "Redux Toolkit, Zustand, TanStack Query, SWR, GraphQL (Apollo), REST API design",
  },
  {
    label: "UI & Design Systems",
    items:
      "Design tokens, Storybook, TailwindCSS, shadcn/ui, Radix UI, accessibility (WCAG 2.1 AA)",
  },
  {
    label: "Performance",
    items:
      "Core Web Vitals, React Profiler, Lighthouse, bundle analysis, code splitting, Sharp",
  },
  {
    label: "Testing & Quality",
    items:
      "Jest, Vitest, React Testing Library, Cypress, Playwright, error boundaries, monitoring",
  },
  {
    label: "Tooling",
    items:
      "Git, Docker, GitLab CI/CD, Azure DevOps, Vite, Webpack, ESLint, Nx / Turborepo",
  },
  {
    label: "AI Engineering",
    items:
      "Claude / LLM APIs in product features; AI-assisted development workflows",
  },
];

export type ResumeRole = {
  /** Matches `workExperience[].id`, so title/company/period are never re-typed. */
  experienceId: number;
  city: string;
  /** One line under the role header describing the product and stack. */
  context: string;
  bullets: string[];
};

export const resumeRoles: ResumeRole[] = [
  {
    experienceId: 1,
    city: "Tehran",
    context:
      "E-commerce platform (tapsi.shop) with internal admin and vendor panels — Next.js, TypeScript, monorepo.",
    bullets: [
      "Own the frontend architecture across the storefront, admin and vendor panels, introducing a Feature-Sliced Design module structure with explicit boundaries for state ownership, data flow and feature isolation — cutting cross-feature coupling and making parallel work safe.",
      "Improved Core Web Vitals and load performance by roughly 30% through a deliberate SSR/SSG and caching strategy, React Profiler and bundle analysis, and image optimization with Sharp.",
      "Designed and standardized a Storybook-documented design system on design tokens and Atomic Design, shared across three products; feature delivery accelerated by around 20% and UI drift between panels stopped.",
      "Introduced the standards the frontend runs on — typed API contracts, lint and CI gates, error boundaries and production error monitoring — and mentor engineers through structured code review and technical sessions; production bugs down roughly 20%.",
    ],
  },
  {
    experienceId: 2,
    city: "Tehran",
    context:
      "Three production products in React, Next.js and TypeScript — a cryptocurrency trading platform, an e-commerce storefront, and an internal knowledge management system.",
    bullets: [
      "Engineered a real-time, data-dense trading interface with live price and order-book updates, solving the render-throughput and state-consistency problems that come with high-frequency data.",
      "Built the shared component library used across all three products, implemented JWT auth with role-based access control, and cut low-bandwidth load times with code splitting and cache-aware fetching (SWR).",
    ],
  },
];

export type ResumeProject = {
  name: string;
  /** Shown as a link when present. */
  href?: string;
  /** Short label for the link, e.g. a repo path. */
  hrefLabel?: string;
  blurb: string;
  stack?: string;
};

export const resumeProjects: ResumeProject[] = [
  {
    name: "NovaStudio",
    href: "https://github.com/alireza-akbarzadeh/NovaStudio",
    hrefLabel: "github.com/alireza-akbarzadeh/NovaStudio",
    blurb:
      "AI-native collaborative IDE in the browser — editor, AI, git and terminal in one tab. A Monaco workspace running real Node in WebContainers, a full git loop with GitHub clone and publish, live multiplayer editing (Liveblocks + Yjs), and AI chat grounded in the open files and project tree.",
    stack: "Next.js 16, React 19, TypeScript, Convex, Clerk, Vercel AI SDK",
  },
  {
    name: "Luxe",
    blurb:
      "A full e-commerce MVP built end to end across separate frontend and backend, with AI integrated into the product experience.",
  },
  {
    name: "Streaming platform",
    blurb:
      "A video platform in Nuxt 4 and Vue 3: Postgres / Drizzle, session auth with RBAC, a custom-skinned player and ranked recommendation feeds — built architecture-first, every decision recorded as an ADR.",
  },
];

/**
 * Filename the browser suggests when the PDF is saved.
 * Underscores rather than spaces: a recruiter's ATS upload field and half the
 * mail clients in the world still mangle spaces in filenames.
 */
export const resumePdfPath = "/alireza-akbarzadeh-cv.pdf";
