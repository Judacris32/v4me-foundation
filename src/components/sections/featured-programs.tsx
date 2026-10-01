import { ArrowRight, Sparkles, Sprout, GraduationCap, HeartPulse, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgramCard } from "@/components/ui/program-card";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

// A snapshot of the full program list on /programs, two from each pillar.
// Copy matches that page so the two never drift apart.
const featured = [
  {
    icon: Sprout,
    title: "Tree Planting",
    description:
      "Every drive starts with one seedling in the ground. Add hundreds of hands and it becomes restored land and greener neighbourhoods.",
    image: "/images/hero/hero-tree-planting-climate-action.jpg",
    imageAlt: "A volunteer and a child planting a tree seedling together",
    tone: "primary" as const,
  },
  {
    icon: Thermometer,
    title: "Climate Action",
    description:
      "We help communities adapt and speak up for the policies that protect them, so a changing climate never means being left behind.",
    image: "/images/hero/hero-globe-hands-forest.jpg",
    imageAlt: "Many hands lifting a globe toward the sky in a sunlit forest",
    tone: "secondary" as const,
  },
  {
    icon: GraduationCap,
    title: "Quality Education",
    description:
      "We help children stay in school and adults return to learning, with books, scholarships and classrooms that welcome everyone.",
    image: "/images/community/classroom-students.jpg",
    imageAlt: "Students engaged in a classroom lesson at a V4ME partner school",
    tone: "accent" as const,
  },
  {
    icon: HeartPulse,
    title: "Health",
    description:
      "Through outreach clinics and awareness campaigns, we bring care and good information straight to the families who need it most.",
    image: "/images/community/health-outreach-table.jpg",
    imageAlt: "V4ME volunteers conducting a community health outreach session",
    tone: "primary" as const,
  },
] as const;

export function FeaturedPrograms() {
  return (
    <section className="bg-white py-20 sm:py-28 dark:bg-surface-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <Eyebrow color="secondary" icon={Sparkles}>
              What we do
            </Eyebrow>
            <h2 className="mt-5 text-4xl text-primary-950 sm:text-5xl dark:text-white">
              Programs that put the mission <em className="accent-word text-eco">to work</em>.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-foreground/70">
              Here are a few of the environmental and humanitarian programs running right now. The full list is
              one click away.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/programs" variant="secondary" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              See all programs
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((program, i) => (
            <Reveal key={program.title} delay={(i % 4) * 0.08}>
              <ProgramCard {...program} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
