"use client";

import { useEffect, useState } from "react";
import { Briefcase, Gift, HandHeart } from "lucide-react";
import { cn } from "@/lib/utils";

const options = [
  {
    id: "volunteer",
    label: "Volunteer",
    text: "Give your time and skills to outreaches",
    icon: HandHeart,
    active: "from-primary-500 to-primary-700 text-white shadow-primary-600/30",
    idle: "bg-primary-100 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300",
  },
  {
    id: "careers",
    label: "Careers",
    text: "Paid roles and internships with the team",
    icon: Briefcase,
    active: "from-secondary-500 to-secondary-700 text-white shadow-secondary-600/30",
    idle: "bg-secondary-100 text-secondary-700 dark:bg-secondary-400/15 dark:text-secondary-300",
  },
  {
    id: "donate",
    label: "Give",
    text: "Support the work once or every month",
    icon: Gift,
    active: "from-accent-300 to-accent-500 text-primary-950 shadow-accent-500/30",
    idle: "bg-accent-100 text-accent-800 dark:bg-accent-400/15 dark:text-accent-300",
  },
] as const;

/**
 * The "Join us" chooser at the top of Get Involved: three big pill cards
 * for Volunteer, Careers and Give. The one whose section is on screen is
 * highlighted as you scroll.
 */
export function JoinUsNav() {
  const [current, setCurrent] = useState<string>("volunteer");

  useEffect(() => {
    const sections = options
      .map((o) => document.getElementById(o.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setCurrent(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <section aria-label="Ways to join us" className="bg-background pt-16 sm:pt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="font-script text-center text-2xl font-bold text-accent-700 dark:text-accent-400">Join us</p>
        <h2 className="mt-2 text-center text-3xl text-primary-950 sm:text-4xl dark:text-white">
          Pick the way that <em className="accent-word text-eco">fits you</em>
        </h2>
        <nav className="mt-8 grid gap-3 sm:grid-cols-3">
          {options.map(({ id, label, text, icon: Icon, active, idle }) => {
            const on = current === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={on ? "true" : undefined}
                className={cn(
                  "group flex items-center gap-4 rounded-full p-2 pr-6 ring-1 transition-all duration-300 hover:-translate-y-1",
                  on
                    ? cn("bg-gradient-to-r shadow-lg ring-transparent", active)
                    : "bg-surface ring-border-subtle hover:shadow-lg",
                )}
              >
                <span
                  className={cn(
                    "flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:-rotate-6",
                    on ? "bg-white/20" : idle,
                  )}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className={cn("font-display block text-xl font-semibold", !on && "text-primary-950 dark:text-white")}>
                    {label}
                  </span>
                  <span className={cn("block text-xs leading-snug", on ? "opacity-85" : "text-foreground/60")}>{text}</span>
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
