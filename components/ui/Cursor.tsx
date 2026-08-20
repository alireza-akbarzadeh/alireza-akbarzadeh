"use client";

import { useEffect, useRef, useState } from "react";

import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * A contextual cursor: a small accent dot that trails the pointer, and expands
 * into a labelled pill over anything carrying `data-cursor`.
 *
 * Three deliberate constraints, because this is the effect most likely to tip
 * from "considered" into "gimmick":
 *
 *  1. The native cursor is never hidden. Replacing it entirely means every
 *     text caret, resize handle and disabled state stops communicating what it
 *     normally would, and the page starts fighting the OS. This sits alongside
 *     it as an additional signal.
 *  2. It only exists for a fine pointer with real hover, and never under
 *     `prefers-reduced-motion`. On touch it renders nothing at all — no
 *     listeners, no element, no rAF loop.
 *  3. The animation frame loop stops as soon as the dot has caught up, and
 *     restarts on the next move. An idle tab does no work, which is not true of
 *     the usual implementation of this effect.
 *
 * Labels come from the DOM rather than from props (`data-cursor="Read case
 * study"`), so a new interactive surface opts in by adding one attribute and
 * this component never learns about it.
 */
const Cursor = () => {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [label, setLabel] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const active = fine === true && reducedMotion === false;

  useEffect(() => {
    if (!active) return;

    const node = ref.current;
    if (!node) return;

    // Start both points together so the first frame after the pointer appears
    // doesn't fly in from wherever the last one was.
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;
    let seen = false;

    const tick = () => {
      const dx = target.x - current.x;
      const dy = target.y - current.y;

      // Below half a pixel there is nothing left to show. Park the loop rather
      // than burning a frame every 16ms for the rest of the session.
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        frame = 0;
        return;
      }

      current.x += dx * 0.2;
      current.y += dy * 0.2;
      node.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    const requestFrame = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;

      if (!seen) {
        seen = true;
        current.x = target.x;
        current.y = target.y;
        node.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
        node.dataset.visible = "true";
      }

      requestFrame();
    };

    // Delegated, so rows added to the page later are covered without rebinding.
    const onOver = (event: PointerEvent) => {
      const hit = event.target;
      const match = hit instanceof Element ? hit.closest("[data-cursor]") : null;
      setLabel(match?.getAttribute("data-cursor") ?? null);
    };

    // Leaving the window entirely — not merely one element — hides the dot, so
    // it never sits frozen in a corner while the pointer is somewhere else.
    const onWindowOut = (event: PointerEvent) => {
      if (event.relatedTarget) return;
      node.dataset.visible = "false";
      seen = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onWindowOut);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onWindowOut);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-visible="false"
      className="pointer-events-none fixed left-0 top-0 z-60 opacity-0 transition-opacity duration-300 data-[visible=true]:opacity-100"
    >
      {/* Offset down and to the right of the pointer rather than centred on it,
          the way a tooltip is. Centred, the marker covers the exact pixel being
          pointed at — over body copy it hides the words under the cursor, and
          over an icon button it reads as a smudge on the icon. The offset also
          gives the pill somewhere to grow into that isn't on top of the thing
          it is labelling.

          Fixed widths on both states, because a transition between `auto` and a
          length does not animate — the pill would snap open instead. */}
      <span
        className={
          label
            ? "flex h-9 w-[10rem] translate-x-4 translate-y-5 items-center justify-center rounded-pill border border-hairline bg-canvas-elevated font-mono text-mono-eyebrow uppercase tracking-widest text-ink shadow-floating transition-all duration-300 ease-out-quart"
            : "flex h-2.5 w-2.5 translate-x-3 translate-y-3.5 items-center justify-center overflow-hidden rounded-pill border border-transparent bg-accent-brand font-mono text-mono-eyebrow uppercase tracking-widest text-transparent transition-all duration-300 ease-out-quart"
        }
      >
        <span
          className={
            label
              ? "opacity-100 transition-opacity duration-200 delay-100"
              : "opacity-0 transition-opacity duration-100"
          }
        >
          {label}
        </span>
      </span>
    </div>
  );
};

export default Cursor;
