"use client";

import { useMemo, useState } from "react";
import { blogCategories } from "@/sanity/categories";
import type { PostSummary } from "@/sanity/queries";
import { Reveal } from "@/components/ui/reveal";
import { FeaturedPostCard, PostCard } from "./post-card";
import { cn } from "@/lib/utils";

/**
 * The blog index: one big featured story, then a grid of the rest with
 * pill filters for each category that actually has posts.
 */
export function BlogList({ posts }: { posts: PostSummary[] }) {
  const [active, setActive] = useState<string>("all");

  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p._id !== featured?._id);

  const usedCategories = useMemo(
    () => blogCategories.filter((c) => rest.some((p) => p.category === c.value)),
    [rest],
  );
  const visible = active === "all" ? rest : rest.filter((p) => p.category === active);

  return (
    <>
      {featured && (
        <Reveal>
          <FeaturedPostCard post={featured} />
        </Reveal>
      )}

      {rest.length > 0 && (
        <div className="mt-16">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <h2 className="text-3xl text-primary-950 sm:text-4xl dark:text-white">
              More <em className="accent-word text-eco">stories</em>
            </h2>
            {usedCategories.length > 1 && (
              <div
                role="tablist"
                aria-label="Filter by category"
                className="flex flex-wrap gap-1 rounded-full bg-surface-muted p-1 ring-1 ring-border-subtle"
              >
                {[{ title: "All", value: "all" }, ...usedCategories].map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    role="tab"
                    aria-selected={active === c.value}
                    onClick={() => setActive(c.value)}
                    className={cn(
                      "rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-300",
                      active === c.value
                        ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md shadow-primary-600/25"
                        : "text-foreground/70 hover:bg-accent-100 hover:text-primary-950 dark:hover:bg-white/10 dark:hover:text-white",
                    )}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((post, i) => (
              <Reveal key={post._id} delay={(i % 3) * 0.06}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
