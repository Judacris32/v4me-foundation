import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { urlFor } from "@/sanity/client";
import { categoryLabel } from "@/sanity/categories";
import type { PostSummary } from "@/sanity/queries";
import { cn } from "@/lib/utils";

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

const categoryTone: Record<string, string> = {
  environment: "bg-primary-500 text-white",
  humanitarian: "bg-secondary-500 text-white",
  "field-notes": "bg-accent-400 text-primary-950",
  news: "bg-primary-950 text-white dark:bg-white dark:text-primary-950",
  events: "bg-secondary-400 text-primary-950",
};

export function CategoryPill({ value, className }: { value?: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-[11px] font-bold",
        categoryTone[value ?? ""] ?? "bg-primary-500 text-white",
        className,
      )}
    >
      {categoryLabel(value)}
    </span>
  );
}

function Meta({ post, light = false }: { post: PostSummary; light?: boolean }) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium", light ? "text-white/75" : "text-foreground/55")}>
      <span>{formatDate(post.publishedAt)}</span>
      {post.readingMinutes ? (
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {Math.max(1, post.readingMinutes)} min read
        </span>
      ) : null}
    </p>
  );
}

/** Standard post card for the blog grid. */
export function PostCard({ post }: { post: PostSummary }) {
  const img = urlFor(post.coverImage, 900);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-surface shadow-sm ring-1 ring-border-subtle transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary-950/10"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-muted">
        {img && (
          <Image
            src={img}
            alt={post.coverImage?.alt ?? ""}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <CategoryPill value={post.category} className="absolute top-4 left-4 shadow-md" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Meta post={post} />
        <h3 className="mt-3 text-xl leading-snug font-semibold text-primary-950 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground/70">{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-primary-600 dark:text-primary-400">
          Read the story
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

/** Wide card for the featured (or newest) post. */
export function FeaturedPostCard({ post }: { post: PostSummary }) {
  const img = urlFor(post.coverImage, 1800);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative isolate flex min-h-[440px] overflow-hidden rounded-[2.5rem] text-white shadow-2xl shadow-primary-950/20 sm:min-h-[500px]"
    >
      {img && (
        <Image
          src={img}
          alt={post.coverImage?.alt ?? ""}
          fill
          priority
          sizes="(min-width: 1280px) 1216px, 100vw"
          className="-z-10 object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary-950/95 via-primary-950/50 to-primary-950/10" />
      <div className="mt-auto max-w-3xl p-7 sm:p-12">
        <div className="flex items-center gap-3">
          <span className="font-script text-2xl font-bold text-accent-300">Latest story</span>
          <CategoryPill value={post.category} />
        </div>
        <h2 className="mt-4 text-3xl text-balance sm:text-5xl">{post.title}</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{post.excerpt}</p>
        <div className="mt-6 flex flex-wrap items-center gap-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-400 px-5 py-2.5 text-sm font-bold text-primary-950 transition-all duration-300 group-hover:bg-accent-300 group-hover:shadow-lg group-hover:shadow-accent-500/40">
            Read the story
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </span>
          <Meta post={post} light />
        </div>
      </div>
    </Link>
  );
}
