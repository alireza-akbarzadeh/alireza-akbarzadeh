import type { Metadata, Viewport } from "next";

import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";
import { siteUrl } from "@/lib/site";
import Cursor from "@/components/ui/Cursor";
import { ThemeProvider } from "./provider";

/**
 * Inter, actually loaded.
 *
 * `--font-sans` named Inter for a long time while nothing ever fetched it, so
 * the site rendered in Inter only for visitors who happen to have it installed
 * locally and in Arial for everyone else. That was survivable while the largest
 * type on the page was 72px; the hero headline is now half again that size, and
 * at display sizes the difference between Inter's tight, flat-sided grotesque
 * and Arial's wider, rounder one is the whole character of the page.
 *
 * Self-hosted by next/font (no request to Google at runtime), `display: swap`
 * so the headline is never invisible, and exposed as a variable so `--font-sans`
 * in globals.css stays the single place the family is declared.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const title = "Alireza Akbarzadeh — Senior Frontend Engineer";
const description =
  "Senior Frontend Engineer with six years in production web platforms. Frontend architecture, design systems and performance — React, Next.js and TypeScript.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  keywords: [
    "Alireza Akbarzadeh",
    "Senior Frontend Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Frontend Architecture",
    "Design Systems",
  ],
  authors: [{ name: "Alireza Akbarzadeh", url: siteUrl }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Alireza Akbarzadeh",
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@AAkbarzadehDev",
  },
  robots: { index: true, follow: true },
};

/**
 * Tints the browser/OS chrome to match the active theme. Two entries keyed on
 * the media query rather than one fixed colour, so the address bar follows the
 * theme instead of pinning to whichever mode happened to be the default.
 * Values are the resolved --canvas token for each theme.
 */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The font variable has to land on <html>, not <body>: Tailwind declares
  // --font-sans on :root, and a custom property referenced from a declaration is
  // substituted where that declaration lives. With --font-inter defined one level
  // down on <body>, --font-sans resolved against nothing at :root, went invalid,
  // and every font-sans element silently fell back to the UA stack.
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded-button focus:border focus:border-hairline focus:bg-canvas-elevated focus:px-4 focus:py-2 focus:text-label-sm focus:text-ink"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          {/* Mounted once at the root rather than per page, so the contextual
              cursor survives client navigation between the home page and a case
              study instead of being torn down and rebuilt. It renders nothing
              at all on touch devices and under prefers-reduced-motion. */}
          <Cursor />
        </ThemeProvider>

        {/*
          Analytics answers the one question the portfolio cannot answer on its
          own: which case study anyone actually reads. Without it there is no
          signal for what to deepen next, and the roadmap is guesswork.

          SpeedInsights reports field Core Web Vitals from real visitors. The
          hero runs WebGL, which is the part most likely to regress quietly on
          mid-range hardware, and a lab score on a fast machine will not catch
          that.

          Both are cookieless and collect no personal data, so no consent banner
          is required — which is the reason for choosing these over an
          analytics product that would need one on a personal site.

          Neither runs in development, so local work is not counted.
        */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
