"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Project } from "@/data/projects";
import TechLogo from "../ui/TechLogo";
import ProjectMotif from "./ProjectMotif";

/**
 * One row of the selected-work index.
 *
 * Extracted from SelectedWork so the list itself can stay a server component
 * and only the interactive part crosses the client boundary — the row's content
 * is still rendered on the server, this file adds behaviour to it.
 *
 * The hover treatment is a pointer-tracked highlight: a wide, very low-opacity
 * radial wash that follows the cursor across the row, plus the motif lifting
 * slightly and the index number taking the accent. Individually each is almost
 * subliminal; together they make a flat list of text feel like a surface that
 * responds. The row is also a `data-cursor` target, so the contextual cursor
 * picks up "Read case study" while it is over one.
 *
 * The pointer position is written to CSS custom properties rather than to React
 * state. A row under the cursor fires pointermove at frame rate, and putting
 * that through a state update would re-render the row — and its seven tech
 * chips and 364-circle motif — sixty times a second to move a gradient.
 */
const ProjectRow = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  // Measured on entry, not per move: getBoundingClientRect forces layout, and
  // this element sits inside a page with several ScrollTriggers already reading
  // geometry.
  const bounds = useRef({ left: 0, top: 0 });

  const onPointerEnter = () => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) bounds.current = { left: rect.left, top: rect.top };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLLIElement>) => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--px", `${event.clientX - bounds.current.left}px`);
    node.style.setProperty("--py", `${event.clientY - bounds.current.top}px`);
  };

  return (
    <li
      ref={ref}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      data-cursor="Read case study"
      className="group relative overflow-hidden border-b border-hairline"
    >
      {/* Sits under the content and outside the link, so it can never intercept
          a click or a focus ring. Hidden entirely from coarse pointers, where
          there is no hover state for it to belong to. */}
      <span
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(26rem circle at var(--px, 50%) var(--py, 50%), hsl(var(--accent-brand) / 0.07), transparent 62%)",
        }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out-quart group-hover:opacity-100 motion-reduce:transition-none max-[1023px]:hidden"
      />

      <Link
        href={`/work/${project.slug}`}
        className="relative grid gap-x-8 gap-y-5 py-10 md:grid-cols-[3rem_minmax(0,1fr)] lg:grid-cols-[3rem_minmax(0,1fr)_14rem] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
      >
        <span
          aria-hidden="true"
          className="hidden font-mono text-body-sm tabular-nums text-faint transition-colors duration-300 group-hover:text-accent-brand md:block md:pt-2"
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
              <TechLogo key={tech} name={tech} />
            ))}
          </ul>
        </div>

        {/* Generated per project, not a screenshot stand-in — see ProjectMotif.
            It gives the row a visual anchor and makes the list scannable by
            shape as well as by title. Hidden below lg: at narrow widths it
            would push the actual content down. */}
        <div className="hidden self-center overflow-hidden rounded-card border border-hairline bg-canvas-elevated transition-colors duration-300 group-hover:border-hairline-soft lg:block">
          <div className="aspect-[16/10] p-1 opacity-80 transition-[opacity,transform] duration-500 ease-out-quart group-hover:scale-[1.03] group-hover:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
            <ProjectMotif slug={project.slug} />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProjectRow;
