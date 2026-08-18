import Link from "next/link";

import { button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
      <p className="font-mono text-mono-eyebrow uppercase tracking-widest text-mute">
        404
      </p>
      <h1 className="max-w-xl text-3xl font-semibold tracking-tight text-ink md:text-heading-lg">
        That page doesn&apos;t exist.
      </h1>
      <p className="max-w-md text-body-md leading-relaxed text-body">
        The link may be out of date. Everything lives on one page here.
      </p>
      <Link
        href="/"
        className={`${button({ variant: "secondary", shape: "pill" })} mt-2`}
      >
        Back home
      </Link>
    </main>
  );
}
