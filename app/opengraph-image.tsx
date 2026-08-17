import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Alireza Akbarzadeh — Senior Frontend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#0b0d1c",
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
              color: "#CBACF9",
            }}
          >
            Senior Frontend Engineer
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.1,
            }}
          >
            Alireza Akbarzadeh
          </div>
          <div style={{ fontSize: 34, color: "#BEC1DD", maxWidth: 900 }}>
            Frontend architecture, design systems and performance — React,
            Next.js, TypeScript.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#8b8fa8" }}>
          alireza-akbarzadeh.vercel.app
        </div>
      </div>
    ),
    size
  );
}
