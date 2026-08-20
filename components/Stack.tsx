"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Cpu, Layers, ShieldCheck, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { stackGroups } from "@/data";
import LogoMarquee from "./ui/LogoMarquee";
import Section from "./ui/Section";
import TechLogo from "./ui/TechLogo";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * One glyph per group, keyed to id rather than label so a copy edit to
 * `group.label` can't silently break the lookup.
 */
const GROUP_ICONS: Record<number, LucideIcon> = {
  1: Zap,
  2: Layers,
  3: ShieldCheck,
  4: Cpu,
};

/**
 * Grouped by how I actually use each tool. The marks are the fast read — you
 * recognise a stack from its logos before you finish the heading — and the
 * group note is the honest part underneath: "shipped production code in all of
 * these" says something a logo grid on its own cannot.
 *
 * Each card's marks pop in on a short per-card stagger rather than one long
 * page-wide sequence: a reader who scrolls straight to the fourth card should
 * see it animate on arrival, not find it already finished.
 */
const Stack = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");

        const tweens = cards.map((card) =>
          gsap.from(card.querySelectorAll("[data-tech]"), {
            opacity: 0,
            y: 12,
            scale: 0.92,
            duration: 0.45,
            ease: "back.out(1.7)",
            // 40ms lands inside the 30-50ms window that reads as one gesture
            // rather than as items arriving separately.
            stagger: 0.04,
            scrollTrigger: { trigger: card, start: "top 82%", once: true },
          })
        );

        return () => tweens.forEach((tween) => tween.kill());
      });
    },
    { scope: container }
  );

  return (
    <Section
      id="stack"
      eyebrow="Stack"
      title="What I work with, and how often"
      lede="Grouped by real usage rather than by category, so the list says something about depth instead of breadth."
    >
      <div ref={container}>
        {/* The marquee is the recognisable surface — logos moving past before
            the reader has committed to reading anything. The grid below is
            where the actual claim gets made. */}
        <LogoMarquee className="-mx-5 mb-14 border-y border-hairline sm:-mx-8" />

        <div className="grid gap-5 md:grid-cols-2">
          {stackGroups.map((group) => {
            const Icon = GROUP_ICONS[group.id];
            return (
              <article
                data-stack-card
                key={group.id}
                className="rounded-card border border-hairline bg-canvas-elevated p-6 transition-colors duration-300 hover:border-hairline-soft md:p-8"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="flex items-center gap-2 text-heading-md text-ink">
                    <Icon aria-hidden="true" className="h-4 w-4 text-faint" />
                    {group.label}
                  </h3>
                  <p className="text-body-sm text-mute">{group.note}</p>
                </div>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <TechLogo key={item} name={item} />
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default Stack;
