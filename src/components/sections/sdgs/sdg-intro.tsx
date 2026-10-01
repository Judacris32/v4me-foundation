import { Globe2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { sdgs } from "@/lib/sdg-data";

const stats = [
  {
    value: String(sdgs.length),
    label: "Goals we track",
    card: "bg-primary-500 text-white shadow-primary-600/25",
  },
  {
    value: "2",
    label: "Program pillars",
    card: "bg-secondary-500 text-white shadow-secondary-600/25",
  },
  {
    value: "8",
    label: "Core objectives",
    card: "bg-accent-400 text-primary-950 shadow-accent-500/25",
  },
];

export function SdgIntro() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <Eyebrow color="primary" icon={Globe2} align="center">
            Why these goals
          </Eyebrow>
          <p className="font-display mt-6 text-2xl leading-snug text-primary-950 sm:text-3xl dark:text-white">
            The UN set 17 Sustainable Development Goals as a shared plan for{" "}
            <em className="accent-word text-eco">people and the planet</em>.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-foreground/75">
            V4ME doesn&apos;t claim all 17. We only track the goals our programs genuinely move forward, and we
            are open about the ones we haven&apos;t reached yet.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/65">
            Every goal below is tied to a real, running initiative, not a wish on a slide. As our work reaches
            new communities and new areas, we will add the goals that come with it.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 grid grid-cols-3 gap-3 sm:gap-5">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`rounded-3xl px-3 py-6 text-center shadow-lg transition-transform duration-500 hover:-translate-y-1.5 sm:py-8 ${stat.card} ${i === 1 ? "sm:-translate-y-3 sm:hover:-translate-y-4" : ""}`}
            >
              <p className="font-display text-4xl leading-none font-semibold sm:text-5xl">{stat.value}</p>
              <p className="mt-2 text-xs leading-snug font-bold sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
