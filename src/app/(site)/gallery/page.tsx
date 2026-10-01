import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { GalleryGrid } from "@/components/sections/gallery/gallery-grid";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Real photos of V4ME's board, team and community programs, from relief distributions to classroom visits and health outreach.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="In Pictures"
        tone="blue"
        title={
          <>
            Our <em className="accent-word text-secondary-300">gallery</em>
          </>
        }
        description="Real faces and real moments from the people and programs behind V4ME. Tap any photo to see it bigger."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        image="/images/hero/hero-gallery-collage.jpg"
        imageAlt="A collage of photographs from V4ME's outreaches pinned to a board"
      />
      <GalleryGrid />
      <CtaBand
        tone="eco"
        eyebrow="Be part of the story"
        title="Your support writes the next photo"
        description="Every picture here started with someone who showed up, whether as a volunteer, a partner or a donor."
        primaryAction={{ label: "Donate now", href: "/get-involved#donate", variant: "accent" }}
        secondaryAction={{ label: "Volunteer with us", href: "/get-involved#volunteer" }}
      />
    </>
  );
}
