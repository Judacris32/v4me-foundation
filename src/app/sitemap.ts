import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getPostSlugs } from "@/sanity/queries";

/**
 * Every real, indexable route on the site, plus each published blog post. Keep in sync with the top-level
 * pages under src/app/ — add a line here whenever a new page ships.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/programs", priority: 0.8, changeFrequency: "monthly" },
    { path: "/sdgs", priority: 0.7, changeFrequency: "monthly" },
    { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
    { path: "/get-involved", priority: 0.9, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
    { path: "/shop", priority: 0.5, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  ];

  const lastModified = new Date();

  const pages = routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Every published blog post, pulled from Sanity.
  const posts = (await getPostSlugs()).map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
