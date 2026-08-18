"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.25rem",
          background: "#0b0d1c",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", margin: 0 }}>
          Something went badly wrong.
        </h1>
        <p style={{ color: "#BEC1DD", margin: 0 }}>
          The application failed to load. Reloading usually fixes it.
        </p>
        <button
          onClick={reset}
          style={{
            border: "1px solid rgba(255,255,255,0.2)",
            background: "#161a35",
            color: "#ffffff",
            padding: "0.65rem 1.25rem",
            borderRadius: "0.5rem",
            cursor: "pointer",
          }}
        >
          Reload
        </button>
      </body>
    </html>
  );
}
