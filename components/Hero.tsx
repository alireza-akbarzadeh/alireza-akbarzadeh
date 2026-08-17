"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaLocationArrow } from "react-icons/fa6";

import { contactEmail } from "@/data";
import MagicButton from "./MagicButton";
import HeroCanvas from "./hero/HeroCanvas";
import { Spotlight } from "./ui/Spotlight";

gsap.registerPlugin(useGSAP);

const facts = [
  { value: "6 yrs", label: "in production web platforms" },
  { value: "3 products", label: "on one shared design system" },
  { value: "~30%", label: "faster Core Web Vitals" },
];

const Hero = () => {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Respect the OS setting: reveal everything, skip the choreography.
      const mm = gsap.matchMedia();

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
          .from("[data-animate='cta']", { opacity: 0, y: 18, stagger: 0.1 }, "-=0.6")
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
    <section ref={container} className="relative pb-20 pt-36" id="top">
      <HeroCanvas />

      <div aria-hidden="true">
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div
        className="absolute top-0 left-0 flex h-screen w-full items-center justify-center dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]"
        aria-hidden="true"
      >
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="relative z-10 my-20 flex justify-center">
        <div className="flex max-w-[89vw] flex-col items-center justify-center md:max-w-3xl lg:max-w-[62vw]">
          <p
            data-animate="eyebrow"
            className="max-w-80 text-center text-xs uppercase tracking-widest text-blue-100"
          >
            Senior Frontend Engineer · Tehran
          </p>

          <h1 className="mt-4 text-center text-[40px] font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl">
            <span data-animate="line" className="block">
              I build frontends
            </span>
            <span data-animate="line" className="block">
              that stay{" "}
              <span className="bg-gradient-to-r from-purple to-[#7C6BF5] bg-clip-text text-transparent">
                fast to change
              </span>
            </span>
          </h1>

          <p
            data-animate="lede"
            className="mb-2 mt-6 max-w-2xl text-center text-sm text-white-200 md:text-lg md:tracking-wider"
          >
            Six years in production web platforms — the last four owning
            frontend architecture for a high-traffic e-commerce platform. Module
            boundaries, state ownership, rendering strategy, and the standards
            that keep a growing codebase maintainable.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a href="#projects" data-animate="cta">
              <MagicButton
                title="See my work"
                icon={<FaLocationArrow />}
                position="right"
              />
            </a>
            <a
              href={`mailto:${contactEmail}`}
              data-animate="cta"
              className="rounded-lg px-5 py-3 text-sm text-white-200 underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple"
            >
              Get in touch
            </a>
          </div>

          <dl className="mt-14 grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
            {facts.map((fact) => (
              <div
                key={fact.value}
                data-animate="fact"
                className="text-center sm:text-left"
              >
                <dt className="text-2xl font-bold text-white md:text-3xl">
                  {fact.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-white-200">
                  {fact.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Hero;
