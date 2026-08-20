/**
 * The motion system.
 *
 * Durations, easings and stagger intervals live here rather than at each call
 * site, so the site speaks one motion language instead of eight. Before this
 * existed the same reveal was written as 0.8/power3.out in Reveal, 0.9/power3
 * in the hero, 0.45/back.out in Stack and 0.5/power2 in the project motif —
 * four dialects of the same gesture, and no way to retune the page as a whole.
 *
 * The matching CSS custom properties are declared in globals.css under
 * `--ease-*`, which is Tailwind v4's easing namespace, so `ease-out-quart` is a
 * real utility class. The two are kept in step by hand: the alternative is
 * shipping a runtime whose entire job is handing three numbers to a stylesheet.
 */

/** GSAP easing names. */
export const EASE = {
  /** Entrances and reveals. Decelerates hard, settles without bounce. */
  out: "power3.out",
  /** Display type only — deeper deceleration, so a 100px line doesn't slam. */
  display: "power4.out",
  /** Anything that returns to where it started: magnetic pull, hover release. */
  soft: "power2.out",
} as const;

/**
 * Seconds.
 *
 * `micro` is the ceiling for anything the pointer is waiting on — past roughly
 * 250ms a hover response stops reading as feedback and starts reading as lag.
 */
export const DURATION = {
  micro: 0.24,
  base: 0.45,
  reveal: 0.75,
  /** Reserved for the hero headline, the one element allowed to take its time. */
  display: 1.1,
} as const;

/** Seconds between staggered items. 40–110ms still reads as a single gesture. */
export const STAGGER = {
  tight: 0.04,
  base: 0.075,
  loose: 0.11,
} as const;

/**
 * Shared ScrollTrigger start.
 *
 * Biased well inside the viewport rather than at its edge: a reveal that fires
 * at `top bottom` has already finished by the time the block is somewhere the
 * eye is actually reading, which is the same as not animating at all.
 */
export const REVEAL_START = "top 85%";
