import { cn } from "@/lib/utils";

const SURFACES = [
  { label: "Storefront", x: 20 },
  { label: "Admin panel", x: 220 },
  { label: "Vendor panel", x: 420 },
];

/**
 * The shape of the argument this case study makes: three surfaces converging
 * on one shared, boundaried layer, inside one monorepo. Replaces the earlier
 * "no screenshot by design" gap — a diagram earns the space a promo capture
 * wouldn't.
 */
export const ArchitectureDiagram = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 600 220"
    fill="none"
    aria-hidden="true"
    className={cn("text-hairline", className)}
  >
    <rect
      x="6"
      y="6"
      width="588"
      height="208"
      rx="14"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="2 6"
      className="text-hairline-soft"
    />
    <text
      x="26"
      y="30"
      className="fill-faint font-mono text-[10px] uppercase"
      style={{ letterSpacing: "0.08em" }}
    >
      Monorepo
    </text>

    {SURFACES.map((surface) => (
      <g key={surface.label}>
        <rect
          x={surface.x}
          y="46"
          width="160"
          height="48"
          rx="8"
          className="fill-canvas-elevated"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <text
          x={surface.x + 80}
          y="74"
          textAnchor="middle"
          className="fill-body font-mono text-[11px]"
        >
          {surface.label}
        </text>
      </g>
    ))}

    <path
      d="M100 94V116H300V138M300 94V138M500 94V116H300V138"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    <rect
      x="140"
      y="138"
      width="320"
      height="52"
      rx="8"
      className="fill-canvas-elevated text-accent-brand"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <text
      x="300"
      y="160"
      textAnchor="middle"
      className="fill-ink font-mono text-[11px]"
    >
      Shared design system
    </text>
    <text
      x="300"
      y="176"
      textAnchor="middle"
      className="fill-mute font-mono text-[10px]"
    >
      Feature-Sliced Design boundaries
    </text>
  </svg>
);

export default ArchitectureDiagram;
