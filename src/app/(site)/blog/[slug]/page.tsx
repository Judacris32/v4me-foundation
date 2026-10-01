import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, UserRound } from "lucide-react";
import { PostBody } from "@/components/blog/post-body";
import { CategoryPill, PostCard, formatDate } from "@/components/blog/post-card";
import { ShareButtons } from "@/components/blog/share-buttons";
import { CtaBand } from "@/components/sections/cta-band";
import { urlFor } from "@/sanity/client";
import { getMorePosts, getPost, getPostSlugs } from "@/sanity/queries";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 60;
// Posts published after the last deploy are still rendered on first visit.
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Story not found" };
  const image = urlFor(post.coverImage, 1200);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: image ? [{ url: image, width: 1200 }] : undefined,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const more = await getMorePosts(slug, 3);
  const cover = urlFor(post.coverImage, 2000);
  const url = `${siteConfig.url}/blog/${post.slug}`;

  return (
    <>
      {/* Hero: cover photo fills the banner, title centred on top */}
      <section className="relative isolate flex min-h-[72svh] items-center overflow-hidden bg-primary-950 text-white">
        {cover && (
          <Image src={cover} alt={post.coverImage?.alt ?? ""} fill priority sizes="100vw" className="-z-10 object-cover" />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-950/80 via-primary-950/55 to-primary-950/95" />
        <div className="mx-auto w-full max-w-4xl px-4 pt-32 pb-24 text-center sm:px-6">
          <CategoryPill value={post.category} className="px-4 py-1.5 text-xs" />
          <h1 className="mt-6 text-4xl text-balance sm:text-5xl lg:text-6xl">{post.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{post.excerpt}</p>
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-white/10 p-1.5 text-sm ring-1 ring-white/15 backdrop-blur-md">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 font-semibold text-primary-950">
              <UserRound className="h-4 w-4" aria-hidden="true" />
              {post.author ?? "V4ME Team"}
            </span>
            <span className="px-2 text-white/85">{formatDate(post.publishedAt)}</span>
            {post.readingMinutes ? (
              <span className="inline-flex items-center gap-1 px-2 text-white/85">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {Math.max(1, post.readingMinutes)} min read
              </span>
            ) : null}
          </div>
        </div>
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="absolute inset-x-0 -bottom-px h-10 w-full fill-background sm:h-14"
        >
          <path d="M0 80V40C240 5 480 0 720 22C960 44 1200 50 1440 20V80H0Z" />
        </svg>
      </section>

      <article className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-full bg-surface-muted px-4 py-2 text-sm font-semibold text-foreground/75 ring-1 ring-border-subtle transition-all hover:bg-primary-500 hover:text-white hover:ring-primary-500"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            All stories
          </Link>

          <div className="mt-10">
            <PostBody body={post.body} />
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-8 sm:flex-row">
            <p className="font-script text-2xl font-bold text-primary-600 dark:text-primary-400">Share this story</p>
            <ShareButtons url={url} title={post.title} />
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="bg-gradient-to-b from-secondary-50 to-background py-20 dark:from-secondary-950/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl text-primary-950 sm:text-4xl dark:text-white">
              Keep <em className="accent-word text-sky">reading</em>
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <PostCard key={p._id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        tone="eco"
        eyebrow="Moved by this story?"
        title="Help us write the next one"
        description="Your time or a gift keeps these outreaches going. There is a place for you in this work."
        primaryAction={{ label: "Donate now", href: "/get-involved#donate", variant: "accent" }}
        secondaryAction={{ label: "Volunteer with us", href: "/get-involved#volunteer" }}
      />
    </>
  );
}
