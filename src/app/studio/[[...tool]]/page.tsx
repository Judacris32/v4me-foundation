import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-primary-950 p-6 text-center text-white">
        <div className="max-w-md">
          <h1 className="text-3xl">The blog editor isn&apos;t connected yet</h1>
          <p className="mt-4 text-white/75">
            Add <code className="rounded bg-white/10 px-1.5 py-0.5">NEXT_PUBLIC_SANITY_PROJECT_ID</code> to your
            environment variables, then restart the site. The setup guide explains where to find it.
          </p>
        </div>
      </div>
    );
  }
  return <NextStudio config={config} />;
}
