import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { VolunteerSection } from "@/components/sections/get-involved/volunteer-section";
import { DonateSection } from "@/components/sections/get-involved/donate-section";
import { FaqSection } from "@/components/sections/get-involved/faq-section";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Volunteer your time or give to support V4ME's environmental and humanitarian programs. Every hand and every gift counts.",
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get Involved"
        tone="gold"
        title={
          <>
            Every hand counts. <em className="accent-word text-accent-300">Add yours.</em>
          </>
        }
        description="An hour of your time or a gift that fuels the next outreach. Either way, there is a place for you in this work."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Get Involved" }]}
        image="/images/hero/hero-books-handout.jpg"
        imageAlt="A V4ME volunteer handing books to children during a community outreach"
      />
      <VolunteerSection />
      <DonateSection />
      <FaqSection />
      <CtaBand
        tone="sky"
        eyebrow="Still curious?"
        title="See where your support goes"
        description="Take a closer look at the environmental and humanitarian programs your time and gifts make possible."
        primaryAction={{ label: "Explore our programs", href: "/programs", variant: "accent" }}
        secondaryAction={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
