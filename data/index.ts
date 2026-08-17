export const navItems = [
  { name: "Projects", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
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
