import { projects } from "@/data/projects";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import ProjectRow from "./work/ProjectRow";

/**
 * Projects render as a list rather than a card grid on purpose: a list reads as
 * a curated index, and it puts the problem each project solves — not a
 * thumbnail — in the first line.
 *
 * Rows link to the internal case study rather than straight out to GitHub. The
 * external link is one click further in, on the detail page, so a reviewer
 * reads the reasoning before landing in a source tree.
 *
 * The row itself is a client component (see ProjectRow) because it carries the
 * pointer-tracked hover treatment. Everything above it — the section, the
 * heading, the ordering — stays on the server.
 */
const SelectedWork = () => (
  <Section
    id="projects"
    eyebrow="Selected work"
    title={`${projects.length} projects, and what each one had to solve`}
    lede="Production platforms and the side projects where I get to push architecture further than a job usually allows. Each one has a full write-up."
  >
    <Reveal stagger as="ul" className="border-t border-hairline">
      {projects.map((project, index) => (
        <ProjectRow key={project.slug} project={project} index={index} />
      ))}
    </Reveal>
  </Section>
);

export default SelectedWork;
