import Image from "next/image";
import { Compass } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

const cards = [
  {
    title: "Our vision",
    image: "/images/icons/vision-globe.jpg",
    text: "A world where Mother Earth and her children live in harmony, with thriving ecosystems, resilient communities and a sustainable future for everyone.",
    badge: "bg-secondary-400 text-primary-950",
    bar: "from-secondary-400 to-secondary-200",
  },
  {
    title: "Our mission",
    image: "/images/icons/mission-seedling.jpg",
    text: "To speak up for environmental protection and social justice by promoting sustainable practices, supporting vulnerable communities and advancing the United Nations Sustainable Development Goals.",
    badge: "bg-accent-400 text-primary-950",
    bar: "from-accent-400 to-accent-200",
  },
];

/**
 * A bold sky blue band on the About page, so the page moves from cream to
 * white to blue instead of repeating one colour.
 */
export function VisionMission() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-secondary-600 via-secondary-500 to-secondary-700 py-20 text-white sm:py-28 dark:from-secondary-900 dark:via-secondary-800 dark:to-primary-950">
      <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />
      <div aria-hidden="true" className="absolute -top-32 -left-24 -z-10 h-96 w-96 rounded-full bg-primary-400/25 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-24 -bottom-32 -z-10 h-96 w-96 rounded-full bg-accent-300/25 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow color="accent" icon={Compass} onDark align="center">
            What drives us
          </Eyebrow>
          <h2 className="mt-5 text-4xl sm:text-5xl">
            Vision &amp; <em className="accent-word text-accent-300">mission</em>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={0.05 + i * 0.1}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-white p-8 text-primary-950 shadow-2xl shadow-primary-950/25 transition-transform duration-500 hover:-translate-y-1.5 sm:p-10 dark:bg-surface dark:text-white">
                <div className="flex items-center gap-5">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-4 ring-surface-muted transition-transform duration-500 group-hover:rotate-3">
                    <Image src={card.image} alt="" aria-hidden="true" fill sizes="80px" className="object-cover" />
                  </div>
                  <h3 className="text-3xl font-semibold">{card.title}</h3>
                </div>
                <p className="mt-6 text-lg leading-relaxed text-foreground/75">{card.text}</p>
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r ${card.bar}`}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
