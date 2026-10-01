import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ContactSection } from "@/components/sections/contact/contact-section";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Voice for Mother Earth Humanitarian Foundation (V4ME). Ask a question, explore a partnership or just say hello.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact V4ME"
        tone="blue"
        title={
          <>
            Let&apos;s <em className="accent-word text-secondary-300">talk</em>
          </>
        }
        description="Questions, ideas or just a quick hello. Our team is always genuinely glad to hear from you."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        image="/images/hero/hero-community-interview.jpg"
        imageAlt="A V4ME team member speaking with a community elder during a field visit"
      />
      <ContactSection />
      <CtaBand
        tone="sun"
        eyebrow="Join the work"
        title="Prefer to jump straight in?"
        description="Volunteering and giving are two of the quickest ways to put your support to work."
        primaryAction={{ label: "Get involved", href: "/get-involved" }}
        secondaryAction={{ label: "Explore our programs", href: "/programs" }}
      />
    </>
  );
}
