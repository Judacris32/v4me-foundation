import { Compass, Globe2, Target, Users } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CountUp } from "@/components/ui/count-up";
import { cn } from "@/lib/utils";
import { sdgs } from "@/lib/sdg-data";

// Structural counts (focus areas, objectives, goals, people) rather than
// beneficiary numbers we can't yet verify. Every figure here is a direct,
// checkable count of the Foundation's own content.
const stats = [
  {
    icon: Compass,
    value: 2,
    label: "Focus areas",
    detail: "Environmental and humanitarian work",
    iconClass: "bg-accent-400 text-primary-950",
  },
  {
    icon: Target,
    value: 8,
    label: "Core objectives",
    detail: "Each one tied to a global goal",
    iconClass: "bg-secondary-400 text-primary-950",
  },
  {
    icon: Globe2,
    value: sdgs.length,
    label: "UN goals",
    detail: "Sustainable Development Goals our work supports",
    iconClass: "bg-white text-primary-700",
  },
  {
    icon: Users,
    value: 9,
    label: "People leading",
    detail: "Trustees and team guiding the mission",
    iconClass: "bg-primary-300 text-primary-950",
  },
] as const;

/**
 * A full bleed green band, the first strong block of colour after the
 * cream intro. Numbers tick up the first time they scroll into view.
 */
export function ImpactStats() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 py-20 text-white sm:py-24">
      <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute -top-24 right-0 -z-10 h-80 w-80 rounded-full bg-secondary-400/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 left-0 -z-10 h-80 w-80 rounded-full bg-accent-400/20 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <Eyebrow color="accent" onDark>
              What we stand on
            </Eyebrow>
            <h2 className="mt-5 text-4xl sm:text-5xl">
              A small foundation with a <em className="accent-word text-accent-300">big</em> heart.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-white/85 lg:max-w-lg lg:justify-self-end">
              These are the numbers behind how we are built. They are honest counts, not guesses, and they grow
              as the work grows.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, label, detail, iconClass }, i) => (
            <Reveal key={label} delay={(i % 4) * 0.08}>
              <div className="group flex h-full flex-col rounded-3xl bg-white/10 p-7 ring-1 ring-white/15 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/15 hover:ring-white/30">
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg transition-transform duration-500 group-hover:-rotate-6",
                    iconClass,
                  )}
                >
                  <Icon className="h-5.5 w-5.5" aria-hidden="true" />
                </span>
                <span className="font-display mt-6 block text-6xl leading-none font-semibold">
                  <CountUp value={value} />
                </span>
                <span className="mt-3 block text-base font-bold">{label}</span>
                <span className="mt-1 block text-sm leading-relaxed text-white/70">{detail}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
