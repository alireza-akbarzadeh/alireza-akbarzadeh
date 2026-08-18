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
import SectionGrid from "@/components/ui/SectionGrid";
import Tag from "@/components/ui/Tag";
import { button } from "@/components/ui/Button";

type Params = { params: { slug: string } };

/** Every project is known at build time, so all detail pages prerender. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const project = getProject(params.slug);
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

export default function ProjectPage({ params }: Params) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-6xl px-5 sm:px-8">
        <article className="pt-32 md:pt-40">
          <Reveal>
            <Link
              href="/#projects"
              className="group inline-flex items-center gap-2 rounded-button font-mono text-mono-eyebrow uppercase tracking-widest text-mute transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
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

          <Reveal className="mt-14 max-w-3xl">
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

          <section aria-labelledby="project-breakdown" className="mt-20 md:mt-24">
            <h2
              id="project-breakdown"
              className="font-mono text-mono-eyebrow uppercase tracking-widest text-mute"
            >
              The breakdown
            </h2>
            <SectionGrid sections={project.sections} className="mt-6" />
          </section>

          <section aria-labelledby="project-stack" className="mt-20 md:mt-24">
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
        </article>

        {/* Keep the reader moving rather than dead-ending the page. */}
        <nav
          aria-label="Next project"
          className="mt-24 border-t border-hairline py-10 md:mt-32"
        >
          <Link
            href={`/work/${next.slug}`}
            className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 rounded-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
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
