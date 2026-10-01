import { ListChecks } from "lucide-react";
import { sdgs } from "@/lib/sdg-data";
import { SdgCard } from "@/components/ui/sdg-card";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Full detail grid on a soft green tint, set apart from the cream intro
 * above and the navy pillars band below.
 */
export function SdgGrid() {
  return (
    <section className="relative isolate bg-gradient-to-b from-primary-50 via-primary-50/60 to-background py-20 sm:py-24 dark:from-primary-500/10 dark:via-background">
      <div aria-hidden="true" className="bg-dots-dark absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow color="primary" icon={ListChecks} align="center">
            {`All ${sdgs.length} goals`}
          </Eyebrow>
          <h2 className="mt-5 text-4xl text-balance text-primary-950 sm:text-5xl dark:text-white">
            Every goal, and <em className="accent-word text-eco">how we move it forward</em>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-foreground/70">
            Each card names the V4ME program behind that goal. None of it is a stretch or a nice idea for later.
            It is work already happening in the outreaches, plantings and classrooms you can read about across
            this site.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {sdgs.map((sdg, i) => (
            <Reveal key={sdg.number} delay={(i % 4) * 0.05}>
              <SdgCard sdg={sdg} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
