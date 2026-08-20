import { cn } from "@/lib/utils";

/**
 * A CV section and its heading.
 *
 * The heading was previously a grey mono label above a full-width rule, which
 * gave all five sections exactly the same weight — the page read as one
 * undifferentiated column. This version marks each one with the brand accent
 * and lets the rule run out to the right of the label, so a skimming eye can
 * find section boundaries without reading them.
 *
 * Print gets the plain rule back: the accent token resolves to black on paper
 * (see globals.css → @media print), and a black square before every heading is
 * noise rather than structure once the colour is gone.
 */
export const ResumeSection = ({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={cn("mt-12 print:mt-6", className)}>
    <h2 className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 shrink-0 rounded-[1px] bg-accent-brand print:hidden"
      />
      <span className="font-mono text-mono-eyebrow uppercase tracking-widest text-ink print:text-mute">
        {title}
      </span>
      <span aria-hidden="true" className="h-px flex-1 bg-hairline" />
    </h2>

    <div className="mt-5 print:mt-3">{children}</div>
  </section>
);

export default ResumeSection;
