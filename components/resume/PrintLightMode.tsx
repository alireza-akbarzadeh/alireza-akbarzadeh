"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

/**
 * Forces the light theme for the duration of a print.
 *
 * The print stylesheet already re-points every colour token to ink-on-paper,
 * and that is enough for the content box. It is *not* enough for the page
 * canvas: Chromium derives the paper colour outside the content box from the
 * root element's `color-scheme`, and a `@media print` override of that property
 * does not reclaim it — printing from dark mode produced a black frame around
 * every page, and `color-scheme: only light` made it worse rather than better.
 *
 * Swapping the theme itself is the fix that actually addresses the cause: with
 * no `.dark` class there is no dark colour-scheme to inherit from. The previous
 * theme is restored on afterprint, so a visitor who cancels the dialog or
 * returns to the page is not silently switched to light.
 *
 * Mounted only on the résumé route — this is the one page anyone prints.
 */
const PrintLightMode = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Captured per-print rather than from the render closure, so a theme change
    // between mount and print does not restore a stale value.
    let previous: string | undefined;

    const before = () => {
      previous = theme;
      setTheme("light");
    };
    const after = () => {
      if (previous) setTheme(previous);
    };

    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => {
      window.removeEventListener("beforeprint", before);
      window.removeEventListener("afterprint", after);
    };
  }, [theme, setTheme]);

  return null;
};

export default PrintLightMode;
