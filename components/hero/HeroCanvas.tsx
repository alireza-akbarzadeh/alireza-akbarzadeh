"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

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
  const { resolvedTheme } = useTheme();

  // Undetermined yet (first paint / SSR): render nothing rather than guess.
  if (reducedMotion === null) return null;

  // Small touch devices get the CSS gradient only — WebGL costs more battery
  // and frame budget there than the effect is worth.
  if (isNarrow && isCoarse) return null;

  const isDark = resolvedTheme !== "light";

  // Masked off-centre to the right: the headline is left-aligned, so the field
  // sits beside the type rather than behind it, held well below full strength
  // so it never competes with the LCP element for attention.
  //
  // Light gets a tighter mask pushed further right, not just a lower opacity.
  // Dark marks on a pale canvas stay legible much deeper into the falloff than
  // pale marks on a dark one, so the same mask that reads as atmosphere in dark
  // reads as speckle across the paragraph in light — the fix is where the field
  // is allowed to reach, not only how strongly it renders.
  //
  // The light stop has since been opened up from 8%/58%: part of what made the
  // field read as speckle was a colour-space bug in HeroScene that landed
  // #d4d4d8 on screen as rgb(168,168,175), far darker than the token. With the
  // encode corrected the points are genuinely pale and no longer need to be
  // masked almost entirely away — the asymmetry with dark stays, the severity
  // does not.
  return (
    <div
      aria-hidden="true"
      className={
        isDark
          ? "pointer-events-none absolute inset-0 -z-10 opacity-50 mask-[radial-gradient(ellipse_at_72%_45%,black_18%,transparent_72%)]"
          : "pointer-events-none absolute inset-0 -z-10 opacity-60 mask-[radial-gradient(ellipse_at_80%_46%,black_14%,transparent_66%)]"
      }
    >
      <HeroScene
        density={isNarrow ? 64 : 96}
        animate={!reducedMotion}
        theme={isDark ? "dark" : "light"}
      />
    </div>
  );
};

export default HeroCanvas;
