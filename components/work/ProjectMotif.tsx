import { projectMotif } from "@/lib/projectMotif";
import { cn } from "@/lib/utils";

/**
 * The generated cover for a project.
 *
 * Inline SVG rather than an <img>: it costs no network request, stays crisp at
 * any size, and inherits the theme through currentColor, so it flips with
 * light/dark for free instead of needing two exported files.
 *
 * Deliberately abstract. It is a mark that identifies the project, not a
 * depiction of it — a generated picture pretending to be a product screenshot
 * would be the same lie as a stock image, just more work.
 */
const GAP = 13;
const PAD = 14;

export const ProjectMotif = ({
  slug,
  className,
  cols = 26,
  rows = 14,
}: {
  slug: string;
  className?: string;
  cols?: number;
  rows?: number;
}) => {
  const motif = projectMotif(slug, cols, rows);

  const width = (cols - 1) * GAP + PAD * 2;
  const height = (rows - 1) * GAP + PAD * 2;

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full text-mute", className)}
    >
      {motif.cells.map((cell) => (
        <circle
          key={`${cell.x}-${cell.y}`}
          cx={PAD + cell.x * GAP}
          cy={PAD + cell.y * GAP}
          r={cell.r}
          className={cell.accent ? "text-accent-brand" : undefined}
          fill="currentColor"
        />
      ))}
    </svg>
  );
};

export default ProjectMotif;
