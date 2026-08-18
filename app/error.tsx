"use client";

import { useEffect } from "react";

import { Button, button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
      <p className="font-mono text-mono-eyebrow uppercase tracking-widest text-mute">
        Error
      </p>
      <h1 className="max-w-xl text-3xl font-semibold tracking-tight text-ink md:text-heading-lg">
        Something broke on this page.
      </h1>
      <p className="max-w-md text-body-md leading-relaxed text-body">
        This one is on me, not you. Try again — if it keeps happening, the rest
        of the site still works.
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={reset} variant="primary" shape="pill">
          Try again
        </Button>
        <a href="/" className={button({ variant: "secondary", shape: "pill" })}>
          Back home
        </a>
      </div>
    </main>
  );
}
