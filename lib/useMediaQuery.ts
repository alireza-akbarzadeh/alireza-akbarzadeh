"use client";

import { useEffect, useState } from "react";

/**
 * Returns null until the query has been evaluated on the client, then true or
 * false. The null state exists so callers can avoid rendering the wrong branch
 * during SSR/hydration instead of flashing and correcting.
 */
export function useMediaQuery(query: string): boolean | null {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const list = window.matchMedia(query);
    setMatches(list.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
