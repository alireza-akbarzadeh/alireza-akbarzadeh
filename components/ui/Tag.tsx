import { cn } from "@/lib/utils";

/**
 * Tech-stack tag. Deliberately quiet — tags support a case study, they don't
 * headline it. Rendered as a list item so groups of them stay semantic.
 */
export const Tag = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <li
    className={cn(
      "rounded-pill border border-hairline bg-canvas-elevated px-3 py-1",
      "font-mono text-body-sm text-mute",
      className
    )}
  >
    {children}
  </li>
);

export default Tag;
