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
  // The field lives in the space to the right of the headline. Below the lg
  // breakpoint there is no such space — the copy runs the full width — and the
  // field lands on top of the paragraph as speckle instead of beside it as
  // atmosphere. This used to be gated on `(max-width: 640px) and (pointer:
  // coarse)`, which described the battery cost but not the layout: a 900px
  // window with a mouse still has nowhere to put it.
  const hasRoom = useMediaQuery("(min-width: 1024px)");
  const { resolvedTheme } = useTheme();

  // Undetermined yet (first paint / SSR): render nothing rather than guess.
  if (reducedMotion === null || hasRoom === null) return null;

  // Narrow viewports get the flat canvas only. That also spares small touch
  // devices the battery and frame-budget cost of WebGL, which is the other
  // reason not to run it there.
  if (!hasRoom) return null;

  const isDark = resolvedTheme !== "light";

  // Masked off-centre to the right: the headline is left-aligned, so the field
  // sits beside the type rather than behind it.
  //
  // Light gets a tighter mask pushed further right, not just a lower opacity.
  // Dark marks on a pale canvas stay legible much deeper into the falloff than
  // pale marks on a dark one, so the same mask that reads as atmosphere in dark
  // reads as speckle across the paragraph in light — the fix is where the field
  // is allowed to reach, not only how strongly it renders.
  //
  // Both stops have since been opened up substantially. Held at 18%/72% and
  // half opacity the field was invisible in light and a smudge in dark, which
  // is the worst outcome available: the full cost of shipping three.js and none
  // of the effect. Now that the headline carries the fold on its own there is
  // no longer an LCP element to protect it from, so the field is allowed to
  // reach a strength where the amber crests actually read.
  //
  // `w-screen` + the centring translate breaks the canvas out of `main`'s
  // max-w-6xl: the field is atmosphere and wants the viewport's full width, and
  // clipping it to the text container put a visible straight edge on it.
  return (
    <div
      aria-hidden="true"
      className={
        isDark
          ? "pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 opacity-90 mask-[radial-gradient(ellipse_58%_62%_at_76%_42%,black_0%,black_36%,transparent_78%)]"
          : "pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 opacity-90 mask-[radial-gradient(ellipse_52%_58%_at_82%_40%,black_0%,black_30%,transparent_74%)]"
      }
    >
      {/* Density is fixed now that the canvas only ever renders at >=1024px —
          the narrow-screen step down had no viewport left to apply to. */}
      <HeroScene
        density={96}
        animate={!reducedMotion}
        theme={isDark ? "dark" : "light"}
      />
    </div>
  );
};

export default HeroCanvas;
