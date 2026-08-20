import {
  IconAccessible,
  IconActivityHeartbeat,
  IconApi,
  IconBinaryTree,
  IconBolt,
  IconBrandAzure,
  IconBrandCss3,
  IconBrandCypress,
  IconBrandHtml5,
  IconBrandJavascript,
  IconBrandCloudflare,
  IconBrandDocker,
  IconBrandGithub,
  IconBrandGitlab,
  IconBrandGolang,
  IconBrandGraphql,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandNuxt,
  IconBrandOpenai,
  IconBrandPnpm,
  IconBrandRadixUi,
  IconBrandReact,
  IconBrandRedux,
  IconBrandSentry,
  IconBrandStorybook,
  IconBrandStripe,
  IconBrandTailwind,
  IconBrandThreejs,
  IconBrandTypescript,
  IconBrandVercel,
  IconBrandVite,
  IconBrandVue,
  IconChartCandle,
  IconDatabase,
  IconDeviceMobile,
  IconGauge,
  IconGitBranch,
  IconLayoutGrid,
  IconPackageExport,
  IconPackages,
  IconPalette,
  IconPhoto,
  IconScissors,
  IconShieldCheck,
  IconShieldExclamation,
  IconSitemap,
  IconStack2,
  IconTerminal2,
  IconTestPipe,
  IconTopologyStar3,
  IconUsersGroup,
  type Icon,
} from "@tabler/icons-react";

export type TechLogo = {
  /** Stable key — also the animation target id. */
  id: string;
  /** Short display name. Not the raw data string, which is often qualified. */
  label: string;
  Icon: Icon;
  /**
   * The brand's own hue. Carried at rest — people recognise a stack by the
   * colour of its logos before they read a single label — and intensified on
   * hover. A few are darkened from the official value where the real one is
   * unreadable on white (see JavaScript); the mark still reads as the brand,
   * which a 1.1:1 icon does not.
   */
  tint: string;
  /**
   * Whether this is a real brand mark or a stand-in glyph for a concept
   * ("Feature-Sliced Design" has no logo). Concept marks render a touch
   * quieter so they never pass themselves off as a product logo.
   */
  concept?: boolean;
};

/**
 * Ordered match rules. First match wins, so the specific entries have to come
 * before the general ones — "React Native" and "React Testing Library" both
 * contain "react" and neither of them is React.
 *
 * Matching on a normalised substring rather than exact equality is what lets
 * one registry serve every call site: the stack section says
 * "Next.js (App Router, RSC)", a case study says "Next.js 16", and both land on
 * the same mark without a second lookup table to keep in sync.
 */
