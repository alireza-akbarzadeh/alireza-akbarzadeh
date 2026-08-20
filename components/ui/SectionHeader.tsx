"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { DURATION, EASE, REVEAL_START, STAGGER } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Every section's eyebrow, heading and lede, revealed as one choreographed
 * beat instead of three independent fades.
 *
 * Two things this replaces. The first is uniformity: previously the whole
 * header block was wrapped in a single `Reveal`, so the eyebrow, a 32px heading
 * and the lede all arrived together, at the same opacity, over the same 0.8s,
 * with no hierarchy between them — which is most of why the page read as static
 * despite technically animating. The second is trigger count: one timeline with
 * one ScrollTrigger per section, rather than one per element.
 *
 * The heading gets a masked word reveal — each word sits in an `overflow-hidden`
 * box and slides up from below its own baseline, so the type is *uncovered*
 * rather than faded in. That is the only piece of typographic motion on the page
 * outside the hero, and it is reserved for the h2 deliberately.
 */

/**
 * Masking clips descenders — the `y` in "Where I've done the work" would lose
 * its tail — so each box gets a descender's worth of extra height and is then
 * pulled back out of the layout by the same amount. `align-bottom` keeps the
 * boxes on the heading's own baseline, which is what stops the mask from
 * shifting the heading down relative to how it renders without JavaScript.
 */
const Words = ({ text }: { text: string }) => (
  <>
    {text.split(" ").map((word, index, all) => (
      // The space lives between the boxes, not inside them. Inside, it would sit
      // at the end of that box's own line and be trimmed away, jamming the words
      // together; outside it is ordinary inter-element whitespace — one space
      // wide, and still a legal place for the heading to wrap.
      <span key={`${word}-${index}`}>
        <span className="inline-block overflow-hidden pb-[0.12em] mb-[-0.12em] align-bottom">
          <span data-word className="inline-block">
            {word}
          </span>
        </span>
        {index < all.length - 1 ? " " : null}
      </span>
    ))}
  </>
);

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
};

export const SectionHeader = ({ eyebrow, title, lede }: SectionHeaderProps) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Reduced motion: the server-rendered markup is already in place and at
      // full opacity, so the correct behaviour is to run nothing at all. This
      // branch exists to make that explicit rather than incidental.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-word], [data-header]", {
          opacity: 1,
          y: 0,
          yPercent: 0,
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: REVEAL_START,
            once: true,
          },
        });

        timeline
          .from("[data-header='eyebrow']", {
            opacity: 0,
            y: 10,
            duration: DURATION.base,
            ease: EASE.out,
          })
          .from(
            "[data-word]",
            {
              yPercent: 110,
              duration: DURATION.reveal,
              ease: EASE.display,
              stagger: STAGGER.tight,
            },
            "-=0.28"
          )
          .from(
            "[data-header='lede']",
            {
              opacity: 0,
              y: 14,
              duration: DURATION.base,
              ease: EASE.out,
            },
            "-=0.45"
          );

        return () => timeline.kill();
      });
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <p
        data-header="eyebrow"
        className="text-mono-eyebrow font-mono uppercase tracking-widest text-mute"
      >
        {eyebrow}
      </p>

      <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-ink md:text-heading-lg">
        {/* Only a plain string can be split into words safely. A ReactNode
            title still renders — it just doesn't get the word reveal, which is
            the honest fallback rather than a mangled tree. */}
        {typeof title === "string" ? <Words text={title} /> : title}
      </h2>

      {lede ? (
        <p
          data-header="lede"
          className="mt-5 max-w-2xl text-body-lg leading-relaxed text-body"
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
};

export default SectionHeader;
