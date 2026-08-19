import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * The system's two button shapes, chosen by context and never mixed within one:
 * `pill` for marketing CTAs, `square` (6px) for nav and utility chrome.
 * See DESIGN.md → Shapes.
 *
 * Exported as a cva recipe rather than a polymorphic component so anchors can
 * opt in with `className={button({ ... })}` without dragging in `as` prop
 * generics that TypeScript resolves badly across server/client boundaries.
 */
export const button = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "transition-colors duration-200",
    "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-brand",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: "bg-ink text-canvas hover:bg-ink/90",
        secondary:
          "border border-hairline text-ink hover:border-mute hover:bg-canvas-elevated",
        ghost: "text-body hover:text-ink",
        chrome:
          "border border-hairline bg-canvas-elevated text-body hover:border-mute hover:text-ink",
      },
      shape: {
        pill: "rounded-pill",
        square: "rounded-button",
      },
      size: {
        lg: "h-12 px-7 text-button-lg",
        md: "h-10 px-5 text-button-md",
        sm: "h-9 px-4 text-button-md",
        icon: "h-10 w-10 px-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      shape: "pill",
      size: "lg",
    },
  }
);

export type ButtonVariants = VariantProps<typeof button>;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants;

export const Button = ({
  className,
  variant,
  shape,
  size,
  ...props
}: ButtonProps) => (
  <button
    className={cn(button({ variant, shape, size }), className)}
    {...props}
  />
);

export default Button;
