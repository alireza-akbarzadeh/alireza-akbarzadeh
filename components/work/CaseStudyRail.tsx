"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export type RailItem = { id: string; label: string };

/**
 * Sticky section index for a case study.
 *
 * A detail page runs long — context, four breakdown panels, a stack listing —
 * and a reviewer skimming for one thing ("what did they actually decide?")
 * shouldn't have to scroll to find out what's on the page. The rail turns the
 * structure into navigation and doubles as a position indicator.
 *
 * Desktop only, and deliberately: on mobile it would either cover the content
 * or become a second scrolling region, and the page is short enough there that
 * the thumb solves the same problem.
 */
const CaseStudyRail = ({ items }: { items: RailItem[] }) => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    // Biased to the upper third: an entry becomes active when it reaches
    // reading position, not when its first pixel clears the fold.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )[0];

        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-32 hidden max-h-[calc(100svh-10rem)] overflow-y-auto lg:block"
    >
      <p className="font-mono text-mono-eyebrow uppercase tracking-widest text-faint">
        On this page
      </p>

      <ul className="mt-5 space-y-px border-l border-hairline">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "-ml-px block border-l py-2 pl-4 text-body-md transition-colors",
                  "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-brand",
                  "focus-visible:ring-offset-4 focus-visible:ring-offset-canvas",
                  isActive
                    ? "border-accent-brand text-ink"
                    : "border-transparent text-mute hover:border-hairline hover:text-body"
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default CaseStudyRail;