const RULES: Array<[test: RegExp, logo: TechLogo]> = [
  // ── Specific-before-general: these must precede their base framework ──
  [
    /react native/,
    {
      id: "react-native",
      label: "React Native",
      Icon: IconDeviceMobile,
      tint: "#61DAFB",
    },
  ],
  [
    /react testing library|testing library|\brtl\b/,
    {
      id: "rtl",
      label: "Testing Library",
      Icon: IconTestPipe,
      tint: "#E33332",
    },
  ],
  [
    /react hook form/,
    {
      id: "rhf",
      label: "React Hook Form",
      Icon: IconApi,
      tint: "#EC5990",
    },
  ],
  [
    /tanstack|react query/,
    {
      id: "tanstack",
      label: "TanStack Query",
      Icon: IconTopologyStar3,
      tint: "#FF4154",
    },
  ],

  // ── Languages & core frameworks ──
  [
    /typescript|\bts\b/,
    {
      id: "typescript",
      label: "TypeScript",
      Icon: IconBrandTypescript,
      tint: "#3178C6",
    },
  ],
  [
    /next\.?js|app router|rsc/,
    { id: "nextjs", label: "Next.js", Icon: IconBrandNextjs, tint: "#0070F3" },
  ],
  // Vue before Nuxt: the stack lists "Vue 3 / Nuxt" as one entry and Vue is the
  // headline half of it. A bare "Nuxt 4" contains no "vue" and still falls
  // through to the rule below.
  [
    /vue/,
    { id: "vue", label: "Vue", Icon: IconBrandVue, tint: "#42B883" },
  ],
  [
    /nuxt/,
    { id: "nuxt", label: "Nuxt", Icon: IconBrandNuxt, tint: "#00DC82" },
  ],
  [
    /\breact\b/,
    { id: "react", label: "React", Icon: IconBrandReact, tint: "#61DAFB" },
  ],
  [
    /\bgo\b|golang|\bgin\b|gorm|pgx|asynq/,
    { id: "go", label: "Go", Icon: IconBrandGolang, tint: "#00ADD8" },
  ],
  [
    /node/,
    { id: "node", label: "Node.js", Icon: IconBrandNodejs, tint: "#5FA04E" },
  ],
  [
    /three\.?js|webgl/,
    { id: "threejs", label: "Three.js", Icon: IconBrandThreejs, tint: "#049EF4" },
  ],

  // ── Bare languages ──
  //
  // These sit *below* the frameworks on purpose. "Next.js" ends in "js" and
  // "Tailwind CSS" ends in "CSS", so a language rule placed first claims both —
  // which is exactly what happened when they were: every Next.js entry rendered
  // the JavaScript mark and every Tailwind entry rendered the CSS3 one. The
  // patterns are anchored as well as reordered, so neither can regress if
  // something is inserted above them later.
  [
    /javascript|es2015|\bes6\b/,
    {
      id: "javascript",
      label: "JavaScript",
      Icon: IconBrandJavascript,
      // Darkened from the official #F7DF1E, which is a 1.1:1 icon against white
      // and effectively invisible in light mode.
      tint: "#C9A227",
    },
  ],
  [
    /\bhtml5?\b/,
    { id: "html", label: "HTML5", Icon: IconBrandHtml5, tint: "#E34F26" },
  ],
  [
    /\bcss3\b|^css$|\bsass\b|\bscss\b/,
    { id: "css", label: "CSS3", Icon: IconBrandCss3, tint: "#1572B6" },
  ],

  // ── Styling & UI ──
  [
    /tailwind/,
    { id: "tailwind", label: "Tailwind CSS", Icon: IconBrandTailwind, tint: "#38BDF8" },
  ],
  [
    /shadcn|radix/,
    { id: "shadcn", label: "shadcn/ui", Icon: IconBrandRadixUi, tint: "#A1A1AA" },
  ],
  [
    /storybook/,
    { id: "storybook", label: "Storybook", Icon: IconBrandStorybook, tint: "#FF4785" },
  ],
  [
    /design tokens|atomic design/,
    {
      id: "design-tokens",
      label: "Design tokens",
      Icon: IconPalette,
      tint: "#F2A93C",
      concept: true,
    },
  ],

  // ── Data ──
  [
    /postgres|drizzle|\bsql\b/,
    { id: "postgres", label: "PostgreSQL", Icon: IconDatabase, tint: "#4169E1" },
  ],
  [
    /redis/,
    { id: "redis", label: "Redis", Icon: IconStack2, tint: "#DC382D" },
  ],
  [
    /graphql/,
    { id: "graphql", label: "GraphQL", Icon: IconBrandGraphql, tint: "#E10098" },
  ],
  [
    /convex/,
    { id: "convex", label: "Convex", Icon: IconApi, tint: "#EE342F" },
  ],
  [
    /redux/,
    { id: "redux", label: "Redux Toolkit", Icon: IconBrandRedux, tint: "#764ABC" },
  ],
  [
    /zustand/,
    { id: "zustand", label: "Zustand", Icon: IconBolt, tint: "#EF7B24" },
  ],
  [
    /\bzod\b/,
    { id: "zod", label: "Zod", Icon: IconShieldCheck, tint: "#3068B7" },
  ],

  // ── Realtime & collaboration ──
  [
    /liveblocks|yjs|crdt/,
    { id: "crdt", label: "CRDT / Yjs", Icon: IconUsersGroup, tint: "#6366F1" },
  ],
  [
    /websocket|\bsse\b|server-sent/,
    { id: "realtime", label: "Realtime", Icon: IconTopologyStar3, tint: "#22D3EE", concept: true },
  ],

  // ── Quality ──
  [
    /playwright/,
    { id: "playwright", label: "Playwright", Icon: IconTestPipe, tint: "#2EAD33" },
  ],
  [
    /cypress/,
    { id: "cypress", label: "Cypress", Icon: IconBrandCypress, tint: "#69D3A7" },
  ],
  [
    /vitest|jest/,
    { id: "vitest", label: "Vitest", Icon: IconBrandVite, tint: "#729B1B" },
  ],
  [
    /error boundar|monitoring|observab/,
    {
      id: "monitoring",
      label: "Monitoring",
      Icon: IconActivityHeartbeat,
      tint: "#F43F5E",
      concept: true,
    },
  ],
  [
    /lighthouse|core web vitals|web vitals/,
    { id: "vitals", label: "Core Web Vitals", Icon: IconGauge, tint: "#F5A623", concept: true },
  ],
  [
    /sentry/,
    { id: "sentry", label: "Sentry", Icon: IconBrandSentry, tint: "#8B5CF6" },
  ],
  [
    /accessib|wcag|\ba11y\b/,
    { id: "a11y", label: "Accessibility", Icon: IconAccessible, tint: "#2563EB", concept: true },
  ],
  [
    /eslint|prettier/,
    { id: "lint", label: "ESLint / Prettier", Icon: IconShieldCheck, tint: "#4B32C3", concept: true },
  ],

  // ── Platform & tooling ──
  [
    /github actions|github/,
    { id: "github", label: "GitHub Actions", Icon: IconBrandGithub, tint: "#8B949E" },
  ],
  [
    /gitlab/,
    { id: "gitlab", label: "GitLab CI", Icon: IconBrandGitlab, tint: "#FC6D26" },
  ],
  [
    /azure/,
    { id: "azure", label: "Azure DevOps", Icon: IconBrandAzure, tint: "#0078D4" },
  ],
  [
    /docker/,
    { id: "docker", label: "Docker", Icon: IconBrandDocker, tint: "#2496ED" },
  ],
  [
    /\bnx\b|turborepo|monorepo/,
    { id: "monorepo", label: "Monorepo", Icon: IconPackages, tint: "#EF4444", concept: true },
  ],
  [
    /bundle analysis|webpack|bundler/,
    {
      id: "bundling",
      label: "Bundle analysis",
      Icon: IconPackageExport,
      tint: "#8ED6FB",
      concept: true,
    },
  ],
  [
    /code splitting|lazy load/,
    {
      id: "splitting",
      label: "Code splitting",
      Icon: IconScissors,
      tint: "#38BDF8",
      concept: true,
    },
  ],
  [
    /\bsharp\b|image optimi/,
    {
      id: "images",
      label: "Image pipeline",
      Icon: IconPhoto,
      tint: "#99CC00",
      concept: true,
    },
  ],
  // No rule for "React Profiler": it is React tooling and the React mark is the
  // most recognisable thing to put on it, which the /\breact\b/ rule already
  // does. A separate glyph here would only make it harder to identify.
  [
    /system design|frontend architecture/,
    {
      id: "system-design",
      label: "System design",
      Icon: IconSitemap,
      tint: "#F2A93C",
      concept: true,
    },
  ],
  [
    /\bjwt\b|\brbac\b|auth|security/,
    {
      id: "auth",
      label: "Auth",
      Icon: IconShieldExclamation,
      tint: "#EAB308",
      concept: true,
    },
  ],
  [
    /pnpm/,
    { id: "pnpm", label: "pnpm", Icon: IconBrandPnpm, tint: "#F69220" },
  ],
  [
    /vercel/,
    { id: "vercel", label: "Vercel", Icon: IconBrandVercel, tint: "#A1A1AA" },
  ],
  [
    /cloudflare/,
    { id: "cloudflare", label: "Cloudflare", Icon: IconBrandCloudflare, tint: "#F38020" },
  ],
  [
    /\bvite\b/,
    { id: "vite", label: "Vite", Icon: IconBrandVite, tint: "#BD34FE" },
  ],
  [
    /stripe/,
    { id: "stripe", label: "Stripe", Icon: IconBrandStripe, tint: "#635BFF" },
  ],

  // ── AI ──
  [
    /claude|llm|openai|\bai\b/,
    { id: "llm", label: "LLM APIs", Icon: IconBrandOpenai, tint: "#D97757" },
  ],

  // ── Editor / terminal surfaces ──
  [
    /monaco|xterm|webcontainer|terminal/,
    { id: "editor", label: "Editor runtime", Icon: IconTerminal2, tint: "#0EA5E9", concept: true },
  ],
  [
    /tradingview|lightweight charts|\bccxt\b/,
    { id: "charts", label: "Market charts", Icon: IconChartCandle, tint: "#10B981", concept: true },
  ],

  // ── Architecture concepts ──
  [
    /feature-sliced|\bfsd\b/,
    { id: "fsd", label: "Feature-Sliced", Icon: IconSitemap, tint: "#F2A93C", concept: true },
  ],
  [
    /architecture/,
    { id: "architecture", label: "Architecture", Icon: IconBinaryTree, tint: "#F2A93C", concept: true },
  ],
  [
    /\bgit\b/,
    { id: "git", label: "Git", Icon: IconGitBranch, tint: "#F05032" },
  ],
];

