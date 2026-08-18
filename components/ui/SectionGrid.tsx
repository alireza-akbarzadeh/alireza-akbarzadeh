import type { ProjectSection } from "@/data/projects";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

/**
 * The numbered Problem / Approach / Trade-offs / Result grid, shared by the
 * home-page case study and every project detail page so the two never drift.
 *
 * A 1px hairline grid: the gap itself is the border, so the panels read as one
 * object rather than as separate cards.
 */
export const SectionGrid = ({
  sections,
  className,
}: {
  sections: ProjectSection[];
  className?: string;
}) => (
  <Reveal
    stagger
    className={cn(
      "grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline md:grid-cols-2",
      className
    )}
  >
    {sections.map((section, index) => {
      // The outcome is the part a reader is looking for — it gets the accent.
      const isResult = section.label === "Result";
      // With an odd count the two-column grid would leave a hole in the last
      // row, and because the gap *is* the border that hole renders as a stray
      // panel. Span the final item instead. Most projects have three sections,
      // so this is the common case, not the edge case.
      const spansRow =
        sections.length % 2 === 1 && index === sections.length - 1;

      return (
        <article
          key={section.id}
          className={cn(
            "bg-canvas-elevated p-6 md:p-8",
            spansRow && "md:col-span-2"
          )}
        >
          <h3 className="flex items-center gap-3 font-mono text-mono-eyebrow uppercase tracking-widest">
            <span aria-hidden="true" className="tabular-nums text-faint">
              {String(section.id).padStart(2, "0")}
            </span>
            <span className={isResult ? "text-accent-brand" : "text-mute"}>
              {section.label}
            </span>
          </h3>
          <p className="mt-4 text-body-md leading-relaxed text-body">
            {section.body}
          </p>
        </article>
      );
    })}
  </Reveal>
);

export default SectionGrid;
