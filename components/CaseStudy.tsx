import { caseStudy } from "@/data";
import { cn } from "@/lib/utils";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";

const CaseStudy = () => (
  <Section
    id="case-study"
    eyebrow={caseStudy.eyebrow}
    title={caseStudy.title}
    lede={caseStudy.context}
  >
    {/* No screenshot here by design. The only asset available (public/tapsi.png)
        is a full-page capture of a marketing banner — cropped to any sensible
        aspect it shows a promo graphic, not the architecture this section
        argues for, and its bright fill fights the palette. An architecture
        diagram or a capture of the admin/vendor panels would earn the space;
        a storefront promo does not. */}

    {/* A 1px hairline grid: the gap itself is the border, so four panels read as
        one object rather than four separate cards. */}
    <Reveal
      stagger
      className="grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline md:grid-cols-2"
    >
      {caseStudy.sections.map((section) => {
        const isResult = section.label === "Result";
        return (
          <article key={section.id} className="bg-canvas-elevated p-6 md:p-8">
            <h3 className="flex items-center gap-3 font-mono text-mono-eyebrow uppercase tracking-widest">
              <span aria-hidden="true" className="tabular-nums text-faint">
                {String(section.id).padStart(2, "0")}
              </span>
              <span className={cn(isResult ? "text-accent-brand" : "text-mute")}>
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
  </Section>
);

export default CaseStudy;
