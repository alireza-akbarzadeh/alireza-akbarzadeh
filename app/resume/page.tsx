import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { contactEmail, socialMedia, workExperience } from "@/data";
import {
  resumeHeader,
  resumeProjects,
  resumeRoles,
  resumeSkills,
  resumeSummary,
} from "@/data/resume";
import { siteUrl } from "@/lib/site";
import Nav from "@/components/Nav";
import PrintLightMode from "@/components/resume/PrintLightMode";
import ResumeActions from "@/components/resume/ResumeActions";

export const metadata: Metadata = {
  title: "CV — Alireza Akbarzadeh",
  description: resumeSummary.slice(0, 155),
  alternates: { canonical: "/resume" },
  // A CV competes with the homepage for the same queries while saying less, so
  // it stays out of the index — but the links on it should still be followed.
  robots: { index: false, follow: true },
};

const bareHost = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

const CONTACT = [
  { value: contactEmail, href: `mailto:${contactEmail}` },
  ...socialMedia.map((social) => ({
    value: bareHost(social.href),
    href: social.href,
  })),
  { value: bareHost(siteUrl), href: siteUrl },
];

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="border-b border-hairline pb-2 font-mono text-mono-eyebrow uppercase tracking-widest text-mute">
    {children}
  </h2>
);

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
            <h1 className="text-[2rem] font-semibold leading-tight tracking-tighter text-ink sm:text-5xl print:text-[26pt]">
              {resumeHeader.name}
            </h1>
            <p className="mt-3 text-body-lg text-body print:text-[11pt]">
              {resumeHeader.title} · {resumeHeader.location} ·{" "}
              {resumeHeader.languages}
            </p>

            {/* Plain text, not icons: an ATS reads the string, and a printed
                page has no hover to reveal a destination. */}
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-body-sm print:gap-x-4 print:text-[8.5pt]">
              {CONTACT.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded-button text-mute underline decoration-hairline underline-offset-4 transition-colors hover:text-accent-brand focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-brand print:no-underline"
                  >
                    {link.value}
                  </a>
                </li>
              ))}
            </ul>
          </header>

          <section className="mt-10 print:mt-6">
            <SectionHeading>Summary</SectionHeading>
            <p className="mt-4 text-body-md leading-relaxed text-body print:text-[9.5pt]">
              {resumeSummary}
            </p>
          </section>

          <section className="mt-10 print:mt-6">
            <SectionHeading>Core technical skills</SectionHeading>
            <dl className="mt-4 space-y-2.5 print:space-y-1.5">
              {resumeSkills.map((group) => (
                <div
                  key={group.label}
                  className="grid gap-x-5 gap-y-0.5 sm:grid-cols-[10.5rem_minmax(0,1fr)] print:break-inside-avoid print:text-[9pt]"
                >
                  <dt className="text-body-md font-medium text-ink print:text-[9pt]">
                    {group.label}
                  </dt>
                  <dd className="text-body-md leading-relaxed text-body print:text-[9pt]">
                    {group.items}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-10 print:mt-6">
            <SectionHeading>Professional experience</SectionHeading>

            <ol className="mt-5 space-y-8 print:space-y-4">
              {roles.map((entry) =>
                entry.role ? (
                  <li key={entry.experienceId} className="print:break-inside-avoid">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="text-heading-md text-ink print:text-[11pt]">
                        {entry.role.title}
                        <span className="font-normal text-mute">
                          {" "}
                          — {entry.role.company}
                        </span>
                      </h3>
                      <p className="font-mono text-body-sm text-mute print:text-[8.5pt]">
                        {entry.role.period} · {entry.city}
                      </p>
                    </div>

                    <p className="mt-2 text-body-sm leading-relaxed text-mute print:text-[8.5pt]">
                      {entry.context}
                    </p>

                    <ul className="mt-3 space-y-2 print:mt-2 print:space-y-1">
                      {entry.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="grid grid-cols-[0.75rem_minmax(0,1fr)] text-body-md leading-relaxed text-body print:text-[9pt]"
                        >
                          <span aria-hidden="true" className="text-faint">
                            ·
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : null
              )}
            </ol>
          </section>

          <section className="mt-10 print:mt-6">
            <SectionHeading>Selected projects</SectionHeading>

            <ol className="mt-5 space-y-5 print:space-y-3">
              {resumeProjects.map((project) => (
                <li key={project.name} className="print:break-inside-avoid">
                  <h3 className="text-heading-md text-ink print:text-[10.5pt]">
                    {project.name}
                    {project.href ? (
                      <>
                        {" "}
                        <a
                          href={project.href}
                          className="rounded-button font-mono text-body-sm font-normal text-mute underline decoration-hairline underline-offset-4 transition-colors hover:text-accent-brand focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-brand print:text-[8pt] print:no-underline"
                        >
                          {project.hrefLabel}
                        </a>
                      </>
                    ) : null}
                  </h3>
                  <p className="mt-1.5 text-body-md leading-relaxed text-body print:text-[9pt]">
                    {project.blurb}
                  </p>
                  {project.stack ? (
                    <p className="mt-1.5 font-mono text-body-sm text-faint print:text-[8.5pt]">
                      {project.stack}
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>

            <p className="mt-5 text-body-sm text-mute print:text-[8.5pt]">
              Full case studies at {bareHost(siteUrl)}/work
            </p>
          </section>

          {/* TODO (Alireza): Education and any certifications. Not in the copy
              provided, and a CV section invented here would be fabrication — so
              it is omitted rather than stubbed. Add to data/resume.ts and a
              section here when you have it. */}
        </article>
      </main>
    </>
  );
}
