"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * A 2px accent rule under the nav that fills as the article is read.
 *
 * Case study pages are long enough that "how much is left" is a real question,
 * and a hairline answers it without occupying any layout. Driven by scrub
 * rather than a scroll listener so the value is interpolated by GSAP's ticker
 * and stays pinned to scroll position under momentum scrolling.
 *
 * Progress is measured against the article, not the document, so the footer and
 * next-project nav don't count as unread content.
 */
const ReadingProgress = ({ targetId }: { targetId: string }) => {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const mm = gsap.matchMedia();

    // No scrubbed indicator under reduced motion: it is pure decoration there,
    // and a bar that tracks every scroll tick is exactly the kind of continuous
    // movement the preference asks to switch off.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: target,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.2,
          },
        }
      );

      return () => tween.kill();
    });
  }, [targetId]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-16 z-50 h-px"
    >
      <div
        ref={bar}
        className="h-full origin-left scale-x-0 bg-accent-brand"
      />
    </div>
  );
};

export default ReadingProgress;
