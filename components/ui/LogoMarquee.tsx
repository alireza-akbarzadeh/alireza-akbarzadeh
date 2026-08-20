"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { MARQUEE_TECH, techLogo } from "@/lib/techLogos";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * A continuously drifting strip of tech marks.
 *
 * Two identical halves scroll as one track; when the first half has travelled
 * exactly its own width the transform wraps to 0 and the second half is sitting
 * precisely where the first began. That is why the list is rendered twice and
 * why the wrap distance is measured rather than assumed — a hard-coded width
 * would tear the moment a font loads at a different metric.
 *
 * Driven by a GSAP tween on `x` rather than a CSS keyframe because it also
 * takes a velocity nudge from scroll: the strip leans in the direction the page
 * is moving and settles back when scrolling stops. A CSS animation cannot read
 * scroll velocity, and swapping `animation-duration` mid-flight stutters.
 */
const LogoMarquee = ({ className }: { className?: string }) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = container.current?.querySelector<HTMLElement>("[data-track]");
      const half = container.current?.querySelector<HTMLElement>("[data-half]");
      if (!track || !half) return;

      const mm = gsap.matchMedia();

      // Reduced motion gets the strip, standing still. The marks are content —
      // hiding them would remove information, not just movement.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Measured after layout so the wrap distance matches what is on screen.
        const distance = half.offsetWidth;
        if (!distance) return;

        const drift = gsap.to(track, {
          x: -distance,
          duration: distance / 38, // px per second, not a fixed duration
          ease: "none",
          repeat: -1,
        });

        // Scroll velocity leans the strip. timeScale rather than a separate
        // tween so there is only ever one thing driving x — two would fight.
        const trigger = ScrollTrigger.create({
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const lean = 1 + Math.min(Math.abs(self.getVelocity()) / 1200, 2.6);
            gsap.to(drift, {
              timeScale: self.direction === -1 ? -lean : lean,
              duration: 0.35,
              overwrite: true,
            });
          },
        });

        // Settle back to a steady forward drift once the page stops moving.
        // The handler is held in a named binding because addEventListener
        // returns nothing — removeEventListener matches on the function itself.
        const onScrollEnd = () => {
          gsap.to(drift, { timeScale: 1, duration: 0.8, overwrite: true });
        };
        ScrollTrigger.addEventListener("scrollEnd", onScrollEnd);

        return () => {
          drift.kill();
          trigger.kill();
          ScrollTrigger.removeEventListener("scrollEnd", onScrollEnd);
        };
      });
    },
    { scope: container }
  );

  const marks = MARQUEE_TECH.map((name) => techLogo(name));

  return (
    <div
      ref={container}
      className={cn(
        "relative overflow-hidden py-2",
        // Dissolve at both ends instead of cutting off mid-logo.
        "mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <ul data-track className="flex w-max items-center will-change-transform">
        {[0, 1].map((copy) => (
          <li key={copy} {...(copy === 0 ? { "data-half": "" } : {})}>
            <ul
              className="flex items-center"
              // The second copy exists purely to fill the gap the first leaves
              // behind. Announcing both would read the whole stack twice.
              aria-hidden={copy === 1 || undefined}
            >
              {marks.map(({ id, label, Icon, tint }) => (
                <li
                  key={`${copy}-${id}`}
                  style={{ "--tint": tint } as React.CSSProperties}
                  className="group/mark flex shrink-0 items-center gap-2.5 px-6"
                >
                  <Icon
                    aria-hidden="true"
                    stroke={1.7}
                    className="h-5 w-5 text-(--tint) transition-transform duration-200 group-hover/mark:scale-110"
                  />
                  <span className="whitespace-nowrap font-mono text-body-sm text-body transition-colors duration-200 group-hover/mark:text-ink">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogoMarquee;
