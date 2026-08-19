"use client";

import { Download, Printer } from "lucide-react";

import { resumeHeader, resumePdfPath } from "@/data/resume";
import { button } from "../ui/Button";

/**
 * Two ways to take the CV away, because they are not the same thing.
 *
 * Download hands over a fixed file — what a recruiter forwards, attaches to an
 * ATS, or opens without a browser. It is generated from this very page by
 * `pnpm cv:pdf`, so the file and the page cannot say different things.
 *
 * Print opens the browser's own dialog, which offers "Save as PDF" everywhere
 * that matters and honours the print stylesheet. It stays because it is the
 * only path that is guaranteed current even if the checked-in PDF has not been
 * regenerated since the last content change.
 *
 * `download` gives the saved file a sensible name rather than a hashed one.
 * The whole row is hidden in print output — buttons on paper are noise.
 */
const ResumeActions = () => (
  <div className="flex flex-wrap items-center gap-3 print:hidden">
    <a
      href={resumePdfPath}
      download={`${resumeHeader.name.replace(/\s+/g, "-")}-CV.pdf`}
      className={button({ variant: "primary", shape: "pill", size: "md" })}
    >
      <Download aria-hidden="true" className="h-4 w-4" />
      Download CV
    </a>

    <button
      type="button"
      onClick={() => window.print()}
      className={button({ variant: "secondary", shape: "pill", size: "md" })}
    >
      <Printer aria-hidden="true" className="h-4 w-4" />
      Print
    </button>
  </div>
);

export default ResumeActions;
