"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  /** Stagger direct children instead of animating the wrapper as one block. */
  stagger?: boolean;
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Scroll-reveal wrapper. One implementation for every section, so timing and
 * the reduced-motion guard live in a single place instead of being repeated.
 */
export const Reveal = ({
  children,
  stagger = false,
  delay = 0,
  className,
  as: Tag = "div",
}: RevealProps) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = stagger
          ? (gsap.utils.toArray(ref.current?.children ?? []) as HTMLElement[])
          : [ref.current as HTMLElement];

        const tween = gsap.from(targets, {
          opacity: 0,
          y: 28,
          duration: 0.8,
          delay,
          ease: "power3.out",
          stagger: stagger ? 0.1 : 0,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        });

        return () => tween.kill();
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

export default Reveal;
