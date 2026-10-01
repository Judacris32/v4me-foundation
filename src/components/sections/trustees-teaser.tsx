import Image from "next/image";
import { ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

// Small home page preview of the full Board of Trustees on /about.
const trustees = [
  { name: "Barrister Gambo Umaru", photo: "/images/team/trustee-gambo-umaru.jpeg" },
  { name: "Alhaji Innayatu Jubril Mohammed", photo: "/images/team/trustee-innayatu-mohammed.jpg" },
  { name: "Christie Ekwujuru", photo: "/images/team/trustee-christie-ekwujuru.jpg" },
  { name: "Mrs. Ijeoma Santos-Okpe", photo: "/images/team/trustee-ijeoma-santos-okpe.jpg" },
  { name: "Joy Ekwujuru", photo: "/images/team/trustee-joy-ekwujuru.jpg" },
  { name: "Sonia Nkechi Christopher", photo: "/images/team/trustee-sonia-christopher.jpg" },
  { name: "Bernard Emeka Afulike", photo: "/images/team/trustee-bernard-afulike.jpg" },
] as const;

const ringColours = ["ring-primary-400", "ring-secondary-400", "ring-accent-400"];

/**
 * A warm, sun gold band after the navy SDG section. Faces first, in a
 * row of portraits ringed in the three brand colours.
 */
export function TrusteesTeaser() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-accent-50 via-accent-100 to-accent-200/70 py-20 sm:py-28 dark:from-accent-950/50 dark:via-background dark:to-background">
      <div aria-hidden="true" className="bg-dots-dark absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <Eyebrow color="accent" icon={Users} align="center">
            Leadership
          </Eyebrow>
          <h2 className="mt-5 text-4xl text-primary-950 sm:text-5xl dark:text-white">
            Meet the people <em className="accent-word text-accent-700 dark:text-accent-400">behind</em> V4ME
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-primary-950/70 dark:text-white/70">
            Our board brings together people from healthcare, law, finance, education and industry. They give
            their time and experience to keep the work honest and moving.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-wrap items-start justify-center gap-x-6 gap-y-8 sm:gap-x-10">
          {trustees.map((person, i) => (
            <Reveal key={person.name} delay={i * 0.05}>
              <div className="group w-28 text-center">
                <div
                  className={cn(
                    "relative mx-auto h-24 w-24 overflow-hidden rounded-full shadow-xl ring-4 ring-offset-4 ring-offset-accent-100 transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105 dark:ring-offset-background",
                    ringColours[i % 3],
                  )}
                >
                  <Image src={person.photo} alt={person.name} fill sizes="96px" className="object-cover" />
                </div>
                <p className="mt-4 text-xs leading-snug font-bold text-primary-950 dark:text-white">{person.name}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12">
          <Button href="/about#trustees" variant="primary" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
            Meet the full board
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
