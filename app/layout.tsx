import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const siteUrl = "https://alireza-akbarzadeh.vercel.app";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <head>
        <link rel="icon" href="/jsm-logo.png" sizes="any" />
      </head> */}
      <body className={inter.className}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-button focus:border focus:border-hairline focus:bg-canvas-elevated focus:px-4 focus:py-2 focus:text-label-sm focus:text-ink"
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
        </ThemeProvider>
      </body>
    </html>
  );
}
