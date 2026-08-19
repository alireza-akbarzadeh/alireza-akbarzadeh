"use client";

import { createElement, useRef, type JSX, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  /** Anchor target, when the revealed block is also a link destination. */
  id?: string;
  /** Stagger direct children instead of animating the wrapper as one block. */
  stagger?: boolean;
  delay?: number;
  className?: string;
  /** Restricted to intrinsic tags — every call site passes a literal like "dl" or "ol". */
  as?: keyof JSX.IntrinsicElements;
};

/**
 * Scroll-reveal wrapper. One implementation for every section, so timing and
 * the reduced-motion guard live in a single place instead of being repeated.
 */
export const Reveal = ({
  children,
  id,
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

  // TypeScript can't resolve a single intrinsic element's ref/children types
  // from the `as` union, so this renders via `createElement` rather than
  // `<Tag>` JSX. react-hooks/refs flags the `ref` in props here because it
  // can't statically prove `Tag` is always a host element rather than a
  // component that might read `ref.current` during render — every call site
  // passes an intrinsic tag literal (see RevealProps), so that never happens.
  // eslint-disable-next-line react-hooks/refs
  return createElement(Tag, { ref, id, className }, children);
};

export default Reveal;
