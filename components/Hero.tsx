"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { contactEmail, heroFacts } from "@/data";
import { cn } from "@/lib/utils";
import HeroCanvas from "./hero/HeroCanvas";
import { button } from "./ui/Button";
import CountUp from "./ui/CountUp";

gsap.registerPlugin(useGSAP);

const Hero = () => {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Respect the OS setting: reveal everything, skip the choreography.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-animate]", { opacity: 1, y: 0, filter: "none" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.9 },
        });

        tl.from("[data-animate='eyebrow']", { opacity: 0, y: 14, duration: 0.6 })
          .from(
            "[data-animate='line']",
            { opacity: 0, y: 42, filter: "blur(12px)", stagger: 0.12 },
            "-=0.25"
          )
          .from("[data-animate='lede']", { opacity: 0, y: 20 }, "-=0.55")
          .from(
            "[data-animate='cta']",
            { opacity: 0, y: 18, stagger: 0.1 },
            "-=0.6"
          )
          .from(
            "[data-animate='fact']",
            { opacity: 0, y: 16, stagger: 0.08 },
            "-=0.65"
          );

        return () => tl.kill();
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="top"
      className="relative isolate flex min-h-[92svh] items-center py-32 md:py-40"
    >
      <HeroCanvas />

      <div className="relative z-10 w-full">
        <p
          data-animate="eyebrow"
          className="text-mono-eyebrow font-mono uppercase tracking-widest text-mute"
        >
          Senior Frontend Engineer · Tehran
        </p>

        <h1 className="mt-6 max-w-4xl text-[2.5rem] font-semibold leading-[1.05] tracking-tighter text-ink sm:text-6xl lg:text-7xl">
          <span data-animate="line" className="block">
            I build frontends
          </span>
          <span data-animate="line" className="block">
            that stay fast to change.
          </span>
        </h1>

        <p
          data-animate="lede"
          className="mt-8 max-w-2xl text-body-lg leading-relaxed text-body"
        >
          Six years in production web platforms — the last four owning frontend
          architecture for a high-traffic e-commerce platform. Module
          boundaries, state ownership, rendering strategy, and the standards
          that keep a growing codebase maintainable.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            data-animate="cta"
            className={button({ variant: "primary", shape: "pill" })}
          >
            See my work
          </a>
          <a
            href={`mailto:${contactEmail}`}
            data-animate="cta"
            className={button({ variant: "secondary", shape: "pill" })}
          >
            Get in touch
          </a>
        </div>

        <dl className="mt-20 grid max-w-3xl grid-cols-1 border-t border-hairline sm:grid-cols-3">
          {heroFacts.map((fact, index) => (
            <div
              key={fact.value}
              data-animate="fact"
              className={cn(
                "py-6 sm:px-6 sm:first:pl-0",
                index > 0 && "border-t border-hairline sm:border-l sm:border-t-0"
              )}
            >
              <dt className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                <CountUp value={fact.value} />
              </dt>
              <dd className="mt-2 text-body-sm leading-snug text-mute">
                {fact.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Hero;
