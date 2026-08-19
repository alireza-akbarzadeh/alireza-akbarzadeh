import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { projects } from "@/data/projects";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import Tag from "./ui/Tag";

/**
 * Projects render as a list rather than a card grid on purpose: a list reads as
 * a curated index, and it puts the problem each project solves — not a
 * thumbnail — in the first line.
 *
 * Rows link to the internal case study rather than straight out to GitHub. The
 * external link is one click further in, on the detail page, so a reviewer
 * reads the reasoning before landing in a source tree.
 */
const SelectedWork = () => (
  <Section
    id="projects"
    eyebrow="Selected work"
    title="Six projects, and what each one had to solve"
    lede="Production platforms and the side projects where I get to push architecture further than a job usually allows. Each one has a full write-up."
  >
    <Reveal stagger as="ul" className="border-t border-hairline">
      {projects.map((project, index) => (
        <li key={project.slug} className="group border-b border-hairline">
          <Link
            href={`/work/${project.slug}`}
            className="grid gap-x-8 gap-y-5 py-10 md:grid-cols-[3rem_minmax(0,1fr)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
          >
            <span
              aria-hidden="true"
              className="hidden font-mono text-body-sm tabular-nums text-faint md:block md:pt-2"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h3 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                  {project.title}
                </h3>

                <span className="inline-flex items-center gap-1.5 font-mono text-body-sm text-mute transition-colors group-hover:text-accent-brand">
                  Read case study
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </div>

              <p className="mt-2 font-mono text-body-sm text-faint">
                {project.year} · {project.role}
              </p>

              <p className="mt-4 max-w-2xl text-body-md leading-relaxed text-body">
                {project.summary}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </ul>
            </div>
          </Link>
        </li>
      ))}
    </Reveal>
  </Section>
);

export default SelectedWork;
