import Image from "next/image";

import { portrait, principles } from "@/data";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";

const About = () => (
  <Section id="about" eyebrow="About" title="How I think about frontend">
    <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
      <Reveal className="space-y-5 text-body-lg leading-relaxed text-body">
        {portrait ? (
          <div className="mb-8 overflow-hidden rounded-card border border-hairline">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              width={720}
              height={720}
              sizes="(min-width: 1024px) 30vw, 92vw"
              className="h-auto w-full"
              priority={false}
            />
          </div>
        ) : null}

        <p>
          I started where most people do — making screens look right. Six years
          in, the part that decides whether a product survives is rarely the
          screen. It&apos;s whether the next engineer can add a feature without
          breaking three others.
        </p>
        <p>
          So that&apos;s where I work now: module boundaries, state ownership,
          rendering strategy, and the standards that hold a codebase together as
          the team grows. Currently doing that across a storefront, an admin
          panel and a vendor panel at Tapsi Shop.
        </p>
        <p>
          Outside work I build things that push further than a job usually lets
          you — an in-browser IDE running real Node, a streaming platform where
          every architectural decision is written down as an ADR.
        </p>
      </Reveal>

      {/* Principles read as a numbered list rather than cards: this section
          already carries prose, and a second card grid here would flatten the
          page's rhythm against Work, Stack and the case study. */}
      <Reveal stagger as="ol" className="self-start border-t border-hairline">
        {principles.map((principle, index) => (
          <li
            key={principle.id}
            className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 border-b border-hairline py-6"
          >
            <span
              aria-hidden="true"
              className="font-mono text-body-sm tabular-nums text-faint"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-heading-md text-ink">{principle.title}</h3>
              <p className="mt-2 text-body-md leading-relaxed text-body">
                {principle.body}
              </p>
            </div>
          </li>
        ))}
      </Reveal>
    </div>
  </Section>
);

export default About;
