"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHasMounted } from "@/lib/use-has-mounted";

type ThemeToggleProps = {
  className?: string;
  /** Set when the toggle sits on a photo or dark glass background. */
  onDark?: boolean;
};

/**
 * Accessible light/dark mode switch. Renders a neutral placeholder until
 * mounted so the server rendered markup never mismatches the client theme.
 */
export function ThemeToggle({ className, onDark = false }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHasMounted();

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"}
      aria-pressed={isDark}
      className={cn(
        "relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 hover:rotate-12",
        onDark
          ? "bg-white/15 text-accent-300 ring-1 ring-white/30 hover:bg-white/25"
          : "bg-surface-muted text-accent-600 ring-1 ring-border-subtle hover:bg-accent-100 dark:text-accent-400 dark:hover:bg-white/10",
        className,
      )}
    >
      <Sun
        className={cn(
          "absolute h-[18px] w-[18px] transition-all duration-300",
          isDark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
        )}
        aria-hidden="true"
      />
      <Moon
        className={cn(
          "absolute h-[18px] w-[18px] transition-all duration-300",
          isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0",
        )}
        aria-hidden="true"
      />
    </button>
  );
}
