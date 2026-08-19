import { cn } from "@/lib/utils";

/**
 * Two points, ascending: the two roles in workExperience, read as a line
 * rather than a list for one beat before the timeline itself takes over.
 */
export const TrajectoryGraphic = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 200 64"
    fill="none"
    aria-hidden="true"
    className={cn("text-hairline", className)}
  >
    <path
      d="M8 48L100 30L192 10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="8" cy="48" r="3" className="fill-faint" />
    <circle cx="100" cy="30" r="3" className="fill-mute" />
    <circle
      cx="192"
      cy="10"
      r="4"
      className="fill-accent-brand"
      stroke="var(--color-canvas)"
      strokeWidth="3"
    />
  </svg>
);

export default TrajectoryGraphic;
