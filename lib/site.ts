/**
 * Single source of truth for the canonical origin.
 *
 * Metadata, the sitemap and robots.txt all need it, and three hardcoded copies
 * drift the moment a custom domain lands. `NEXT_PUBLIC_SITE_URL` lets a preview
 * deployment advertise its own origin without a code change.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://alireza-akbarzadeh.vercel.app";
