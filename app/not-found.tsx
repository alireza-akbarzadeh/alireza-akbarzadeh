import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-black-100 min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-xs uppercase tracking-widest text-purple">404</p>
      <h1 className="text-3xl md:text-4xl font-bold text-white max-w-xl">
        That page doesn&apos;t exist.
      </h1>
      <p className="text-white-200 max-w-md">
        The link may be out of date. Everything lives on one page here.
      </p>
      <Link
        href="/"
        className="rounded-lg border border-white/20 bg-black-200 px-5 py-2.5 text-sm text-white transition-colors hover:border-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple"
      >
        Back home
      </Link>
    </main>
  );
}
