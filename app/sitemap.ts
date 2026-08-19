import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";

/**
 * Every route is known at build time — the home page plus one detail page per
 * project — so the sitemap is generated from the same `projects` array the
 * pages render from. Adding a project can't leave the sitemap stale.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/work/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
