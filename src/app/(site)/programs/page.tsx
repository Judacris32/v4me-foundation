import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { PillarsIntro } from "@/components/sections/programs/pillars-intro";
import { EnvironmentalPrograms } from "@/components/sections/programs/environmental-programs";
import { HumanitarianPrograms } from "@/components/sections/programs/humanitarian-programs";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "V4ME's work rests on two pillars. Environmental programs cover waste management, tree planting, climate action and clean energy. Humanitarian programs cover poverty relief, education, health and support for displaced families.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        tone="blue"
        title={
          <>
            Two pillars, <em className="accent-word text-accent-300">one mission</em>
          </>
        }
        description="From restoring ecosystems to relief work on the ground, every V4ME program serves the same goal: a world where Mother Earth and her children thrive together."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our Work" }]}
        image="/images/community/classroom-lesson.jpg"
        imageAlt="Students in a classroom during a V4ME program session"
      />
      <PillarsIntro />
      <EnvironmentalPrograms />
      <HumanitarianPrograms />
      <CtaBand
        tone="sun"
        eyebrow="Get involved"
        title="Ready to add your voice?"
        description="Your time, your skills or your support. Whatever you can offer, there is a place for you in this work."
        primaryAction={{ label: "Donate now", href: "/get-involved#donate" }}
        secondaryAction={{ label: "Volunteer with us", href: "/get-involved#volunteer" }}
      />
    </>
  );
}
