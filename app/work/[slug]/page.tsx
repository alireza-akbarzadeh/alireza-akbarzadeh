import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { contactEmail } from "@/data";
import { getProject, projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/ui/Reveal";
import SectionGrid, { sectionAnchorId } from "@/components/ui/SectionGrid";
import ReadingProgress from "@/components/ui/ReadingProgress";
import CaseStudyRail from "@/components/work/CaseStudyRail";
import ArchitectureDiagram from "@/components/work/ArchitectureDiagram";
import ProjectMotif from "@/components/work/ProjectMotif";
import ProjectShots from "@/components/work/ProjectShots";
import Tag from "@/components/ui/Tag";
import { button } from "@/components/ui/Button";

type Params = { params: Promise<{ slug: string }> };

/** Every project is known at build time, so all detail pages prerender. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.title} — ${project.tagline}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title,
      description: project.summary,
      url: `/work/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  // Derived from the project record, so a project with a different set of
  // breakdown panels gets a matching index without touching this file.
  const railItems = [
    { id: "overview", label: "Overview" },
    ...project.sections.map((section) => ({
      id: sectionAnchorId("breakdown", section),
      label: section.label,
    })),
    ...(project.architecture
      ? [{ id: "project-architecture", label: "Architecture" }]
      : []),
    ...(project.shots?.length
      ? [{ id: "project-screens", label: "Screens" }]
      : []),
    { id: "project-stack-section", label: "Stack" },
  ];

  return (
    <>
      <Nav />
      <ReadingProgress targetId="case-study-article" />
      <main id="main" className="mx-auto max-w-6xl px-5 sm:px-8">
        <article id="case-study-article" className="pt-32 md:pt-40">
          <Reveal>
            <Link
              href="/#projects"
              className="group inline-flex items-center gap-2 rounded-button font-mono text-mono-eyebrow uppercase tracking-widest text-mute transition-colors hover:text-ink focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
            >
              <ArrowLeft
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              All work
            </Link>

            <h1 className="mt-8 max-w-4xl text-[2.5rem] font-semibold leading-[1.05] tracking-tighter text-ink sm:text-6xl">
              {project.title}
            </h1>

            <p className="mt-6 max-w-3xl text-body-lg leading-relaxed text-body">
              {project.tagline}
            </p>
          </Reveal>

          {/* Scannable metadata strip — the facts a reviewer checks first. */}
          <Reveal
            as="dl"
            className="mt-14 grid grid-cols-1 border-t border-hairline sm:grid-cols-3"
          >
            {[
              { term: "Role", value: project.role },
              { term: "Year", value: project.year },
              { term: "Status", value: project.status },
            ].map((item, i) => (
              <div
                key={item.term}
                className={cn(
                  "py-5 sm:px-6 sm:first:pl-0",
                  i > 0 && "border-t border-hairline sm:border-l sm:border-t-0"
                )}
              >
                <dt className="font-mono text-mono-eyebrow uppercase tracking-widest text-mute">
                  {item.term}
                </dt>
                <dd className="mt-2 text-body-md text-ink">{item.value}</dd>
              </div>
            ))}
          </Reveal>

          {/* A banner band rather than a screenshot: it gives the page a
              visual opening and matches this project's social card exactly, so
              a shared link and the page behind it read as one object. */}
          <Reveal className="mt-14 overflow-hidden rounded-panel border border-hairline bg-canvas-elevated">
            <div className="aspect-[21/6] p-2 opacity-80">
              <ProjectMotif slug={project.slug} cols={44} rows={13} />
            </div>
          </Reveal>

          <Reveal id="overview" className="mt-14 max-w-3xl scroll-mt-28">
            <p className="text-body-lg leading-relaxed text-body">
              {project.context}
            </p>
          </Reveal>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={button({ variant: "secondary", shape: "pill" })}
              >
                {link.label}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ))}
          </div>

          <div className="mt-20 gap-16 md:mt-24 lg:grid lg:grid-cols-[minmax(0,1fr)_13rem] lg:items-start">
            <div className="lg:order-first">
              <section aria-labelledby="project-breakdown">
                <h2
                  id="project-breakdown"
                  className="font-mono text-mono-eyebrow uppercase tracking-widest text-mute"
                >
                  The breakdown
                </h2>
                <SectionGrid
                  sections={project.sections}
                  idPrefix="breakdown"
                  className="mt-6"
                />
              </section>

              {project.architecture ? (
                <section
                  aria-labelledby="project-architecture-heading"
                  className="mt-20 scroll-mt-28 md:mt-24"
                  id="project-architecture"
                >
                  <h2
                    id="project-architecture-heading"
                    className="font-mono text-mono-eyebrow uppercase tracking-widest text-mute"
                  >
                    Architecture
                  </h2>
                  <ArchitectureDiagram
                    spec={project.architecture}
                    className="mt-6"
                  />
                </section>
              ) : null}

              {project.shots?.length ? (
                <section
                  aria-labelledby="project-screens-heading"
                  className="mt-20 scroll-mt-28 md:mt-24"
                  id="project-screens"
                >
                  <h2
                    id="project-screens-heading"
                    className="font-mono text-mono-eyebrow uppercase tracking-widest text-mute"
                  >
                    Screens
                  </h2>
                  <ProjectShots shots={project.shots} className="mt-6" />
                </section>
              ) : null}

              <section
                aria-labelledby="project-stack"
                className="mt-20 scroll-mt-28 md:mt-24"
                id="project-stack-section"
              >
                <h2
                  id="project-stack"
                  className="font-mono text-mono-eyebrow uppercase tracking-widest text-mute"
                >
                  Stack
                </h2>

                <Reveal stagger className="mt-6 grid gap-5 md:grid-cols-2">
                  {project.stackDetail.map((group) => (
                    <div
                      key={group.group}
                      className="rounded-card border border-hairline bg-canvas-elevated p-6"
                    >
                      <h3 className="text-heading-md text-ink">{group.group}</h3>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <Tag key={item}>{item}</Tag>
                        ))}
                      </ul>
                    </div>
                  ))}
                </Reveal>
              </section>
            </div>

            <CaseStudyRail items={railItems} />
          </div>
        </article>

        {/* Keep the reader moving rather than dead-ending the page. */}
        <nav
          aria-label="Next project"
          className="mt-24 border-t border-hairline py-10 md:mt-32"
        >
          <Link
            href={`/work/${next.slug}`}
            className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 rounded-button focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
          >
            <span className="font-mono text-mono-eyebrow uppercase tracking-widest text-mute">
              Next project
            </span>
            <span className="inline-flex items-center gap-2 text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent-brand md:text-3xl">
              {next.title}
              <ArrowUpRight
                aria-hidden="true"
                className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </nav>

        <section className="border-t border-hairline py-20 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-heading-lg">
            Want the longer version?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-body-md leading-relaxed text-body">
            Happy to walk through any of the decisions here — including the ones
            that turned out to be wrong.
          </p>
          <a
            href={`mailto:${contactEmail}`}
            className={`${button({ variant: "primary", shape: "pill" })} mt-8`}
          >
            Get in touch
          </a>
        </section>

        <Footer />
      </main>
    </>
  );
}
