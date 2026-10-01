import type { Metadata } from "next";
import { Feather, PenLine } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { BlogList } from "@/components/blog/blog-list";
import { NewsletterSection } from "@/components/sections/blog/newsletter-section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { getAllPosts } from "@/sanity/queries";

// Refresh from Sanity at most once a minute, so new posts show without a redeploy.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stories from the field, program updates and news from Voice for Mother Earth Humanitarian Foundation (V4ME).",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <PageHeader
        eyebrow="The V4ME Blog"
        tone="green"
        title={
          <>
            Stories from <em className="accent-word text-accent-300">the field</em>
          </>
        }
        description="Notes from our outreaches, program updates and the people behind the work, written by the V4ME team."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        image="/images/community/classroom-students.jpg"
        imageAlt="Students in a classroom during a V4ME community education program"
      />

      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <BlogList posts={posts} />
          ) : (
            <Reveal>
              <div className="mx-auto max-w-2xl rounded-[2.5rem] border-2 border-dashed border-primary-300 bg-primary-50 px-6 py-16 text-center dark:border-primary-500/40 dark:bg-primary-500/10">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500 text-white shadow-lg shadow-primary-600/30">
                  <PenLine className="h-7 w-7" aria-hidden="true" />
                </span>
                <Eyebrow color="primary" icon={Feather} align="center" className="mt-6">
                  First story on the way
                </Eyebrow>
                <h2 className="mt-4 text-3xl text-primary-950 sm:text-4xl dark:text-white">
                  Our first post is being written
                </h2>
                <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-foreground/70">
                  We are gathering photos and notes from recent outreaches. Leave your email below and you will be
                  the first to read it.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <NewsletterSection hasPosts={posts.length > 0} />
    </>
  );
}
