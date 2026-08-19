"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import type { ProjectShot } from "@/data/projects";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Real screenshots of a project. Renders nothing when a project has none.
 *
 * The image is scaled slightly above its frame and drifts a few percent against
 * the scroll. That is the whole parallax: enough that the page feels like it
 * has depth, small enough that nobody consciously notices it, and clipped by
 * the frame so no layout ever moves. Anything stronger and a reader chasing a
 * caption has to fight it.
 *
 * `sizes` matters more than it looks — without it Next serves the largest
 * candidate to every viewport, which on a screenshot-heavy page is the single
 * biggest download on the site.
 */
const ProjectShots = ({
  shots,
  className,
}: {
  shots?: ProjectShot[];
  className?: string;
}) => {
  const container = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (!shots?.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const frames = gsap.utils.toArray<HTMLElement>("[data-parallax]");

        const tweens = frames.map((frame) =>
          gsap.fromTo(
            frame,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: frame.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          )
        );

        return () => tweens.forEach((tween) => tween.kill());
      });
    },
    { scope: container, dependencies: [shots] }
  );

  if (!shots?.length) return null;

  return (
    <ul ref={container} className={cn("grid gap-8 md:grid-cols-2", className)}>
      {shots.map((shot) => (
        <li key={shot.src} className="flex flex-col gap-3">
          <div className="overflow-hidden rounded-card border border-hairline bg-canvas-elevated">
            <div data-parallax className="will-change-transform">
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                sizes="(min-width: 768px) 45vw, 92vw"
                className={cn("h-auto w-full scale-[1.08]", shot.srcDark && "dark:hidden")}
              />
              {shot.srcDark ? (
                <Image
                  src={shot.srcDark}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  sizes="(min-width: 768px) 45vw, 92vw"
                  className="hidden h-auto w-full scale-[1.08] dark:block"
                />
              ) : null}
            </div>
          </div>

          {shot.caption ? (
            <p className="text-body-sm leading-relaxed text-mute">
              {shot.caption}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default ProjectShots;
