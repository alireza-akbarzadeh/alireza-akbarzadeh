"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { DURATION, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

/**
 * Pulls its child toward the pointer while the pointer is over it.
 *
 * The effect is anticipation, not decoration: the control leans into the cursor
 * before the click lands, which makes a primary CTA feel like it has weight.
 * Kept to the two primary actions on the site — "See my work" and "Get in
 * touch" — because a page where everything is magnetic is a page where nothing
 * reads as primary.
 *
 * Wrapping rather than cloning: the child keeps its own element, its own
 * classes and its own semantics (these are anchors, and they stay anchors), and
 * the transform lands on a span around it. That also keeps this composable with
 * the hero's entrance timeline, which animates `y` on the anchor itself — two
 * transforms on two different elements instead of two libraries fighting over
 * one.
 */
const MagneticButton = ({
  children,
  className,
  /** Fraction of the pointer's offset from centre that the control travels. */
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const node = ref.current;
      if (!node) return;

      const mm = gsap.matchMedia();

      // Fine pointers only. On touch there is no hover to anticipate, so the
      // effect would only ever fire as a lurch at the moment of tapping.
      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          // quickTo compiles the setter once and reuses it, so a pointermove
          // costs an interpolation rather than building a fresh tween 60 times
          // a second.
          const xTo = gsap.quickTo(node, "x", {
            duration: DURATION.base,
            ease: EASE.soft,
          });
          const yTo = gsap.quickTo(node, "y", {
            duration: DURATION.base,
            ease: EASE.soft,
          });

          // Measured once on entry rather than per move: getBoundingClientRect
          // forces layout, and doing that on every pointermove is how a smooth
          // effect turns into a janky one on a page this tall.
          let centreX = 0;
          let centreY = 0;

          const onEnter = () => {
            const rect = node.getBoundingClientRect();
            centreX = rect.left + rect.width / 2;
            centreY = rect.top + rect.height / 2;
          };

          const onMove = (event: PointerEvent) => {
            xTo((event.clientX - centreX) * strength);
            yTo((event.clientY - centreY) * strength);
          };

          const onLeave = () => {
            xTo(0);
            yTo(0);
          };

          node.addEventListener("pointerenter", onEnter);
          node.addEventListener("pointermove", onMove);
          node.addEventListener("pointerleave", onLeave);

          return () => {
            node.removeEventListener("pointerenter", onEnter);
            node.removeEventListener("pointermove", onMove);
            node.removeEventListener("pointerleave", onLeave);
            // Clear the transform on teardown, or a control left mid-pull keeps
            // its offset when the media query stops matching.
            gsap.set(node, { x: 0, y: 0 });
          };
        }
      );
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={cn("inline-flex", className)}>
      {children}
    </span>
  );
};

export default MagneticButton;
