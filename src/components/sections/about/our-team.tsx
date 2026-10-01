import { Leaf, HandHeart, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

// PLACEHOLDER — our founder, Jennifer Kelechi Ekwujuru, has her own full
// profile in the Founder Spotlight section above. The roles below are
// structural placeholders for the rest of the team, still to be filled;
// swap the `role` list (and add photo/name/bio fields) once profiles are final.
const roles = [
  { icon: Leaf, tone: "primary", title: "Environmental Programs Lead" },
  { icon: HandHeart, tone: "accent", title: "Humanitarian Programs Lead" },
  { icon: Megaphone, tone: "secondary", title: "Communications & Partnerships" },
] as const;

const tileTone = {
  primary: "bg-primary-50 text-primary-500",
  accent: "bg-accent-50 text-accent-500",
  secondary: "bg-secondary-50 text-secondary-500",
} as const;

export function OurTeam() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow color="accent" align="center">
            The People
          </Eyebrow>
          <h2 className="font-display mt-5 text-3xl font-bold tracking-tight text-primary-950 sm:text-4xl dark:text-white">
            Our Team
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/70">
            Beyond our founder, full profiles for the rest of the team are on their way. Here&apos;s
            a preview of the people driving V4ME&apos;s work forward.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map(({ icon: Icon, tone, title }, i) => (
            <Reveal key={title} delay={(i % 4) * 0.06}>
              <div className="flex h-full flex-col items-center rounded-2xl bg-white p-6 text-center shadow-md shadow-primary-950/5 ring-1 ring-black/5">
                <span className={cn("flex h-20 w-20 items-center justify-center rounded-full", tileTone[tone])}>
                  <Icon className="h-9 w-9" aria-hidden="true" />
                </span>
                <h3 className="font-display mt-4 text-base font-semibold text-primary-950">
                  {title}
                </h3>
                <span className="mt-1 text-xs font-medium tracking-wide text-primary-900/45 uppercase">
                  Profile coming soon
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-dashed border-primary-300 bg-primary-50 p-6 text-center sm:flex-row sm:text-left dark:border-primary-700 dark:bg-primary-900/20">
            <p className="text-sm font-medium text-primary-800 dark:text-primary-100">
              Want to be part of the team driving this work? We&apos;re always open to passionate
              volunteers and collaborators.
            </p>
            <Button href="/get-involved#volunteer" variant="primary" size="sm" className="shrink-0">
              Get Involved
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
