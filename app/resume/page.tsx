import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Globe, Mail, MapPin } from "lucide-react";
// Brand marks come from Tabler, not lucide, which dropped them in v1 — the
// same split components/Footer.tsx already makes for this exact icon map.
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";
import type { Icon as TablerIcon } from "@tabler/icons-react";
import type { LucideIcon } from "lucide-react";

import { contactEmail, heroFacts, socialMedia, workExperience } from "@/data";
import {
  resumeHeader,
  resumeProjects,
  resumeRoles,
  resumeSkills,
  resumeSummary,
} from "@/data/resume";
import { siteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import Nav from "@/components/Nav";
import PrintLightMode from "@/components/resume/PrintLightMode";
import ResumeActions from "@/components/resume/ResumeActions";
import ResumeSection from "@/components/resume/ResumeSection";
import SkillGroups from "@/components/resume/SkillGroups";

export const metadata: Metadata = {
  title: "CV — Alireza Akbarzadeh",
  description: resumeSummary.slice(0, 155),
  alternates: { canonical: "/resume" },
  // A CV competes with the homepage for the same queries while saying less, so
  // it stays out of the index — but the links on it should still be followed.
  robots: { index: false, follow: true },
};

const bareHost = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

const SOCIAL_ICONS: Record<string, TablerIcon | LucideIcon> = {
  github: IconBrandGithub,
  x: IconBrandX,
  linkedin: IconBrandLinkedin,
};

/**
 * Contact row.
 *
 * `value` stays the bare host rather than the label, because that string is
 * what a reader copies off a printed page and what an ATS extracts — "GitHub"
 * is not an address. The icon is screen-only decoration on top of it.
 */
const CONTACT = [
  { value: contactEmail, href: `mailto:${contactEmail}`, Icon: Mail },
  ...socialMedia.map((social) => ({
    value: bareHost(social.href),
    href: social.href,
    Icon: SOCIAL_ICONS[social.icon] ?? Globe,
  })),
  { value: bareHost(siteUrl), href: siteUrl, Icon: Globe },
];

/**
 * The CV.
 *
 * One rendered document, two ways out: the print dialog (which every browser
 * offers as "Save as PDF") and a pre-rendered PDF served from /public. The PDF
 * is generated from *this page* by `pnpm cv:pdf`, so there is no second copy of
 * the content to keep in sync — the page is the source, the file is a build
 * artefact of it.
 *
 * Role identity (title, company, period) is read from `workExperience`, the
 * same record the homepage renders, so the CV and the site cannot disagree
 * about where he worked. Only the CV-shaped detail — bullets, categorised
 * skills — lives in `data/resume.ts`.
 */
export default function ResumePage() {
  const roles = resumeRoles.map((entry) => ({
    ...entry,
    role: workExperience.find((item) => item.id === entry.experienceId),
  }));

  return (
    <>
      <PrintLightMode />

      <div className="print:hidden">
        <Nav />
      </div>

      <main
        id="main"
        className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8 print:max-w-none print:px-0 print:pb-0 print:pt-0"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-button font-mono text-mono-eyebrow uppercase tracking-widest text-mute transition-colors hover:text-ink focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
          >
            <ArrowLeft
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Back to portfolio
          </Link>

          <ResumeActions />
        </div>

        <article className="mt-12 print:mt-0">
          <header>
            <h1 className="text-[2rem] font-semibold leading-[1.05] tracking-tighter text-ink sm:text-5xl print:text-[26pt]">
              {resumeHeader.name}
            </h1>

            {/* A short accent rule under the name rather than a full-width one:
                it reads as a signature mark, and it is the only place on the
                page where the brand colour appears at size. */}
            <span
              aria-hidden="true"
              className="mt-4 block h-0.5 w-12 rounded-full bg-accent-brand print:hidden"
            />

            {/* Meta as discrete items rather than one dot-joined sentence — at
                375px the joined version wrapped mid-separator and left an
                orphaned "·" at the start of a line. */}
            <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-body-lg text-body print:mt-2 print:text-[11pt]">
              <li className="font-medium text-ink">{resumeHeader.title}</li>
              <li aria-hidden="true" className="text-faint">
                ·
              </li>
              <li className="inline-flex items-center gap-1.5">
                <MapPin
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-faint print:hidden"
                />
                {resumeHeader.location}
              </li>
              <li aria-hidden="true" className="text-faint">
                ·
              </li>
              <li>{resumeHeader.languages}</li>
            </ul>

            {/* The address is the payload and stays plain text for the ATS and
                for anyone reading this on paper; the icon only makes the row
                scannable on screen. */}
            <ul className="mt-5 flex flex-wrap gap-2 print:mt-3 print:gap-x-4 print:gap-y-1 print:text-[8.5pt]">
              {CONTACT.map(({ value, href, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="group inline-flex items-center gap-2 rounded-pill border border-hairline bg-canvas-elevated py-1.5 pl-2.5 pr-3.5 text-body-sm text-mute transition-colors hover:border-mute hover:text-ink focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas print:rounded-none print:border-0 print:bg-transparent print:p-0 print:text-mute"
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 text-faint transition-colors group-hover:text-accent-brand print:hidden"
                    />
                    <span className="break-all">{value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </header>

          {/* Three verified numbers, the same ones the homepage leads with.
              A CV is skimmed before it is read, and this is the only part of
              the page that survives a five-second skim. */}
          {/* Three across even at 375px. Stacked, these three short facts cost
              a third of a phone screen before the summary starts; side by side
              they stay one glanceable band and the labels just wrap. */}
          <dl className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-card border border-hairline bg-hairline print:hidden">
            {heroFacts.map((fact) => (
              <div
                key={fact.value}
                className="bg-canvas-elevated px-3 py-3.5 sm:px-5 sm:py-4"
              >
                <dt className="text-lg font-semibold tabular-nums tracking-tight text-ink sm:text-2xl">
                  {fact.value}
                </dt>
                <dd className="mt-1 text-body-sm leading-snug text-mute">
                  {fact.label}
                </dd>
              </div>
            ))}
          </dl>

          <ResumeSection title="Summary">
            {/* An accent rule down the left edge marks this as the one block
                worth reading in full when the rest is being skimmed. */}
            <p className="border-l-2 border-accent-brand pl-5 text-body-lg leading-relaxed text-body print:border-0 print:pl-0 print:text-[9.5pt]">
              {resumeSummary}
            </p>
          </ResumeSection>

          <ResumeSection title="Core technical skills">
            <SkillGroups groups={resumeSkills} />
          </ResumeSection>

          <ResumeSection title="Professional experience">
            {/* A rail down the left turns two separate role blocks into one
                career line, and gives the dates something to hang off. It is
                drawn on the <ol> rather than per item so it runs continuously
                through the gap between roles instead of restarting. */}
            <ol className="space-y-10 sm:relative sm:space-y-12 sm:before:absolute sm:before:bottom-2 sm:before:left-0.75 sm:before:top-2 sm:before:w-px sm:before:bg-hairline sm:print:before:hidden print:space-y-4">
              {roles.map((entry) =>
                entry.role ? (
                  <li
                    key={entry.experienceId}
                    className="sm:pl-8 print:break-inside-avoid print:pl-0"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 mt-2 hidden h-1.75 w-1.75 rounded-full bg-accent-brand ring-4 ring-canvas sm:block print:hidden"
                    />

                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1.5">
                      <h3 className="text-heading-md text-ink print:text-[11pt]">
                        {entry.role.title}
                        <span className="font-normal text-mute">
                          {" "}
                          — {entry.role.company}
                        </span>
                      </h3>

                      {/* Boxed on screen so the date reads as metadata rather
                          than as a trailing fragment of the heading; unboxed in
                          print, where a border around a date is just ink. */}
                      <p className="shrink-0 rounded-pill border border-hairline px-2.5 py-0.5 font-mono text-body-sm tabular-nums text-mute print:rounded-none print:border-0 print:px-0 print:py-0 print:text-[8.5pt]">
                        {entry.role.period} · {entry.city}
                      </p>
                    </div>

                    <p className="mt-2.5 text-body-sm leading-relaxed text-mute print:mt-1 print:text-[8.5pt]">
                      {entry.context}
                    </p>

                    <ul className="mt-4 space-y-2.5 print:mt-2 print:space-y-1">
                      {entry.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="grid grid-cols-[1rem_minmax(0,1fr)] text-body-md leading-relaxed text-body print:grid-cols-[0.75rem_minmax(0,1fr)] print:text-[9pt]"
                        >
                          {/* A small accent dash instead of a grey middot: at
                              body size the middot was almost invisible, so the
                              bullets read as an unbroken block of prose. */}
                          <span
                            aria-hidden="true"
                            className="mt-[0.6em] h-px w-2 self-start bg-accent-brand print:mt-0 print:h-auto print:w-auto print:bg-transparent print:text-faint"
                          >
                            <span className="hidden print:inline">·</span>
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : null
              )}
            </ol>
          </ResumeSection>

          <ResumeSection title="Selected projects">
            {/* Carded on screen so three projects of very different lengths
                still read as three peers; flattened in print, where borders
                cost a page break they don't earn. */}
            <ol className="grid gap-3 print:block print:space-y-3">
              {resumeProjects.map((project) => (
                <li
                  key={project.name}
                  className="rounded-card border border-hairline bg-canvas-elevated p-5 transition-colors hover:border-mute print:break-inside-avoid print:rounded-none print:border-0 print:bg-transparent print:p-0"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-heading-md text-ink print:text-[10.5pt]">
                      {project.name}
                    </h3>

                    {project.href ? (
                      <a
                        href={project.href}
                        className="group inline-flex items-center gap-1 rounded-button font-mono text-body-sm text-mute transition-colors hover:text-accent-brand focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-brand print:text-[8pt]"
                      >
                        <span className="break-all underline decoration-hairline underline-offset-4 print:no-underline">
                          {project.hrefLabel}
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-3 w-3 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 print:hidden"
                        />
                      </a>
                    ) : null}
                  </div>

                  <p className="mt-2 text-body-md leading-relaxed text-body print:mt-1.5 print:text-[9pt]">
                    {project.blurb}
                  </p>

                  {project.stack ? (
                    <p className="mt-3 font-mono text-body-sm text-faint print:mt-1.5 print:text-[8.5pt]">
                      {project.stack}
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>

            <p className="mt-5 text-body-sm text-mute print:mt-3 print:text-[8.5pt]">
              Full case studies at{" "}
              <a
                href={`${siteUrl}/work`}
                className="rounded-button text-body underline decoration-hairline underline-offset-4 transition-colors hover:text-accent-brand focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-brand print:no-underline print:text-mute"
              >
                {bareHost(siteUrl)}/work
              </a>
            </p>
          </ResumeSection>

          {/* TODO (Alireza): Education and any certifications. Not in the copy
              provided, and a CV section invented here would be fabrication — so
              it is omitted rather than stubbed. Add to data/resume.ts and a
              section here when you have it. */}
        </article>
      </main>
    </>
  );
}
