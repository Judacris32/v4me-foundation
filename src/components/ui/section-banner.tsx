import type { ReactNode } from "react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type SectionBannerProps = {
  eyebrow: string;
  /** Small icon shown beside the eyebrow label. */
  icon?: LucideIcon;
  title: ReactNode;
  description?: string;
  image: string;
  imageAlt: string;
  /** Tints the overlay to match the pillar it introduces. */
  tone?: "primary" | "secondary";
};

const toneOverlay = {
  primary: "from-primary-800/95 via-primary-700/70 to-primary-950/40",
  secondary: "from-secondary-900/95 via-secondary-700/70 to-primary-950/40",
} as const;

const toneEyebrow = {
  primary: "bg-primary-400/20 text-primary-200 ring-primary-300/30",
  secondary: "bg-secondary-400/20 text-secondary-200 ring-secondary-300/30",
} as const;

/**
 * Photo banner that opens a section within a page. The photo fills the
 * banner, tinted green or blue to match the pillar it introduces, with the
 * copy centred on top.
 */
export function SectionBanner({
  eyebrow,
  icon: Icon,
  title,
  description,
  image,
  imageAlt,
  tone = "primary",
}: SectionBannerProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative isolate flex min-h-[340px] w-full items-center overflow-hidden rounded-[2.5rem] text-white shadow-2xl shadow-primary-950/15 sm:min-h-[380px]">
        <div className="absolute inset-0 -z-10">
          <Image src={image} alt={imageAlt} fill sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
          <div className={cn("absolute inset-0 bg-gradient-to-tr", toneOverlay[tone])} />
        </div>

        <div className="mx-auto w-full max-w-3xl px-6 py-14 text-center">
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase ring-1 backdrop-blur-sm",
              toneEyebrow[tone],
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
            {eyebrow}
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl text-balance sm:text-4xl lg:text-5xl">{title}</h2>
          {description && (
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
