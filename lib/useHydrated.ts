"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * False during SSR and the hydration render, true afterwards.
 *
 * Anything whose correct markup is only knowable in the browser — the resolved
 * theme, a media query, `localStorage` — has to render its server value first
 * or React will report a hydration mismatch. `useSyncExternalStore` expresses
 * that directly through its server-snapshot argument, without the extra render
 * pass a `useState` + `useEffect` mount flag would cost.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
