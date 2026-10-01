import Image from "next/image";
import { Target } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

// Turns the mission into eight concrete commitments across the
// environmental and humanitarian pillars.
const objectives = [
  {
    title: "Environmental Protection",
    description: "Push forward conservation, reforestation and habitat restoration to protect fragile ecosystems.",
    image: "/images/icons/aim-environmental-protection.jpg",
  },
  {
    title: "Climate Action & Clean Energy",
    description: "Promote affordable, clean energy and everyday practices that help communities stand up to a changing climate.",
    image: "/images/icons/aim-climate-energy.jpg",
  },
  {
    title: "Poverty Relief & Livelihoods",
    description: "Widen access to basic needs, fair economic opportunity and livelihoods that last.",
    image: "/images/icons/aim-poverty-relief.jpg",
  },
  {
    title: "Quality Education",
    description: "Open the door to good, inclusive education for children and adults alike.",
    image: "/images/icons/aim-education.jpg",
  },
  {
    title: "Health & Clean Water",
    description: "Support public health outreach and access to clean water and proper sanitation.",
    image: "/images/icons/aim-health-water.jpg",
  },
  {
    title: "IDP & Humanitarian Relief",
    description: "Offer protection, relief and a path home to families displaced by crisis.",
    image: "/images/icons/aim-idp-relief.jpg",
  },
  {
    title: "Responsible Consumption",
    description: "Champion sustainable production and consumption, and better waste management in our communities.",
    image: "/images/icons/aim-responsible-consumption.jpg",
  },
  {
    title: "Partnerships for the Goals",
    description: "Build strong partnerships that move the UN Sustainable Development Goals forward.",
    image: "/images/icons/aim-partnerships.jpg",
  },
] as const;

const accents = [
  "ring-primary-300 group-hover:ring-primary-500",
  "ring-secondary-300 group-hover:ring-secondary-500",
  "ring-accent-300 group-hover:ring-accent-500",
];
const numberColours = [
  "text-primary-600 dark:text-primary-400",
  "text-secondary-600 dark:text-secondary-400",
  "text-accent-600 dark:text-accent-400",
];

/**
 * Soft gold tinted section on the About page, after the blue Vision band.
 */
export function AimsObjectives() {
  return (
    <section className="bg-gradient-to-b from-accent-50 to-background py-20 sm:py-28 dark:from-accent-950/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow color="accent" icon={Target} align="center">
            How we deliver
          </Eyebrow>
          <h2 className="mt-5 text-4xl text-primary-950 sm:text-5xl dark:text-white">
            Aims &amp; <em className="accent-word text-eco">objectives</em>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-foreground/70">
            Eight promises that turn our mission into real action on the ground.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {objectives.map(({ title, description, image }, i) => (
            <Reveal key={title} delay={(i % 4) * 0.06}>
              <div className="group relative flex h-full flex-col items-center rounded-3xl bg-surface p-7 text-center shadow-sm ring-1 ring-border-subtle transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary-950/10">
                <span
                  className={`font-display absolute top-5 left-6 text-sm font-semibold ${numberColours[i % 3]}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-4 ring-offset-4 ring-offset-surface transition-all duration-500 group-hover:scale-105 ${accents[i % 3]}`}
                >
                  <Image src={image} alt="" aria-hidden="true" fill sizes="96px" className="object-cover" />
                </div>
                <h3 className="mt-6 text-lg leading-snug font-semibold text-primary-950 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/65">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
