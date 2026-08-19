"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/useHydrated";
import { button } from "./Button";

/**
 * Light/dark switch.
 *
 * The theme is only knowable in the browser — the class on <html> is written by
 * next-themes' blocking script before paint, but the server rendered markup
 * without it. So until hydration this renders a same-size, same-shape inert
 * placeholder: swapping the icon in afterwards costs no layout shift, whereas
 * guessing an icon server-side would flash the wrong one on every load for
 * anyone whose preference differs from the default.
 *
 * `enableSystem` stays on in the provider, so an untouched visitor still follows
 * their OS. Pressing this pins an explicit choice — which is the point of
 * exposing it at all.
 */
const ThemeToggle = ({ className }: { className?: string }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useHydrated();

  const isDark = resolvedTheme === "dark";
  const next = isDark ? "light" : "dark";

  const classes = cn(
    button({ variant: "chrome", shape: "square", size: "icon" }),
    className
  );

  if (!hydrated) {
    // aria-hidden: for the moment before hydration there is nothing meaningful
    // to announce, and an unlabelled button in the tab order is worse than none.
    return <div aria-hidden="true" className={classes} />;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={classes}
    >
      {isDark ? (
        <Sun aria-hidden="true" className="h-4 w-4" />
      ) : (
        <Moon aria-hidden="true" className="h-4 w-4" />
      )}
    </button>
  );
};

export default ThemeToggle;
