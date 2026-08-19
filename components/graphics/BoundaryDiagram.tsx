import { cn } from "@/lib/utils";

/**
 * Three module blocks joined by a spine, with the boundary between the last
 * two drawn as a dashed amber seam. A literal illustration of the "boundaries
 * before features" principle it sits above, rather than decoration.
 */
export const BoundaryDiagram = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 480 120"
    fill="none"
    aria-hidden="true"
    className={cn("text-hairline", className)}
  >
    <path d="M100 60H190M290 60H380" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M240 34V86"
      className="text-accent-brand"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="3 5"
    />

    <rect
      x="20"
      y="30"
      width="80"
      height="60"
      rx="8"
      className="fill-canvas-elevated"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="190"
      y="24"
      width="100"
      height="72"
      rx="8"
      className="fill-canvas-elevated"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="380"
      y="30"
      width="80"
      height="60"
      rx="8"
      className="fill-canvas-elevated text-accent-brand"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    <circle cx="60" cy="60" r="3" className="fill-faint" />
    <circle cx="240" cy="60" r="3" className="fill-body" />
    <circle cx="420" cy="60" r="3" className="fill-accent-brand" />
  </svg>
);

export default BoundaryDiagram;
