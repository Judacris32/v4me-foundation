import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Each variant has its own hover personality instead of one shared colour:
// gradients slide across (200% background, position shifts on hover), the
// button lifts slightly, a coloured glow blooms underneath, a light sheen
// sweeps across the face, and any trailing icon nudges forward.
const variantStyles = {
  accent:
    "bg-gradient-to-r from-accent-400 via-accent-300 to-accent-500 text-primary-950 shadow-md shadow-accent-500/25 hover:shadow-xl hover:shadow-accent-500/40 focus-visible:outline-accent-600",
  primary:
    "bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 text-white shadow-md shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-500/40 focus-visible:outline-primary-500",
  secondary:
    "bg-gradient-to-r from-secondary-500 via-secondary-600 to-primary-500 text-white shadow-md shadow-secondary-600/25 hover:shadow-xl hover:shadow-secondary-500/40 focus-visible:outline-secondary-500",
  outline:
    "border border-white/60 bg-white/5 text-white backdrop-blur-sm hover:border-white hover:bg-white hover:text-primary-950 hover:shadow-xl hover:shadow-black/25 focus-visible:outline-white",
  "outline-primary":
    "border-2 border-primary-500 text-primary-700 hover:border-primary-500 hover:bg-primary-500 hover:text-white hover:shadow-xl hover:shadow-primary-500/30 dark:border-primary-400 dark:text-primary-300 dark:hover:bg-primary-400 dark:hover:text-primary-950",
  ghost:
    "text-primary-700 hover:bg-primary-50 dark:text-primary-300 dark:hover:bg-white/10",
} as const;

// Gradient variants slide their background on hover.
const slidingVariants = new Set<ButtonVariant>(["accent", "primary", "secondary"]);

const sizeStyles = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-[15px]",
} as const;

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
  /** Render as a same tab internal <Link> */
  href?: string;
  /** When used with `href`, opens in a new tab as a plain <a> */
  external?: boolean;
};

export type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps>;

const baseClasses =
  "group/btn relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-tight whitespace-nowrap transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60";

function Inner({ children, icon }: { children?: ReactNode; icon?: ReactNode }) {
  return (
    <>
      {/* Light sheen that sweeps across on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-[60%] -z-10 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 transition-all duration-700 ease-out group-hover/btn:left-[120%] group-hover/btn:opacity-100"
      />
      {children}
      {icon && (
        <span className="inline-flex transition-transform duration-300 group-hover/btn:translate-x-1">{icon}</span>
      )}
    </>
  );
}

/**
 * Shared CTA button. Renders a <Link> when `href` is provided (internal
 * routing), a new tab <a> when `external` is also set, and a native
 * <button> otherwise.
 */
export function Button({
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  href,
  external,
  type,
  ...rest
}: ButtonProps) {
  const classes = cn(
    baseClasses,
    variantStyles[variant],
    slidingVariants.has(variant) && "bg-[length:200%_100%] bg-left hover:bg-right",
    sizeStyles[size],
    className,
  );

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        <Inner icon={icon}>{children}</Inner>
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        <Inner icon={icon}>{children}</Inner>
      </Link>
    );
  }

  return (
    <button
      type={type ?? "button"}
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      <Inner icon={icon}>{children}</Inner>
    </button>
  );
}
