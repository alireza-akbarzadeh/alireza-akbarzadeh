import { ImageResponse } from "next/og";

import { getProject, projects } from "@/data/projects";
import { projectMotif } from "@/lib/projectMotif";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Prerender one card per project alongside the pages themselves. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/**
 * Per-project social card.
 *
 * Every project shared anywhere now previews as itself rather than as the
 * generic site card, and the motif is the same one the page renders, so a link
 * preview and the page it opens are visibly the same object.
 *
 * Colours are hard-coded, matching app/opengraph-image.tsx: this renders in the
 * edge runtime with no CSS pipeline, so custom properties can't resolve. Values
 * mirror the dark theme in app/globals.css — keep them in sync by hand.
 */
export default async function ProjectOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return new ImageResponse(<div style={{ background: "#0a0a0a" }} />, size);
  }

  // Serialised to a data URI rather than rendered as JSX children: Satori
  // supports <img> with an inline SVG payload cleanly, whereas an element tree
  // of several hundred <circle> nodes runs into its stricter layout rules.
  const motif = projectMotif(project.slug, 40, 22);
  const gap = 30;
  const motifSvg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="1230" height="690" viewBox="0 0 1230 690">`,
    ...motif.cells.map(
      (cell) =>
        `<circle cx="${20 + cell.x * gap}" cy="${20 + cell.y * gap}" r="${(
          cell.r * 2.1
        ).toFixed(2)}" fill="${cell.accent ? "#F2A93C" : "#3f3f46"}"/>`
    ),
    `</svg>`,
  ].join("");
  const motifSrc = `data:image/svg+xml;base64,${Buffer.from(motifSvg).toString(
    "base64"
  )}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* The motif sits behind the type, faded and pushed right, mirroring how
            the hero field relates to the headline on the site itself. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 720,
            height: 630,
            display: "flex",
            opacity: 0.45,
          }}
        >
          {/* Plain <img>: this renders in Satori, not the browser, so next/image
              has nothing to optimise here and would not resolve anyway. */}
          <img src={motifSrc} width={720} height={404} alt="" />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#737373",
            }}
          >
            {`Case study · ${project.year}`}
          </div>
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              color: "#fafafa",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#a1a1a1",
              maxWidth: 760,
              lineHeight: 1.35,
            }}
          >
            {project.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "14px",
            position: "relative",
            flexWrap: "wrap",
          }}
        >
          {project.stack.slice(0, 5).map((tech) => (
            <div
              key={tech}
              style={{
                display: "flex",
                fontSize: 22,
                color: "#a1a1a1",
                border: "1px solid #262626",
                borderRadius: 100,
                padding: "8px 20px",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
