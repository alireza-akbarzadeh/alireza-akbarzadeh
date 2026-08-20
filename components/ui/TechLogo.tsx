import { techLogo } from "@/lib/techLogos";
import { cn } from "@/lib/utils";

/**
 * One tech mark: logo + name, in a pill carrying the brand's own colour.
 *
 * The colour arrives through a CSS custom property rather than a Tailwind class
 * because the value is data — forty brands means forty hues, and a class per
 * brand would mean forty entries the compiler has to be told about. `--tint` is
 * set inline, and every visual state below is a static rule that reads it.
 *
 * The mark is coloured *at rest*, not only on hover. A stack section is one of
 * the few places where many brand colours together is the correct answer rather
 * than noise: people recognise a stack by its logos, and they recognise the
 * logos by their colour long before they read the word next to them. A grid of
 * grey glyphs makes the reader parse forty labels instead of scanning shapes.
 * Hover then adds the wash and the lift, so there is still somewhere to go.
 */
export const TechLogo = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  const { label, Icon, tint, concept } = techLogo(name);

  return (
    <li
      data-tech
      style={{ "--tint": tint } as React.CSSProperties}
      className={cn(
        "group/tech relative flex items-center gap-2.5 rounded-pill py-2 pl-2.5 pr-4",
        // The resting border already carries a trace of the brand, so the pills
        // read as a set of distinct things rather than one grey mesh.
        "border border-[color-mix(in_oklab,var(--tint)_22%,var(--color-hairline))]",
        "bg-[color-mix(in_oklab,var(--tint)_6%,var(--color-canvas-elevated))]",
        // Transform and colour only — nothing here reflows its neighbours.
        "transition-[color,border-color,transform,box-shadow] duration-200 ease-out",
        "hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--tint)_55%,transparent)]",
        "hover:shadow-[0_6px_20px_-8px_color-mix(in_oklab,var(--tint)_60%,transparent)]",
        className
      )}
    >
      {/* The wash behind the mark. Separate element so it can fade on its own
          without dragging the label's colour transition along with it. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-pill opacity-0 transition-opacity duration-200",
          "bg-[radial-gradient(120%_120%_at_12%_50%,color-mix(in_oklab,var(--tint)_18%,transparent),transparent_70%)]",
          "group-hover/tech:opacity-100"
        )}
      />

      <Icon
        aria-hidden="true"
        stroke={1.7}
        className={cn(
          "relative h-4.5 w-4.5 shrink-0 transition-[color,transform] duration-200",
          "group-hover/tech:scale-110",
          // Concept glyphs carry the tint at a lower strength: they stand for an
          // idea, not a product, and shouldn't read as loudly as a real mark
          // sitting next to them.
          concept
            ? "text-[color-mix(in_oklab,var(--tint)_55%,var(--color-faint))]"
            : "text-(--tint)"
        )}
      />

      <span className="relative font-mono text-body-sm text-body transition-colors duration-200 group-hover/tech:text-ink">
        {label}
      </span>
    </li>
  );
};

export default TechLogo;
