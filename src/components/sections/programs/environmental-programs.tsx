import { Leaf, Recycle, Sprout, Thermometer, Zap } from "lucide-react";
import { SectionBanner } from "@/components/ui/section-banner";
import { ProgramCard } from "@/components/ui/program-card";
import { Reveal } from "@/components/ui/reveal";

const programs = [
  {
    icon: Recycle,
    title: "Waste Management",
    description:
      "We organise community clean ups and recycling drives that pull plastic out of our waterways, and help keep it from getting there in the first place.",
    image: "/images/icons/aim-responsible-consumption.jpg",
    imageAlt: "Sorted recyclable waste materials from a community clean up drive",
  },
  {
    icon: Sprout,
    title: "Tree Planting",
    description:
      "Every drive starts with one seedling in the ground. Add hundreds of hands and it becomes restored land and greener neighbourhoods.",
    image: "/images/hero/hero-tree-planting-climate-action.jpg",
    imageAlt: "A volunteer and a child planting a tree seedling together",
  },
  {
    icon: Thermometer,
    title: "Climate Action",
    description:
      "We help communities adapt and speak up for the policies that protect them, so a changing climate never means being left behind.",
    image: "/images/hero/hero-globe-hands-forest.jpg",
    imageAlt: "Many hands lifting a globe toward the sky in a sunlit forest",
  },
  {
    icon: Zap,
    title: "Clean Energy",
    description:
      "We help bring affordable, renewable energy to the communities we serve, cutting both their bills and their reliance on fossil fuels.",
    image: "/images/icons/aim-climate-energy.jpg",
    imageAlt: "Renewable energy icon graphic representing V4ME's Clean Energy program",
  },
] as const;

export function EnvironmentalPrograms() {
  return (
    <section id="environmental" className="scroll-mt-24 bg-white pt-16 sm:pt-20 dark:bg-surface-muted">
      <SectionBanner
        eyebrow="Environmental Programs"
        icon={Leaf}
        title={
          <>
            Protecting the planet that <em className="accent-word text-accent-300">sustains</em> us
          </>
        }
        description="From cleaning up our neighbourhoods to planting trees that will outlive us, this is what caring for the planet looks like day to day."
        image="/images/hero/hero-seedling-hands-soil.jpg"
        imageAlt="A volunteer's soil covered hands cradling a young seedling"
        tone="primary"
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, i) => (
            <Reveal key={program.title} delay={(i % 4) * 0.06}>
              <ProgramCard {...program} tone={i % 2 === 0 ? "primary" : "accent"} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
