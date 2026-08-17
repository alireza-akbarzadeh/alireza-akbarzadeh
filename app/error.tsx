"use client";

import { useEffect } from "react";

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
    <main className="bg-black-100 min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-xs uppercase tracking-widest text-purple">Error</p>
      <h1 className="text-3xl md:text-4xl font-bold text-white max-w-xl">
        Something broke on this page.
      </h1>
      <p className="text-white-200 max-w-md">
        This one is on me, not you. Try again — if it keeps happening, the rest
        of the site still works.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={reset}
          className="rounded-lg border border-white/20 bg-black-200 px-5 py-2.5 text-sm text-white transition-colors hover:border-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple"
        >
          Try again
        </button>
        <a
          href="/"
          className="rounded-lg px-5 py-2.5 text-sm text-white-200 underline underline-offset-4 transition-colors hover:text-white"
        >
          Back home
        </a>
      </div>
    </main>
  );
}
