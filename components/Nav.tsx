"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { contactEmail, navItems } from "@/data";
import { cn } from "@/lib/utils";
import { button } from "./ui/Button";
import ThemeToggle from "./ui/ThemeToggle";
import Link from "next/link";

/**
 * Section ids that should light up a nav item other than their own. The case
 * study is an extension of the work section, so it keeps "Work" active rather
 * than leaving the nav with nothing highlighted.
 */
const SECTION_ALIASES: Record<string, string> = {
  "case-study": "#projects",
};

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // The nav renders on project detail pages too, where the section anchors
  // don't exist. Off the home page the links become root-relative so they
  // navigate home and then jump, and the scroll spy is switched off entirely —
  // otherwise a detail page's own headings light up unrelated nav items.
  const pathname = usePathname();
  const isHome = pathname === "/";
  const hrefFor = (link: string) => (isHome ? link : `/${link}`);
  // Scroll-spy state only means something on the home page — mask it here
  // rather than resetting `active` from the effect below.
  const effectiveActive = isHome ? active : null;

  // Hairline + blur appear only once the page has moved, so the hero meets the
  // viewport edge cleanly on first paint.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy. A rootMargin biased toward the top of the viewport means the
  // active item changes when a section reaches reading position, not when it
  // first peeks into view. Off the home page there's nothing to observe —
  // `effectiveActive` below masks stale state instead of resetting it here,
  // since setting state synchronously in an effect body just to null it out
  // triggers an avoidable extra render.
  useEffect(() => {
    if (!isHome) return;

    const ids = [
      ...navItems.map((item) => item.link.replace("#", "")),
      ...Object.keys(SECTION_ALIASES),
    ];

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (!visible) return;
        const id = visible.target.id;
        setActive(SECTION_ALIASES[id] ?? `#${id}`);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  // Dismiss the mobile menu on Escape or on a click outside it.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        // Open menu needs a fully opaque backdrop — at 80% the hero type reads
        // straight through the panel and the links become unreadable.
        open
          ? "border-b border-hairline bg-canvas"
          : scrolled
            ? "border-b border-hairline bg-canvas/80 backdrop-blur-md"
            : "border-b border-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href={isHome ? "#top" : "/"}
          className="rounded-button text-label-sm font-semibold tracking-tight text-ink focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          Alireza Akbarzadeh
        </a>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = effectiveActive === item.link;
              return (
                <li key={item.link}>
                  <a
                    href={hrefFor(item.link)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-button px-3 py-2 text-label-sm transition-colors",
                      // A hairline that grows from the left under the label:
                      // hover previews it, the active section holds it. Pure
                      // CSS on purpose — a sliding indicator element would need
                      // a ResizeObserver and a layout read on every scroll-spy
                      // update to communicate exactly the same thing.
                      "after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:bg-accent-brand",
                      "after:transition-transform after:duration-300 after:ease-out-quart",
                      "motion-reduce:after:transition-none",
                      "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-brand",
                      "focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                      isActive
                        ? "text-ink after:scale-x-100"
                        : "text-body after:scale-x-0 hover:text-ink hover:after:scale-x-100"
                    )}
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
        <li>
  <Link
    href="/resume"
    data-animate="cta"
    aria-current={pathname === "/resume" ? "page" : undefined}
    className={cn(
      "relative rounded-button px-3 py-2 text-label-sm transition-colors",
      "after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:bg-accent-brand",
      "after:transition-transform after:duration-300 after:ease-out-quart",
      "motion-reduce:after:transition-none",
      "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-brand",
      "focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
      pathname === "/resume"
        ? "text-ink after:scale-x-100"
        : "text-body after:scale-x-0 hover:text-ink hover:after:scale-x-100",
    )}
  >
    Resume
  </Link>
</li>
          </ul>

          <ThemeToggle className="ml-1" />

          <a
            href={`mailto:${contactEmail}`}
            className={cn(
              button({ variant: "chrome", shape: "square", size: "sm" }),
              "hidden md:inline-flex"
            )}
          >
            Get in touch
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              button({ variant: "chrome", shape: "square", size: "icon" }),
              // 44px on touch to clear the WCAG AAA target; the desktop
              // variant never renders, so only the touch size matters here.
              "h-11 w-11 md:hidden"
            )}
          >
            <span aria-hidden="true" className="relative block h-2.5 w-4">
              <span
                className={cn(
                  "absolute left-0 block h-px w-full bg-current transition-transform duration-200",
                  open ? "top-1/2 rotate-45" : "top-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 bottom-0 block h-px w-full bg-current transition-transform duration-200",
                  open ? "bottom-1/2 -rotate-45" : ""
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-nav" className="border-t border-hairline md:hidden">
          <ul className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
            {navItems.map((item) => (
              <li key={item.link}>
                <a
                  href={hrefFor(item.link)}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-button px-2 py-3 text-label-sm transition-colors",
                    "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-brand",
                    effectiveActive === item.link
                      ? "text-ink"
                      : "text-body hover:text-ink"
                  )}
                >
                  {item.name}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={`mailto:${contactEmail}`}
                onClick={() => setOpen(false)}
                className={cn(
                  button({ variant: "chrome", shape: "square", size: "sm" }),
                  "w-full"
                )}
              >
                Get in touch
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
};

export default Nav;
