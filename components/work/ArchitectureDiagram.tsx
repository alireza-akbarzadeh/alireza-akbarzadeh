import { cn } from "@/lib/utils";
import Reveal from "../ui/Reveal";

export type ArchitectureSpec = {
  /** The product surfaces that sit on top of the shared layers. */
  surfaces: { name: string; note: string }[];
  /** Layers, outermost first. */
  layers: { name: string; note: string; shared?: boolean }[];
  /** One line under the diagram naming what it does and does not claim. */
  footnote?: string;
};

/**
 * A layer diagram, built in HTML rather than as an exported image.
 *
 * It costs no image request, reflows properly on a phone instead of becoming an
 * unreadable postage stamp, flips with the theme, and — the part that actually
 * matters — a screen reader gets a real list of surfaces and layers rather than
 * "diagram.png". An exported SVG or PNG would fail all four.
 *
 * The content is a claim about someone's real system, so it lives in data and
 * is written from their own description, never inferred to fill the shape.
 */
export const ArchitectureDiagram = ({
  spec,
  className,
}: {
  spec: ArchitectureSpec;
  className?: string;
}) => (
  <div className={className}>
    <Reveal className="overflow-hidden rounded-card border border-hairline bg-canvas-elevated p-6 md:p-8">
      <p className="font-mono text-mono-eyebrow uppercase tracking-widest text-faint">
        Product surfaces
      </p>

      <ul className="mt-4 grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:grid-cols-3">
        {spec.surfaces.map((surface) => (
          <li key={surface.name} className="bg-canvas p-4">
            <p className="text-heading-md text-ink">{surface.name}</p>
            <p className="mt-1.5 text-body-sm leading-snug text-mute">
              {surface.note}
            </p>
          </li>
        ))}
      </ul>

      {/* The connector. aria-hidden because the nesting is already carried by
          the headings and reading order — announcing "downward arrow" three
          times adds nothing. */}
      <div aria-hidden="true" className="flex justify-center py-4">
        <div className="h-8 w-px bg-hairline" />
      </div>

      <p className="font-mono text-mono-eyebrow uppercase tracking-widest text-faint">
        Shared layers
      </p>

      <ol className="mt-4 space-y-px overflow-hidden rounded-card border border-hairline bg-hairline">
        {spec.layers.map((layer, index) => (
          <li
            key={layer.name}
            className={cn(
              "flex flex-wrap items-baseline gap-x-4 gap-y-1 bg-canvas p-4",
              layer.shared && "border-l-2 border-accent-brand"
            )}
          >
            <span
              aria-hidden="true"
              className="font-mono text-body-sm tabular-nums text-faint"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-body-md font-medium text-ink">
              {layer.name}
            </span>
            <span className="min-w-0 flex-1 text-body-sm leading-snug text-mute">
              {layer.note}
            </span>
          </li>
        ))}
      </ol>

      {spec.footnote ? (
        <p className="mt-5 text-body-sm leading-relaxed text-faint">
          {spec.footnote}
        </p>
      ) : null}
    </Reveal>
  </div>
);

export default ArchitectureDiagram;
