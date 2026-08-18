import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import { getProject } from "@/data/projects";
import Section from "./ui/Section";
import SectionGrid from "./ui/SectionGrid";

/**
 * The home page leads with one worked example rather than summarising all of
 * them. It reads from the same project record the detail page uses, so the two
 * can't tell different stories about the same work.
 */
const FEATURED_SLUG = "tapsi-shop";

const CaseStudy = () => {
  const project = getProject(FEATURED_SLUG);
  if (!project) notFound();

  return (
    <Section
      id="case-study"
      eyebrow={`Case study · ${project.title}`}
      title={project.tagline}
      lede={project.context}
    >
      {/* No screenshot here by design. The only asset available
          (public/tapsi.png) is a full-page capture of a marketing banner —
          cropped to any sensible aspect it shows a promo graphic, not the
          architecture this section argues for, and its bright fill fights the
          palette. An architecture diagram or a capture of the admin/vendor
          panels would earn the space; a storefront promo does not. */}
      <SectionGrid sections={project.sections} />

      <a
        href={`/work/${project.slug}`}
        className="group mt-8 inline-flex items-center gap-1.5 rounded-button font-mono text-body-sm text-mute transition-colors hover:text-accent-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
      >
        Read the full case study
        <ArrowUpRight
          aria-hidden="true"
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>
    </Section>
  );
};

export default CaseStudy;
