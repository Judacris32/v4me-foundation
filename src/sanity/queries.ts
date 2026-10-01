import { groq, type PortableTextBlock } from "next-sanity";
import { client } from "./client";

export type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
  caption?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type PostSummary = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: SanityImage;
  category: string;
  author?: string;
  publishedAt: string;
  featured?: boolean;
  readingMinutes?: number;
};

export type Post = PostSummary & {
  body: (PortableTextBlock | SanityImage)[];
};

const summaryFields = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  category,
  author,
  publishedAt,
  featured,
  "readingMinutes": round(length(pt::text(body)) / 5 / 200)
`;

// How long pages keep a copy before checking Sanity again (seconds).
// New and edited posts appear on the live site within this window.
export const BLOG_REVALIDATE = 60;

const fetchOptions = { next: { revalidate: BLOG_REVALIDATE } };

/**
 * If Sanity can't be reached (wrong project ID, outage, network), log it and
 * fall back instead of crashing, so a deploy never fails because of the blog.
 */
async function safe<T>(fallback: T, run: () => Promise<T>): Promise<T> {
  try {
    return (await run()) ?? fallback;
  } catch (err) {
    console.error("[sanity] Could not load blog content:", err instanceof Error ? err.message : err);
    return fallback;
  }
}

export async function getAllPosts(): Promise<PostSummary[]> {
  const c = client;
  if (!c) return [];
  return safe<PostSummary[]>([], () =>
    c.fetch(
      groq`*[_type == "post" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc) { ${summaryFields} }`,
      {},
      fetchOptions,
    ),
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  const c = client;
  if (!c) return null;
  return safe<Post | null>(null, () =>
    c.fetch(groq`*[_type == "post" && slug.current == $slug][0] { ${summaryFields}, body }`, { slug }, fetchOptions),
  );
}

export async function getPostSlugs(): Promise<{ slug: string; publishedAt: string }[]> {
  const c = client;
  if (!c) return [];
  return safe<{ slug: string; publishedAt: string }[]>([], () =>
    c.fetch(
      groq`*[_type == "post" && defined(slug.current) && publishedAt <= now()] { "slug": slug.current, publishedAt }`,
      {},
      fetchOptions,
    ),
  );
}

export async function getMorePosts(slug: string, limit = 3): Promise<PostSummary[]> {
  const c = client;
  if (!c) return [];
  return safe<PostSummary[]>([], () =>
    c.fetch(
      groq`*[_type == "post" && slug.current != $slug && publishedAt <= now()] | order(publishedAt desc) [0...$limit] { ${summaryFields} }`,
      { slug, limit },
      fetchOptions,
    ),
  );
}
