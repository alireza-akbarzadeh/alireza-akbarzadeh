export const navItems = [
  { name: "About", link: "#about" },
  { name: "Work", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Stack", link: "#stack" },
  { name: "Contact", link: "#contact" },
];

export const principles = [
  {
    id: 1,
    title: "Boundaries before features",
    body: "Where state lives and how data crosses module lines is decided first. Most frontend pain a year in traces back to a boundary nobody drew on day one.",
  },
  {
    id: 2,
    title: "One system, not five opinions",
    body: "Design tokens and a documented component layer, so three products look like one product and a new screen is assembly rather than invention.",
  },
  {
    id: 3,
    title: "Make the safe path the easy path",
    body: "Typed API contracts, lint and CI gates, error boundaries, monitoring. Standards should catch mistakes before review does.",
  },
  {
    id: 4,
    title: "Measure, then claim",
    body: "Rendering strategy and bundle size judged against real numbers. If I say it got 30% faster, there is a before and after behind it.",
  },
];

export const caseStudy = {
  eyebrow: "Case study · Tapsi Shop",
  title: "Three products, one frontend, three teams shipping in parallel",
  context:
    "A Q-commerce platform with a customer storefront, an internal admin panel and a vendor panel — built in a Next.js and TypeScript monorepo. As it grew, every team was reaching into everyone else's code.",
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
};

export const stackGroups = [
  {
    id: 1,
    label: "Daily",
    note: "What I reach for without thinking",
    items: [
      "TypeScript",
      "React",
      "Next.js (App Router, RSC)",
      "TanStack Query",
      "Tailwind CSS",
      "shadcn/ui",
      "Zod",
      "Storybook",
    ],
  },
  {
    id: 2,
    label: "Also work in",
    note: "Shipped production code in all of these",
    items: [
      "Vue 3 / Nuxt",
      "React Native",
      "Node",
      "PostgreSQL + Drizzle",
      "GraphQL",
      "Redux Toolkit",
      "Zustand",
    ],
  },
  {
    id: 3,
    label: "Quality",
    note: "How the work stays correct",
    items: [
      "Vitest / Jest",
      "Playwright",
      "React Testing Library",
      "Lighthouse & Core Web Vitals",
      "Sentry",
      "Accessibility (WCAG 2.1 AA)",
    ],
  },
  {
    id: 4,
    label: "Platform & AI",
    note: "Around the app",
    items: [
      "Nx / Turborepo",
      "Docker",
      "GitHub Actions",
      "GitLab CI",
      "Azure DevOps",
      "Claude & LLM APIs in product",
    ],
  },
];

export type Project = {
  id: number;
  title: string;
  des: string;
  img?: string;
  stack: string[];
  link: string;
  linkLabel: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Tapsi Shop",
    des: "Q-commerce platform with storefront, admin and vendor panels. I own the frontend architecture: a Feature-Sliced Design module structure with explicit state and data-flow boundaries, a shared design system, and a caching strategy that cut load time by roughly 30%.",
    img: "/tapsi.png",
    stack: ["Next.js", "TypeScript", "Monorepo", "Storybook"],
    link: "https://tapsi.shop",
    linkLabel: "tapsi.shop",
  },
  {
    id: 2,
    title: "NovaStudio",
    des: "An AI-native collaborative IDE that runs in the browser — a Monaco workspace executing real Node via WebContainers, a full git loop with GitHub clone and publish, live multiplayer editing, and AI chat grounded in the open files and project tree.",
    stack: ["Next.js 16", "React 19", "WebContainers", "Yjs", "Convex"],
    link: "https://github.com/alireza-akbarzadeh/NovaStudio",
    linkLabel: "github.com/NovaStudio",
  },
  {
    id: 3,
    title: "Stramify",
    des: "A Twitch/YouTube-style streaming platform built architecture-first: session auth with RBAC, WebSocket chat, a custom-skinned player and ranked recommendation feeds. Every architectural decision is written down as an ADR, including the ones I rejected.",
    stack: ["Nuxt 4", "Vue 3", "Postgres", "Drizzle", "WebSockets"],
    link: "https://stramify.vercel.app",
    linkLabel: "stramify.vercel.app",
  },
  {
    id: 4,
    title: "react-launchpad",
    des: "An opinionated React starter kit — the defaults I reach for on a new project, with the reasoning for each one written down. Used by other developers as a project baseline.",
    stack: ["React", "TypeScript", "Vite"],
    link: "https://github.com/alireza-akbarzadeh/react-launchpad",
    linkLabel: "github.com/react-launchpad",
  },
];

export type WorkExperience = {
  id: number;
  title: string;
  company: string;
  period: string;
  desc: string;
};

export const workExperience: WorkExperience[] = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "Tapsi Shop",
    period: "Jun 2022 — Present",
    desc: "Own the frontend architecture across storefront, admin and vendor panels. Introduced Feature-Sliced Design module boundaries, a Storybook-documented design system shared across three products, and the standards the frontend runs on — typed API contracts, lint and CI gates, error boundaries and production error monitoring.",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Digialpha",
    period: "Apr 2021 — Apr 2022",
    desc: "Built three production products in React, Next.js and TypeScript — a cryptocurrency trading platform, an e-commerce storefront and an internal knowledge management system. Engineered the real-time trading interface with live price and order-book updates, and built the shared component library used across all three.",
  },
];

export type SocialLink = {
  id: number;
  img: string;
  label: string;
  href: string;
};

export const socialMedia: SocialLink[] = [
  {
    id: 1,
    img: "/git.svg",
    label: "GitHub",
    href: "https://github.com/alireza-akbarzadeh",
  },
  {
    id: 2,
    img: "/twit.svg",
    label: "X",
    href: "https://twitter.com/AAkbarzadehDev",
  },
  {
    id: 3,
    img: "/link.svg",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alireza-akbarzadeh/",
  },
];

export const contactEmail = "work.alireza.akbarzadeh@gmail.com";
