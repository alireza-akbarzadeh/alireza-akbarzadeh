import { caseStudy } from "@/data";
import Reveal from "./ui/Reveal";

const CaseStudy = () => {
  return (
    <section id="case-study" className="py-20">
      <Reveal className="max-w-3xl">
        <p className="text-xs uppercase tracking-widest text-purple">
          {caseStudy.eyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          {caseStudy.title}
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-white-200 md:text-base">
          {caseStudy.context}
        </p>
      </Reveal>

      <Reveal stagger className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] md:grid-cols-2">
        {caseStudy.sections.map((section) => (
          <article key={section.id} className="bg-black-100 p-6 md:p-8">
            <h3 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-purple">
              <span className="text-white/25">
                {String(section.id).padStart(2, "0")}
              </span>
              {section.label}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white-200">
              {section.body}
            </p>
          </article>
        ))}
      </Reveal>
    </section>
  );
};

export default CaseStudy;
