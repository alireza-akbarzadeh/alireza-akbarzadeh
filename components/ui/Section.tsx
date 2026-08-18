import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

type SectionProps = {
  id: string;
  /** Uppercase mono label above the heading. See DESIGN.md → mono-eyebrow. */
  eyebrow: string;
  title: ReactNode;
  /** Optional intro paragraph, constrained to a readable measure. */
  lede?: ReactNode;
  children: ReactNode;
  className?: string;
};

/**
 * The shell every content section shares: consistent vertical rhythm, a mono
 * eyebrow, and one heading level. Sections differ in their *body* treatment,
 * not in how they announce themselves — that consistency is what makes the
 * page read as one product rather than eight separate templates.
 */
export const Section = ({
  id,
  eyebrow,
  title,
  lede,
  children,
  className,
}: SectionProps) => (
  <section id={id} className={cn("scroll-mt-24 py-24 md:py-32", className)}>
    <Reveal>
      <p className="text-mono-eyebrow font-mono uppercase tracking-widest text-mute">
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-ink md:text-heading-lg">
        {title}
      </h2>
      {lede ? (
        <p className="mt-5 max-w-2xl text-body-lg leading-relaxed text-body">
          {lede}
        </p>
      ) : null}
    </Reveal>

    <div className="mt-12 md:mt-16">{children}</div>
  </section>
);

export default Section;
