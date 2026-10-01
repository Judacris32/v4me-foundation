import { Gavel, Globe2, HandHeart, Handshake, Layers, Sprout } from "lucide-react";
import { sdgs } from "@/lib/sdg-data";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

// The UN's own five broad groupings.
const pillars = [
  {
    key: "People" as const,
    icon: HandHeart,
    title: "People",
    description: "Ending poverty and hunger, and making sure health care and schooling reach everyone.",
  },
  {
    key: "Planet" as const,
    icon: Sprout,
    title: "Planet",
    description: "Protecting the water, land, and climate every community depends on.",
  },
  {
    key: "Prosperity" as const,
    icon: Globe2,
    title: "Prosperity",
    description: "Building livelihoods, fair growth, and resilient, sustainable communities.",
  },
  {
    key: "Peace" as const,
    icon: Gavel,
    title: "Peace",
    description: "Governance, accountability, and the institutions that keep the work honest.",
  },
  {
    key: "Partnership" as const,
    icon: Handshake,
    title: "Partnership",
    description: "The collaborations with communities, donors, and allies that make progress possible.",
  },
];

const tones = [
  "bg-primary-400/15 text-primary-300 ring-primary-400/30",
  "bg-secondary-400/15 text-secondary-300 ring-secondary-400/30",
  "bg-accent-400/15 text-accent-300 ring-accent-400/30",
  "bg-secondary-400/15 text-secondary-300 ring-secondary-400/30",
  "bg-primary-400/15 text-primary-300 ring-primary-400/30",
];

/**
 * The UN's five themes on a deep navy band, so the official goal colours
 * on each chip really pop.
 */
export function SdgPillars() {
  return (
    <section className="relative isolate overflow-hidden bg-primary-950 py-20 text-white sm:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(45%_50%_at_0%_0%,rgba(56,189,248,0.18),transparent),radial-gradient(40%_45%_at_100%_100%,rgba(251,191,36,0.14),transparent)]"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow color="secondary" icon={Layers} align="center" onDark>
            The bigger picture
          </Eyebrow>
          <h2 className="mt-5 text-4xl sm:text-5xl">
            How the UN <em className="accent-word text-sun">groups</em> these goals
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/75">
            The UN sorts its 17 goals into five broad themes. The {sdgs.length} goals we track now touch every
            one of them.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            const goals = sdgs.filter((sdg) => sdg.pillar === pillar.key);
            return (
              <Reveal key={pillar.key} delay={i * 0.06}>
                <div className="group flex h-full flex-col rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/10 hover:ring-white/25">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ring-1 transition-transform duration-500 group-hover:-rotate-6 ${tones[i]}`}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{pillar.description}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                    {goals.map((goal) => (
                      <span
                        key={goal.number}
                        title={goal.name}
                        className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold text-white shadow-sm"
                        style={{ backgroundColor: goal.color }}
                      >
                        {String(goal.number).padStart(2, "0")}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
