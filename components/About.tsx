import { principles } from "@/data";
import Reveal from "./ui/Reveal";

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
        <Reveal>
          <h2 className="heading text-start">
            How I think about <span className="text-purple">frontend</span>
          </h2>
          <div className="mt-8 space-y-5 text-sm leading-relaxed text-white-200 md:text-base">
            <p>
              I started where most people do — making screens look right. Six
              years in, the part that decides whether a product survives is
              rarely the screen. It&apos;s whether the next engineer can add a
              feature without breaking three others.
            </p>
            <p>
              So that&apos;s where I work now: module boundaries, state
              ownership, rendering strategy, and the standards that hold a
              codebase together as the team grows. Currently doing that across a
              storefront, an admin panel and a vendor panel at Tapsi Shop.
            </p>
            <p>
              Outside work I build things that push further than a job usually
              lets you — an in-browser IDE running real Node, a streaming
              platform where every architectural decision is written down as an
              ADR.
            </p>
          </div>
        </Reveal>

        <Reveal stagger className="grid gap-4 sm:grid-cols-2 self-start">
          {principles.map((principle) => (
            <article
              key={principle.id}
              className="rounded-2xl border border-white/[0.08] bg-black-200/40 p-5 transition-colors hover:border-purple/40"
            >
              <h3 className="text-base font-semibold text-white">
                {principle.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white-200">
                {principle.body}
              </p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default About;
