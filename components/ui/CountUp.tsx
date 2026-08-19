"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/** "~30%" → ["~", 30, "%"]. Returns null when there's no integer to count. */
const parse = (value: string) => {
  const match = /^(\D*)(\d+)(.*)$/.exec(value);
  if (!match) return null;
  return { prefix: match[1], target: Number(match[2]), suffix: match[3] };
};

/**
 * Counts a stat up to its value on mount.
 *
 * The proof points under the hero are the first thing a recruiter's eye lands
 * on, and a number that resolves draws attention to itself in a way a static
 * one does not. The motion is short and happens once — this is emphasis, not
 * ambience.
 *
 * The server renders the final string, so the value is correct before any
 * JavaScript runs, correct if JavaScript never runs, and correct for a screen
 * reader — the animation only ever replaces text that is already right.
 */
const CountUp = ({ value, className }: { value: string; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const parsed = parse(value);
      if (!parsed) return;

      const node = ref.current;
      if (!node) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counter = { n: 0 };

        const tween = gsap.to(counter, {
          n: parsed.target,
          duration: 1.1,
          ease: "power2.out",
          delay: 0.5,
          onUpdate: () => {
            node.textContent = `${parsed.prefix}${Math.round(counter.n)}${parsed.suffix}`;
          },
          // Snap back to the source string, so nothing depends on the tween
          // having landed exactly on the target.
          onComplete: () => {
            node.textContent = value;
          },
        });

        return () => {
          tween.kill();
          node.textContent = value;
        };
      });
    },
    { scope: ref, dependencies: [value] }
  );

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
};

export default CountUp;
