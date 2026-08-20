"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * An accent line that fills its parent as that parent scrolls past.
 *
 * Used on the experience timeline, where the roles are sequential and the
 * static hairline already implied a spine without ever saying how far along it
 * you are. Scrubbed rather than triggered: the fill is tied to scroll position,
 * so it reads as a progress indicator instead of as one more thing that
 * animates when it appears.
 *
 * It starts at `scaleY(0)` in inline style rather than in a GSAP `from`, so the
 * line is empty in the server-rendered HTML too. A `from` tween would leave it
 * drawn at full height until hydration, which is a flash of exactly the wrong
 * state. It also means the no-JavaScript and reduced-motion outcome is the same
 * — no line — which is correct for something purely decorative.
 */
const ScrollSpine = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const node = ref.current;
      const track = node?.parentElement;
      if (!node || !track) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.to(node, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: track,
            // Starts filling once the first role reaches reading position and
            // completes as the last one leaves it, so the line tracks the part
            // of the list actually being read rather than the raw scroll range.
            start: "top 75%",
            end: "bottom 65%",
            scrub: 0.4,
          },
        });

        return () => tween.kill();
      });
    },
    { scope: ref }
  );

  return (
    <span
      ref={ref}
      aria-hidden="true"
      style={{ transform: "scaleY(0)" }}
      className={cn(
        "pointer-events-none absolute left-0 top-0 w-px origin-top bg-accent-brand",
        className
      )}
    />
  );
};

export default ScrollSpine;
