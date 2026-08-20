"use client";

import { useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { contactEmail, heroFacts } from "@/data";
import { DURATION, EASE, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";
import HeroCanvas from "./hero/HeroCanvas";
import { button } from "./ui/Button";
import CountUp from "./ui/CountUp";
import MagneticButton from "./ui/MagneticButton";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * `min(100svh, 54rem)` rather than a bare `100svh`.
 *
 * On a laptop the two are identical and the hero fills the fold. On a tall
 * window — 1440x1630 is unremarkable on a large display — an uncapped 100svh
 * stretched this section to 1630px and centred ~700px of content inside it,
 * marooning the headline in a void with 460px of dead canvas above and below.
 * Capping the stretch spends the extra height on showing the top of the next
 * section instead, which is also the strongest scroll cue available.
 *
 * It stays a *min*-height, so content that outgrows the cap — large text
 * settings, browser zoom — pushes the section taller rather than overflowing it.
 */
const HERO_HEIGHT =
  "relative isolate flex min-h-[min(100svh,54rem)] flex-col pt-28 pb-10 md:pt-32 md:pb-12";

/**
 * One line of the headline, in two nested elements.
 *
 * The outer span is the mask and the inner one is what moves: sliding the inner
 * span up from below its own box makes the line appear to be uncovered rather
 * than to fade in, which is the difference between type that arrives and type
 * that is simply there. `overflow-hidden` on a line box also clips descenders —
 * "stay" and "change" both have one — so the mask is given a descender's worth
 * of extra height and then pulled back out of the layout by the same amount.
 */
const Line = ({ children }: { children: React.ReactNode }) => (
  <span className="block overflow-hidden pb-[0.12em] mb-[-0.12em]">
    <span data-animate="line" className="block">
      {children}
    </span>
  </span>
);

const Hero = () => {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Respect the OS setting: reveal everything, skip the choreography.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-animate]", { opacity: 1, y: 0, yPercent: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: EASE.out, duration: 0.9 },
        });

        tl.from("[data-animate='eyebrow']", {
          opacity: 0,
          y: 12,
          duration: DURATION.base,
        })
          // power4 and a long duration on the headline only: this is the one
          // element allowed to take its time, and the deep ease is what keeps a
          // 100px+ line from feeling like it slams into place.
          .from(
            "[data-animate='line']",
            {
              yPercent: 112,
              duration: DURATION.display,
              ease: EASE.display,
              stagger: STAGGER.loose,
            },
            "-=0.2"
          )
          .from("[data-animate='lede']", { opacity: 0, y: 18 }, "-=0.75")
          .from(
            "[data-animate='cta']",
            { opacity: 0, y: 16, stagger: STAGGER.base },
            "-=0.7"
          )
          .from(
            "[data-animate='fact']",
            { opacity: 0, y: 14, stagger: STAGGER.base },
            "-=0.7"
          )
          .from(
            "[data-animate='scroll']",
            { opacity: 0, duration: DURATION.base },
            "-=0.4"
          );

        /**
         * The headline block drifts up and dissolves as the fold is scrolled
         * past, so the hero hands off to the page rather than sliding out of it
         * rigidly. Scrubbed, not triggered — it is tied to scroll position, so
         * scrolling back up puts it exactly where it was.
         *
         * Only the headline block moves. The proof rail below it holds its
         * position, which is what keeps the numbers legible right up to the
         * moment they leave the viewport.
         */
        const parallax = gsap.to("[data-hero-content]", {
          yPercent: -14,
          opacity: 0.18,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });

        return () => {
          tl.kill();
          parallax.kill();
        };
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="top" className={HERO_HEIGHT}>
      <HeroCanvas />

      {/* The headline block is optically centred in whatever height is left over
          once the fixed nav and the proof rail have taken theirs, so the fold
          composes at any viewport height instead of at one design size. */}
      <div
        data-hero-content
        className="relative z-10 flex flex-1 flex-col justify-center"
      >
        <p data-animate="eyebrow">
          <span className="inline-flex items-center gap-2.5 rounded-pill border border-hairline bg-canvas-elevated/60 py-1.5 pl-3 pr-4 backdrop-blur-sm">
            <span
              aria-hidden="true"
              className="size-1.5 shrink-0 rounded-full bg-accent-brand"
            />
            <span className="text-mono-eyebrow font-mono uppercase tracking-widest text-body">
              Senior Frontend Engineer · Tehran
            </span>
          </span>
        </p>

        {/*
          The headline is the whole hero now. It was set at 72px in a column that
          left the right third of the fold empty — at this size it spans the
          measure, so there is no dead column left to notice.

          clamp() rather than breakpoints because the ceiling is a *container*
          constraint, not a viewport one: past ~1250px `main` stops widening at
          max-w-6xl, so letting vw keep growing would wrap the longest line. The
          6.75rem cap is the largest size at which "I build frontends" still sits
          on one line inside that container.
        */}
        <h1 className="mt-7 text-[clamp(2.25rem,8.6vw,6.75rem)] font-bold leading-[0.92] tracking-[-0.045em] text-ink">
          <Line>I build frontends</Line>
          <Line>
            that stay <span className="text-accent-brand">fast</span>
          </Line>
          <Line>to change.</Line>
        </h1>

        <p
          data-animate="lede"
          className="mt-8 max-w-xl text-body-lg leading-relaxed text-body md:mt-9"
        >
          Six years in production web platforms — the last four owning frontend
          architecture at Tapsi Shop, a high-traffic e-commerce platform
          spanning storefront, admin and vendor panels. Module boundaries,
          state ownership, rendering strategy, and the standards that keep a
          growing codebase fast to change.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3 md:mt-10">
          {/* Magnetic on both hero CTAs, and nowhere else on the page except
              the contact close. The transform lands on the wrapper while the
              entrance timeline animates `y` on the anchor inside it, so the two
              never write to the same element. */}
          <MagneticButton>
            <a
              href="#projects"
              data-animate="cta"
              className={cn(
                button({ variant: "primary", shape: "pill" }),
                "group"
              )}
            >
              See my work
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href={`mailto:${contactEmail}`}
              data-animate="cta"
              className={button({ variant: "secondary", shape: "pill" })}
            >
              Get in touch
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Proof rail, pinned to the foot of the fold rather than floating in the
          middle of it — the numbers are the last thing read before the scroll,
          and the rule under them is what tells you there is a scroll. */}
      <div className="relative z-10 mt-14 border-t border-hairline pt-7">
        <div className="flex items-end justify-between gap-6">
          <dl className="grid flex-1 grid-cols-3 gap-x-5 sm:flex-none sm:gap-x-14">
            {heroFacts.map((fact) => (
              <div key={fact.value} data-animate="fact">
                <dt className="text-xl font-semibold tracking-tight text-ink tabular-nums sm:text-2xl md:text-3xl">
                  <CountUp value={fact.value} />
                </dt>
                <dd className="mt-1.5 text-body-sm leading-snug text-mute">
                  {fact.label}
                </dd>
              </div>
            ))}
          </dl>

          <a
            href="#about"
            data-animate="scroll"
            aria-label="Scroll to the About section"
            className="group hidden shrink-0 items-center gap-2 rounded-button pb-1 text-mono-eyebrow font-mono uppercase tracking-widest text-mute transition-colors hover:text-ink focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:ring-offset-4 focus-visible:ring-offset-canvas sm:inline-flex"
          >
            Scroll
            <ArrowDown
              aria-hidden="true"
              className="size-3.5 animate-bounce group-hover:animate-none motion-reduce:animate-none"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