/** Anything unmatched still gets a mark, so a grid never renders a hole. */
const FALLBACK: TechLogo = {
  id: "generic",
  label: "Tooling",
  Icon: IconLayoutGrid,
  tint: "#A1A1AA",
  concept: true,
};

/**
 * Whether the registry's tidy name should stand in for what the data actually
 * says.
 *
 * The rules above match *families* — "Go" and "Gin" share one gopher, and
 * "PostgreSQL" and "Drizzle" share one database — so taking the registry label
 * unconditionally would render a project's stack as "Go, Go" and "PostgreSQL,
 * PostgreSQL". The written name is therefore the default, and the registry
 * label only takes over when the written one is a qualified mouthful:
 * parenthesised ("Accessibility (WCAG 2.1 AA)") or simply long ("Lighthouse &
 * Core Web Vitals"). It also has to genuinely be shorter, which keeps
 * "Yjs (CRDT)" from being swapped for the equally long "CRDT / Yjs".
 */
const shouldSimplify = (name: string, label: string) =>
  (name.includes("(") || name.length > 24) && label.length < name.length;

/**
 * Resolve a free-text stack string to its mark.
 *
 * Returns FALLBACK rather than null on purpose — a stack grid with gaps in it
 * looks broken, and a neutral glyph reads as "tool" perfectly well.
 */
export const techLogo = (name: string): TechLogo => {
  const needle = name.toLowerCase();
  const match =
    RULES.find(([test]) => test.test(needle))?.[1] ?? FALLBACK;

  return {
    ...match,
    label: shouldSimplify(name, match.label) ? match.label : name,
  };
};

/**
 * The marks used in the hero-adjacent marquee: the ones worth recognising at a
 * glance, in a deliberate order rather than whatever the stack data happens to
 * list first. Kept short — a marquee of forty logos says nothing.
 */
export const MARQUEE_TECH = [
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "GraphQL",
  "Go",
  "Vue 3",
  "Nuxt",
  "Docker",
  "Playwright",
  "Storybook",
  "Redux",
  "Vite",
  "Three.js",
] as const;
