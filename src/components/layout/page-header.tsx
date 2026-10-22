import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  /** Remote image URL for the banner background. */
  image?: string;
  imageAlt?: string;
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1920&q=80&auto=format&fit=crop";

/**
 * Dark photo banner used at the top of every inner page. Tall and dark
 * enough that the fixed, transparent-by-default Navbar reads correctly
 * before the user scrolls.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  image = DEFAULT_IMAGE,
  imageAlt = "",
}: PageHeaderProps) {
  return (
    <section className="relative isolate flex min-h-[52svh] w-full items-end overflow-hidden bg-primary-950 text-white sm:min-h-[46svh]">
      <div className="absolute inset-0">
        <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/70 to-black/50" />
        <div className="absolute inset-0 bg-primary-950/30 mix-blend-multiply" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-32 pb-14 text-center sm:px-6 sm:pb-16 lg:px-8">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center justify-center gap-1.5 text-xs font-medium text-white/70">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-white/40" aria-hidden="true" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-200 uppercase ring-1 ring-white/20 backdrop-blur-sm">
            {eyebrow}
          </span>
        )}

        <h1 className="font-display mx-auto mt-4 max-w-3xl text-4xl leading-[1.1] font-extrabold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>

        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
