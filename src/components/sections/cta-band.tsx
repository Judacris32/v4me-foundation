import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Button, type ButtonVariant } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaAction = {
  label: string;
  href: string;
  variant?: ButtonVariant;
};

type CtaBandProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  primaryAction: CtaAction;
  secondaryAction?: CtaAction;
  /** Colour story for the card, so the closing band changes from page to page. */
  tone?: "eco" | "sky" | "sun";
  /** Optional extra classes for the card. */
  cardClassName?: string;
};

const toneCard = {
  eco: "bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-600 text-white",
  sky: "bg-gradient-to-br from-secondary-700 via-secondary-600 to-primary-600 text-white",
  sun: "bg-gradient-to-br from-accent-300 via-accent-400 to-accent-500 text-primary-950",
} as const;

const toneEyebrow = {
  eco: "text-accent-300",
  sky: "text-accent-300",
  sun: "text-primary-800",
} as const;

/**
 * Closing call to action band, reused at the bottom of most pages. A bold
 * gradient card in one of three colour stories (green, blue or gold) with
 * floating decorative rings, so each page ends on its own note.
 */
export function CtaBand({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  tone = "eco",
  cardClassName,
}: CtaBandProps) {
  const onGold = tone === "sun";
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-5xl">
          <div
            className={cn(
              "relative isolate overflow-hidden rounded-[2.5rem] [clip-path:inset(0_round_2.5rem)] px-6 py-16 text-center shadow-2xl shadow-primary-950/15 sm:px-12 sm:py-20",
              toneCard[tone],
              cardClassName,
            )}
          >
            <div aria-hidden="true" className={cn("absolute inset-0 -z-10", onGold ? "bg-dots-dark" : "bg-dots")} />
            <div
              aria-hidden="true"
              className="animate-float absolute -top-16 -left-16 -z-10 h-56 w-56 rounded-full border-[28px] border-white/10"
            />
            <div
              aria-hidden="true"
              className="animate-float absolute -right-12 -bottom-20 -z-10 h-72 w-72 rounded-full bg-white/10 [animation-delay:1.5s]"
            />

            {eyebrow && (
              <span className={cn("font-script text-2xl font-bold", toneEyebrow[tone])}>{eyebrow}</span>
            )}
            <h2 className="mx-auto mt-3 max-w-3xl text-3xl text-balance sm:text-4xl lg:text-5xl">{title}</h2>
            {description && (
              <p
                className={cn(
                  "mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg",
                  onGold ? "text-primary-950/75" : "text-white/85",
                )}
              >
                {description}
              </p>
            )}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button
                href={primaryAction.href}
                variant={onGold ? "primary" : (primaryAction.variant ?? "accent")}
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                {primaryAction.label}
              </Button>
              {secondaryAction && (
                <Button
                  href={secondaryAction.href}
                  variant="outline"
                  size="lg"
                  className={cn(
                    onGold &&
                      "border-primary-950/40 bg-transparent text-primary-950 hover:border-primary-950 hover:bg-primary-950 hover:text-white",
                  )}
                >
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
