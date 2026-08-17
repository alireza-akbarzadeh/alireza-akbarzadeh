"use client";

import dynamic from "next/dynamic";

import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Client-only wrapper for the WebGL hero.
 *
 * The scene is deliberately kept out of the server render and out of the
 * initial bundle: the headline is the LCP element, and a 3D field is not worth
 * a single millisecond of it. The canvas mounts after hydration, and only when
 * the device and the user's motion preference both allow it.
 */
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const HeroCanvas = () => {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isCoarse = useMediaQuery("(pointer: coarse)");
  const isNarrow = useMediaQuery("(max-width: 640px)");

  // Undetermined yet (first paint / SSR): render nothing rather than guess.
  if (reducedMotion === null) return null;

  // Small touch devices get the CSS gradient only — WebGL costs more battery
  // and frame budget there than the effect is worth.
  if (isNarrow && isCoarse) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_78%)]"
    >
      <HeroScene density={isNarrow ? 64 : 96} animate={!reducedMotion} />
    </div>
  );
};

export default HeroCanvas;
