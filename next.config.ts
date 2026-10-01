import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Blog photos uploaded in the Sanity studio are served from Sanity's CDN.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async redirects() {
    // Old links to the Resources page land on the new Blog, and the FAQ now lives on Get Involved.
    return [{ source: "/resources", destination: "/blog", permanent: true }];
  },
};

export default nextConfig;
