import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hides the floating "N" dev-tools badge Next.js overlays in the bottom
  // corner during `next dev`. It's dev-only (never appears in a production
  // build/deploy) but it was sitting on top of the hero CTAs while previewing.
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
        // No `search` field here on purpose: our image URLs carry query
        // strings (?w=...&q=...&auto=format&fit=crop). Next.js matches
        // `search` as an *exact* string when set, so `search: ""` would
        // reject every URL that has query params — which is every image
        // in this project. Omitting it means "any query string is fine".
      },
    ],
  },
};

export default nextConfig;
