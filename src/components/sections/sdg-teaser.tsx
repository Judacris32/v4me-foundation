import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Target } from "lucide-react";
import { sdgs } from "@/lib/sdg-data";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";

/**
 * Home page teaser for the SDG Alignment page, set on a deep midnight navy
 * band so the official goal colours glow against it. Each goal is a small
 * photo tile with its colour washed over the top.
 */
export function SdgTeaser() {
  return (
    <section className="relative isolate overflow-hidden bg-primary-950 py-20 text-white sm:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_10%_0%,rgba(34,197,94,0.18),transparent),radial-gradient(45%_45%_at_95%_100%,rgba(56,189,248,0.18),transparent)]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow color="primary" icon={Target} align="center" onDark>
            Our commitment
          </Eyebrow>
          <h2 className="mt-5 text-4xl sm:text-5xl">
            Local action that adds up to <em className="accent-word text-sun">global goals</em>.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/75">
            Every program we run ties back to at least one of the UN Sustainable Development Goals. It keeps us
            honest, and it makes sure the small things we do in one community add up to something bigger.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-8">
          {sdgs.map((sdg, i) => (
            <Reveal key={sdg.number} delay={(i % 8) * 0.04}>
              <Link
                href="/sdgs"
                className="group relative isolate flex aspect-square flex-col justify-between overflow-hidden rounded-3xl p-3.5 shadow-lg shadow-black/30 ring-1 ring-white/10 transition-all duration-500 hover:-translate-y-1.5 hover:rotate-1 hover:shadow-2xl"
              >
                <Image
                  src={sdg.image}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(min-width: 1024px) 150px, 45vw"
                  className="-z-10 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 -z-10 transition-opacity duration-500 group-hover:opacity-90"
                  style={{ backgroundColor: sdg.color, opacity: 0.78 }}
                  aria-hidden="true"
                />
                <span className="font-display text-3xl leading-none font-semibold text-white">
                  {String(sdg.number).padStart(2, "0")}
                </span>
                <span className="text-xs leading-tight font-bold text-white">{sdg.name}</span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 flex justify-center">
          <Button href="/sdgs" variant="accent" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
            See how each goal connects
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
