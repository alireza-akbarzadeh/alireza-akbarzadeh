import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import SectionHeader from "./SectionHeader";

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
 *
 * The header's motion lives in SectionHeader, which is the only client code
 * this shell pulls in; the section element and its children stay on the server.
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
    <SectionHeader eyebrow={eyebrow} title={title} lede={lede} />

    <div className="mt-12 md:mt-16">{children}</div>
  </section>
);

export default Section;
