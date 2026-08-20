"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { projectMotif } from "@/lib/projectMotif";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * The generated cover for a project.
 *
 * Inline SVG rather than an <img>: it costs no network request, stays crisp at
 * any size, and inherits the theme through currentColor, so it flips with
 * light/dark for free instead of needing two exported files.
 *
 * Deliberately abstract. It is a mark that identifies the project, not a
 * depiction of it — a generated picture pretending to be a product screenshot
 * would be the same lie as a stock image, just more work.
 *
 * Two animations, chosen so the cost stays flat as the list grows:
 *
 *  - The field materialises once on scroll-in, staggered across the grid so it
 *    sweeps rather than popping. `opacity` only — 364 circles changing radius
 *    at once would be reflowing the SVG on every frame.
 *  - The accent cells then breathe continuously. There are only about two dozen
 *    of them per motif, which is what makes a permanent animation affordable
 *    here; running it on every cell would not be.
 */
const GAP = 13;
const PAD = 14;

export const ProjectMotif = ({
  slug,
  className,
  cols = 26,
  rows = 14,
}: {
  slug: string;
  className?: string;
  cols?: number;
  rows?: number;
}) => {
  const ref = useRef<SVGSVGElement>(null);
  const motif = projectMotif(slug, cols, rows);

  const width = (cols - 1) * GAP + PAD * 2;
  const height = (rows - 1) * GAP + PAD * 2;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cells = ref.current?.querySelectorAll("[data-cell]");
        const accents = ref.current?.querySelectorAll("[data-accent]");
        if (!cells?.length) return;

        const reveal = gsap.from(cells, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: {
            // Sweeps diagonally across the grid instead of firing in DOM order,
            // which would read as a raster scan.
            grid: [rows, cols],
            from: "start",
            amount: 0.7,
          },
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
        });

        const pulse = accents?.length
          ? gsap.to(accents, {
              attr: { r: "+=1.1" },
              opacity: 0.55,
              duration: 1.6,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              stagger: { grid: [rows, cols], from: "center", amount: 1.2 },
            })
          : null;

        return () => {
          reveal.kill();
          pulse?.kill();
        };
      });
    },
    { scope: ref, dependencies: [slug, cols, rows] }
  );

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full text-mute", className)}
    >
      {motif.cells.map((cell) => (
        <circle
          key={`${cell.x}-${cell.y}`}
          data-cell
          {...(cell.accent ? { "data-accent": "" } : {})}
          cx={PAD + cell.x * GAP}
          cy={PAD + cell.y * GAP}
          r={cell.r}
          className={cell.accent ? "text-accent-brand" : undefined}
          fill="currentColor"
        />
      ))}
    </svg>
  );
};

export default ProjectMotif;
