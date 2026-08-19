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
    title: "I'm based in Tehran, Iran and open to remote work worldwide.",
    description: "",
    className: "lg:col-span-5 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 2,
    title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },

  {
    id: 3,
    title: "Make the safe path the easy path",
    body: "Typed API contracts, lint and CI gates, error boundaries, monitoring. Standards should catch mistakes before review does.",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently im working on tapsi.shop",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
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

export const contactEmail = "work.alireza.akbarzadeh@gmail.com";
