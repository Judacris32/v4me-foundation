import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { OurStory } from "@/components/sections/about/our-story";
import { FounderSpotlight } from "@/components/sections/about/founder-spotlight";
import { VisionMission } from "@/components/sections/about/vision-mission";
import { AimsObjectives } from "@/components/sections/about/aims-objectives";
import { BoardOfTrustees } from "@/components/sections/about/board-of-trustees";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Why Voice for Mother Earth Humanitarian Foundation (V4ME) exists, the people who lead it, and the vision, mission and aims behind our work.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About V4ME"
        tone="green"
        title={
          <>
            Protecting our planet, <em className="accent-word text-accent-300">uplifting</em> her people
          </>
        }
        description="Voice for Mother Earth Humanitarian Foundation is a nonprofit built on one simple belief: caring for the Earth and caring for people go hand in hand."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        image="/images/community/school-assembly.jpg"
        imageAlt="Students gathered outside their school during a V4ME community program"
      />
      <FounderSpotlight />
      <OurStory />
      <VisionMission />
      <AimsObjectives />
      <BoardOfTrustees />
    </>
  );
}
