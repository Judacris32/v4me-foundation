import { createClient, type SanityClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

// Only created once a project ID exists, so the site still runs before Sanity is set up.
export const client: SanityClient | null = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

const builder = isSanityConfigured ? createImageUrlBuilder({ projectId, dataset }) : null;

type ImageSource = Parameters<NonNullable<typeof builder>["image"]>[0];

/** Returns a sized, optimised image URL from Sanity's CDN. */
export function urlFor(source: ImageSource, width = 1600) {
  if (!builder || !source) return null;
  return builder.image(source).width(width).auto("format").fit("max").url();
}
