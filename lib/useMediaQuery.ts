"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Returns null until the query has been evaluated on the client, then true or
 * false. The null state exists so callers can avoid rendering the wrong branch
 * during SSR/hydration instead of flashing and correcting.
 *
 * Implemented with `useSyncExternalStore` rather than `useState` + `useEffect`:
 * a media query *is* an external store, and reading it in an effect means an
 * extra render pass on every mount plus a tearing window during concurrent
 * rendering. The server snapshot returns null, so the null-until-known contract
 * above is preserved — it now falls out of hydration instead of a state update.
 */
export function useMediaQuery(query: string): boolean | null {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onStoreChange);
      return () => list.removeEventListener("change", onStoreChange);
    },
    [query]
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query]
  );

  // Hydration renders with this value, matching the server HTML exactly.
  const getServerSnapshot = () => null;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
