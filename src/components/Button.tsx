import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "quiet";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-wide transition-colors duration-150 " +
  "text-center leading-snug select-none";

const variants: Record<Variant, string> = {
  // Rust fill + copper edge with an inner light line, like a pressed token
  primary:
    "bg-rust text-cream border-2 border-copper shadow-[inset_0_0_0_1px_rgb(246_235_210/0.25),0_2px_0_0_var(--color-walnut-950)] " +
    "hover:bg-rust-dark active:translate-y-px",
  secondary:
    "bg-walnut-900 text-parchment border-2 border-copper shadow-[inset_0_0_0_1px_rgb(216_138_78/0.35)] " +
    "hover:bg-walnut-800 hover:text-cream active:translate-y-px",
  quiet: "text-copper-light underline decoration-copper/60 underline-offset-4 hover:text-cream hover:decoration-copper-light",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-4 py-2 text-sm",
  lg: "min-h-12 px-6 py-3 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = "") {
  return [base, variants[variant], variant === "quiet" ? "" : sizes[size], extra].join(" ");
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Opens in a new tab; pass `newTabLabel` so screen readers announce it. */
  external?: boolean;
  newTabLabel?: string;
};

/** A link styled as a button. Use `<button className={buttonClasses()}>` for actions. */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
  newTabLabel,
}: ButtonProps) {
  const classes = buttonClasses(variant, size, className);

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
        {newTabLabel ? <span className="sr-only"> {newTabLabel}</span> : null}
      </a>
    );
  }

  // In-page anchors use a plain <a> so smooth scrolling and :target work natively.
  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
