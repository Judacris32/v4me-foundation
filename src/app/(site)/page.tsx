import { Hero } from "@/components/sections/hero";
import { QuickIntro } from "@/components/sections/quick-intro";
import { ImpactStats } from "@/components/sections/impact-stats";
import { FeaturedPrograms } from "@/components/sections/featured-programs";
import { PhotoMarquee } from "@/components/sections/photo-marquee";
import { SdgTeaser } from "@/components/sections/sdg-teaser";
import { TrusteesTeaser } from "@/components/sections/trustees-teaser";
import { CtaBand } from "@/components/sections/cta-band";

export default function Home() {
  return (
    <>
      <Hero />
      <QuickIntro />
      <ImpactStats />
      <FeaturedPrograms />
      <PhotoMarquee />
      <SdgTeaser />
      <TrusteesTeaser />
      <CtaBand
        tone="eco"
        eyebrow="Join the work"
        title={
          <>
            Every hand counts. <em className="accent-word text-accent-300">Add yours.</em>
          </>
        }
        description="An hour of your time, a skill you can share or a gift that fuels the next outreach. Whatever you bring, there is a place for you here."
        primaryAction={{ label: "Donate now", href: "/get-involved#donate", variant: "accent" }}
        secondaryAction={{ label: "Volunteer with us", href: "/get-involved#volunteer" }}
      />
    </>
  );
}
