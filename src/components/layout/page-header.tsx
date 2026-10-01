import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  breadcrumbs?: Crumb[];
  /** Image URL for the banner background. */
  image?: string;
  imageAlt?: string;
  /** Colour of the soft glow washed over the photo, so each page opens in its own mood. */
  tone?: "green" | "blue" | "gold";
};

// Local fallback so a page header never depends on a remote host.
const DEFAULT_IMAGE = "/images/hero/hero-globe-hands-forest.jpg";

const toneGlow = {
  green: "bg-[radial-gradient(60%_70%_at_20%_100%,rgba(34,197,94,0.45),transparent_70%)]",
  blue: "bg-[radial-gradient(60%_70%_at_80%_100%,rgba(56,189,248,0.42),transparent_70%)]",
  gold: "bg-[radial-gradient(60%_70%_at_50%_100%,rgba(251,191,36,0.38),transparent_70%)]",
} as const;

const toneEyebrow = {
  green: "text-primary-300",
  blue: "text-secondary-300",
  gold: "text-accent-300",
} as const;

/**
 * Photo banner at the top of every inner page. The image fills the whole
 * banner and the copy sits centred on top of it, under a navy wash plus a
 * coloured glow picked per page. A soft curve at the bottom eases the
 * banner into the page below.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  image = DEFAULT_IMAGE,
  imageAlt = "",
  tone = "green",
}: PageHeaderProps) {
  return (
    <section className="relative isolate flex min-h-[62svh] w-full items-center overflow-hidden bg-primary-950 text-white sm:min-h-[58svh]">
      <div className="absolute inset-0 -z-10">
        <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/80 via-primary-950/55 to-primary-950/90" />
        <div className={cn("absolute inset-0", toneGlow[tone])} />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-32 pb-24 text-center sm:px-6 lg:px-8">
        {eyebrow && (
          <span
            className={cn(
              "font-script inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-1.5 text-xl font-bold ring-1 ring-white/20 backdrop-blur-md",
              toneEyebrow[tone],
            )}
          >
            {eyebrow}
          </span>
        )}

        <h1 className="mx-auto mt-5 max-w-4xl text-4xl text-balance sm:text-5xl lg:text-6xl">{title}</h1>

        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{description}</p>
        )}

        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mt-8 flex justify-center">
            <ol className="inline-flex flex-wrap items-center justify-center gap-1 rounded-full bg-white/10 p-1 text-xs font-semibold ring-1 ring-white/15 backdrop-blur-md">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-white/40" aria-hidden="true" />}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                    >
                      {i === 0 && <Home className="h-3.5 w-3.5" aria-hidden="true" />}
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="rounded-full bg-white px-3 py-1.5 text-primary-950">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>

      {/* Soft curve into the next section */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -bottom-px h-10 w-full fill-background sm:h-14"
      >
        <path d="M0 80V40C240 5 480 0 720 22C960 44 1200 50 1440 20V80H0Z" />
      </svg>
    </section>
  );
}
