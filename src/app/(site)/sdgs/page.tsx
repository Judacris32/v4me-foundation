import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { SdgIntro } from "@/components/sections/sdgs/sdg-intro";
import { SdgGrid } from "@/components/sections/sdgs/sdg-grid";
import { SdgPillars } from "@/components/sections/sdgs/sdg-pillars";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "SDG Alignment",
  description:
    "Our work contributes directly to 16 of the UN's 17 Sustainable Development Goals. See how each V4ME program connects to them.",
};

export default function SdgsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Global Goals"
        tone="gold"
        title={
          <>
            Our <em className="accent-word text-accent-300">SDG</em> alignment
          </>
        }
        description="Small, local work that feeds straight into the UN Sustainable Development Goals."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "SDG Alignment" }]}
        image="/images/hero/hero-sdg-poster-outreach.jpg"
        imageAlt="A V4ME volunteer walking schoolchildren through the UN Sustainable Development Goals poster"
      />
      <SdgIntro />
      <SdgGrid />
      <SdgPillars />
      <CtaBand
        tone="eco"
        eyebrow="Our work"
        title="See these goals in action"
        description="Every badge above points to a program we run today. Come and see how."
        primaryAction={{ label: "Explore our programs", href: "/programs", variant: "accent" }}
        secondaryAction={{ label: "Get involved", href: "/get-involved" }}
      />
    </>
  );
}
