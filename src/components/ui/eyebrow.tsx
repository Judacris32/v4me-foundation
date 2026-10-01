import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type EyebrowColor = "primary" | "accent" | "secondary";

type EyebrowProps = {
  children: string;
  icon?: LucideIcon;
  color?: EyebrowColor;
  /** Set on a permanently dark section so the label reads correctly
   * regardless of the site's light/dark theme. */
  onDark?: boolean;
  align?: "left" | "center";
  className?: string;
};

const iconWrap: Record<EyebrowColor, string> = {
  primary: "bg-primary-100 text-primary-600 dark:bg-primary-500/15 dark:text-primary-400",
  accent: "bg-accent-100 text-accent-700 dark:bg-accent-400/15 dark:text-accent-400",
  secondary: "bg-secondary-100 text-secondary-600 dark:bg-secondary-400/15 dark:text-secondary-400",
};

const iconWrapOnDark: Record<EyebrowColor, string> = {
  primary: "bg-primary-400/15 text-primary-300",
  accent: "bg-accent-400/15 text-accent-300",
  secondary: "bg-secondary-400/15 text-secondary-300",
};

const textColor: Record<EyebrowColor, string> = {
  primary: "text-primary-600 dark:text-primary-400",
  accent: "text-accent-700 dark:text-accent-400",
  secondary: "text-secondary-600 dark:text-secondary-400",
};

const textColorOnDark: Record<EyebrowColor, string> = {
  primary: "text-primary-300",
  accent: "text-accent-300",
  secondary: "text-secondary-300",
};

/**
 * Handwritten section label. A small round icon (or dot) followed by a
 * Caveat script line, so each section opens with a warm, human note
 * rather than a stiff uppercase tag.
 */
export function Eyebrow({
  children,
  icon: Icon,
  color = "accent",
  onDark = false,
  align = "left",
  className,
}: EyebrowProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5", align === "center" && "justify-center", className)}>
      <span
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
          onDark ? iconWrapOnDark[color] : iconWrap[color],
        )}
        aria-hidden="true"
      >
        {Icon ? <Icon className="h-3.5 w-3.5" /> : <span className="h-2 w-2 rounded-full bg-current" />}
      </span>
      <span
        className={cn(
          "font-script text-[1.45rem] leading-none font-bold",
          onDark ? textColorOnDark[color] : textColor[color],
        )}
      >
        {children}
      </span>
    </div>
  );
}
