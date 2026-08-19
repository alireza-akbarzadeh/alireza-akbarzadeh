export const navItems = [
  { name: "About", link: "#about" },
  { name: "Work", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Stack", link: "#stack" },
  { name: "Contact", link: "#contact" },
];

/** Recruiter-scannable proof points, shown under the hero CTAs. */
export const heroFacts = [
  { value: "6 yrs", label: "in production web platforms" },
  { value: "3 products", label: "on one shared design system" },
  { value: "~30%", label: "faster Core Web Vitals" },
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

// The featured case study now lives in data/projects.ts as the "tapsi-shop"
// entry, so the home-page section and its detail page share one source.

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

// Project data moved to data/projects.ts, which carries the full case-study
// shape the detail pages render. Re-exported here so existing `@/data` imports
// keep working.
export { projects, getProject } from "./projects";
export type { Project, ProjectSection, ProjectLink } from "./projects";

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
  /** Keyed to the lucide icon map in components/Footer.tsx. */
  icon: "github" | "x" | "linkedin";
  label: string;
  href: string;
};

export const socialMedia: SocialLink[] = [
  {
    id: 1,
    icon: "github",
    label: "GitHub",
    href: "https://github.com/alireza-akbarzadeh",
  },
  {
    id: 2,
    icon: "x",
    label: "X",
    href: "https://twitter.com/AAkbarzadehDev",
  },
  {
    id: 3,
    icon: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alireza-akbarzadeh/",
  },
];

/**
 * Portrait for the About section.
 *
 * null until a real photograph exists — About renders no image slot at all
 * rather than a placeholder. The repo previously shipped `public/profile.svg`,
 * a stock photograph of an unrelated person; on a portfolio that is worse than
 * having no photo, so the slot stays empty until it is genuinely you.
 *
 * TODO (Alireza): drop a square photo at public/portrait.jpg (1000x1000 or
 * larger, it gets resized) and set this to { src: "/portrait.jpg", alt: "..." }.
 */
export const portrait: { src: string; alt: string } | null = null;

export const contactEmail = "work.alireza.akbarzadeh@gmail.com";
