import Image from "next/image";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type MerchCardProps = {
  category: string;
  title: string;
  tagline: string;
  image: string;
  imageAlt: string;
  /** Rotates the backdrop colour so the grid doesn't read as one flat block. */
  index?: number;
};

const backdrops = [
  "from-primary-50 to-primary-100 dark:from-primary-500/10 dark:to-primary-500/20",
  "from-secondary-50 to-secondary-100 dark:from-secondary-400/10 dark:to-secondary-400/20",
  "from-accent-50 to-accent-100 dark:from-accent-400/10 dark:to-accent-400/15",
];

const categoryColour = [
  "text-primary-600 dark:text-primary-400",
  "text-secondary-600 dark:text-secondary-400",
  "text-accent-700 dark:text-accent-400",
];

/**
 * Photo led product tile for the Shop lookbook. The product image is
 * contained (never cropped) on a soft tinted backdrop so mismatched source
 * photos still read as one collection. Carries a "Coming Soon" badge in
 * place of a price, since the store isn't live yet.
 */
export function MerchCard({ category, title, tagline, image, imageAlt, index = 0 }: MerchCardProps) {
  const i = index % 3;
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl bg-surface ring-1 ring-border-subtle transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/10">
      <div className={cn("relative aspect-square w-full overflow-hidden bg-gradient-to-b", backdrops[i])}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-8 drop-shadow-xl transition-transform duration-700 group-hover:scale-[1.06] group-hover:-rotate-2 sm:p-10"
        />

        <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-primary-950 px-3 py-1.5 text-[11px] font-bold tracking-wide text-white shadow-md">
          <Clock className="h-3 w-3 text-accent-400" aria-hidden="true" />
          Coming Soon
        </span>
      </div>

      <div className="flex flex-1 flex-col px-6 py-5">
        <span className={cn("font-script text-lg font-bold", categoryColour[i])}>{category}</span>
        <h3 className="mt-0.5 text-xl font-semibold text-primary-950 dark:text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground/70">{tagline}</p>
      </div>
    </div>
  );
}
