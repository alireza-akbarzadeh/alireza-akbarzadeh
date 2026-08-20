import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The project's own type scale, declared to tailwind-merge.
 *
 * tailwind-merge only ships knowledge of Tailwind's stock font sizes (text-xs …
 * text-9xl). Any other `text-*` it cannot place falls into its *colour* group —
 * so `text-button-lg` was being treated as a colour, put in the same conflict
 * group as `text-canvas`, and (arriving later in the cva recipe) silently
 * winning. The primary button lost its foreground colour and fell back to the
 * inherited body grey, on a near-black fill.
 *
 * That failure is invisible until something calls cn() on a class string that
 * carries both a colour and a size, which is why it survived this long. Naming
 * the scale here fixes it for every call site at once rather than at the one
 * that happened to surface it.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-xl",
            "heading-lg",
            "heading-md",
            "label-sm",
            "mono-eyebrow",
            "body-lg",
            "body-md",
            "body-sm",
            "button-lg",
            "button-md",
            "code",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
