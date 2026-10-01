// Sanity connection settings, read from environment variables.
// Set these in .env.local (and in Vercel > Project > Settings > Environment Variables).
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2025-01-01";

/** False until a Sanity project ID has been added, so the site still builds and runs without one. */
export const isSanityConfigured = projectId.length > 0;
