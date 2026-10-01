import { GraduationCap, HandCoins, HandHeart, HeartPulse, Home } from "lucide-react";
import { SectionBanner } from "@/components/ui/section-banner";
import { ProgramCard } from "@/components/ui/program-card";
import { Reveal } from "@/components/ui/reveal";

const programs = [
  {
    icon: HandCoins,
    title: "Poverty Relief",
    description:
      "From food support to livelihood training, we walk beside struggling households as they build something that lasts longer than a handout: real stability.",
    image: "/images/community/aid-distribution.jpg",
    imageAlt: "A V4ME volunteer distributing support to mothers and children",
  },
  {
    icon: GraduationCap,
    title: "Quality Education",
    description:
      "We help children stay in school and adults return to learning, with books, scholarships and classrooms that welcome everyone.",
    image: "/images/community/classroom-students.jpg",
    imageAlt: "Students engaged in a classroom lesson at a V4ME partner school",
  },
  {
    icon: HeartPulse,
    title: "Health",
    description:
      "Through outreach clinics and awareness campaigns, we bring care and good information straight to the families who need it most.",
    image: "/images/community/health-outreach-table.jpg",
    imageAlt: "V4ME volunteers conducting a community health outreach session",
  },
  {
    icon: Home,
    title: "IDP Support",
    description:
      "For families forced from their homes by crisis, we offer relief, protection and a path back to stability and home.",
    image: "/images/community/community-support-outreach.jpg",
    imageAlt: "A V4ME volunteer providing support to a community member during an outreach visit",
  },
] as const;

export function HumanitarianPrograms() {
  return (
    <section id="humanitarian" className="scroll-mt-24 bg-gradient-to-b from-secondary-50 to-background pt-16 sm:pt-20 dark:from-secondary-950/40">
      <SectionBanner
        eyebrow="Humanitarian Programs"
        icon={HandHeart}
        title={
          <>
            Uplifting the people who <em className="accent-word text-accent-300">depend</em> on her
          </>
        }
        description="Food on the table, a seat in a classroom, a nurse who turns up. These are the things that hold a community together, so these are the things we show up for."
        image="/images/community/classroom-mural.jpg"
        imageAlt="A classroom decorated with a colorful learning mural during a V4ME program"
        tone="secondary"
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, i) => (
            <Reveal key={program.title} delay={(i % 4) * 0.06}>
              <ProgramCard {...program} tone={i % 2 === 0 ? "secondary" : "primary"} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
