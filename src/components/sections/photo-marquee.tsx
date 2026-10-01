import Image from "next/image";
import { Camera, Images } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";

// Real photos from V4ME outreach and program work. The track below repeats
// this list once so the CSS marquee loops seamlessly.
const photos = [
  { src: "/images/community/aid-distribution.jpg", alt: "A V4ME volunteer distributing support to mothers and children" },
  { src: "/images/community/classroom-lesson.jpg", alt: "Students engaged in a classroom lesson at a V4ME partner school" },
  { src: "/images/community/community-gathering.jpg", alt: "Community members gathered for a V4ME outreach event" },
  { src: "/images/community/health-outreach-table.jpg", alt: "V4ME volunteers conducting a community health outreach session" },
  { src: "/images/community/sdg-awareness-group.jpg", alt: "A group session raising awareness of the Sustainable Development Goals" },
  { src: "/images/community/school-assembly.jpg", alt: "Students gathered outside their school during a V4ME community program" },
  { src: "/images/community/aid-box-handoff.jpg", alt: "A V4ME volunteer handing a relief box to a community member" },
  { src: "/images/community/classroom-mural.jpg", alt: "A classroom mural at a V4ME partner school" },
] as const;

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-6 py-6 pr-6" aria-hidden={ariaHidden}>
      {photos.map((photo, i) => (
        <div
          key={`${photo.src}-${i}`}
          className={`relative h-56 w-72 shrink-0 overflow-hidden rounded-3xl bg-white p-2 shadow-xl shadow-secondary-900/10 transition-transform duration-500 hover:scale-105 hover:rotate-0 sm:h-64 sm:w-80 dark:bg-surface ${
            i % 2 === 0 ? "-rotate-2" : "rotate-2"
          }`}
        >
          <div className="relative h-full w-full overflow-hidden rounded-2xl">
            <Image src={photo.src} alt={ariaHidden ? "" : photo.alt} fill sizes="320px" className="object-cover" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * A sky blue band, so the page cools down after the white programs
 * section. Photos drift past like prints pinned slightly off square.
 */
export function PhotoMarquee() {
  return (
    <section className="overflow-hidden bg-gradient-to-b from-secondary-50 to-secondary-100/70 py-20 sm:py-24 dark:from-secondary-950/60 dark:to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow color="secondary" icon={Camera} align="center">
            In the field
          </Eyebrow>
          <h2 className="mt-5 text-4xl text-primary-950 sm:text-5xl dark:text-white">
            Moments from the <em className="accent-word text-sky">work</em>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/70">
            No stock photos here. These are our volunteers, our partners and the communities we are proud to
            stand beside.
          </p>
        </Reveal>
      </div>

      <div
        className="mt-10 flex w-max animate-marquee hover:[animation-play-state:paused]"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <Track />
        <Track ariaHidden />
      </div>

      <Reveal delay={0.1} className="mt-10 flex justify-center px-4">
        <Button href="/gallery" variant="secondary" size="lg" icon={<Images className="h-4 w-4" />}>
          View the full gallery
        </Button>
      </Reveal>
    </section>
  );
}
