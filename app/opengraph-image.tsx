import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Alireza Akbarzadeh — Senior Frontend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Colours are hard-coded rather than read from the token layer: this renders in
 * the edge runtime with no CSS pipeline, so it can't resolve custom properties.
 * Values mirror the dark theme in app/globals.css — keep them in sync by hand.
 */
export default function OpengraphImage() {
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
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#737373",
            }}
          >
            Senior Frontend Engineer
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: "#fafafa",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Alireza Akbarzadeh
          </div>
          <div style={{ fontSize: 34, color: "#a1a1a1", maxWidth: 900 }}>
            Frontend architecture, design systems and performance — React,
            Next.js, TypeScript.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#525252" }}>
          alireza-akbarzadeh.vercel.app
        </div>
      </div>
    ),
    size
  );
}
