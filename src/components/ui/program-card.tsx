import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "primary" | "secondary" | "accent";

type ProgramCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tone?: Tone;
};

const toneStyles: Record<Tone, { icon: string; bar: string; glow: string; title: string }> = {
  primary: {
    icon: "bg-primary-500 text-white shadow-primary-600/40",
    bar: "from-primary-500 to-primary-300",
    glow: "hover:shadow-primary-500/15",
    title: "group-hover:text-primary-600 dark:group-hover:text-primary-400",
  },
  secondary: {
    icon: "bg-secondary-500 text-white shadow-secondary-600/40",
    bar: "from-secondary-500 to-secondary-300",
    glow: "hover:shadow-secondary-500/15",
    title: "group-hover:text-secondary-600 dark:group-hover:text-secondary-400",
  },
  accent: {
    icon: "bg-accent-400 text-primary-950 shadow-accent-500/40",
    bar: "from-accent-400 to-accent-200",
    glow: "hover:shadow-accent-500/20",
    title: "group-hover:text-accent-700 dark:group-hover:text-accent-400",
  },
};

/**
 * Photo led program card: image on top with an icon badge overlapping its
 * edge, title and description below, and a coloured bar that grows along
 * the bottom on hover.
 */
export function ProgramCard({ icon: Icon, title, description, image, imageAlt, tone = "primary" }: ProgramCardProps) {
  const t = toneStyles[tone];
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl bg-surface shadow-sm shadow-black/5 ring-1 ring-border-subtle transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl",
        t.glow,
      )}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/45 via-transparent to-transparent" />
      </div>

      <div className="relative flex flex-1 flex-col px-6 pb-7">
        <span
          className={cn(
            "-mt-7 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg ring-4 ring-surface transition-transform duration-500 group-hover:-rotate-6",
            t.icon,
          )}
        >
          <Icon className="h-6 w-6" />
        </span>
        <h3 className={cn("mt-4 text-xl font-semibold text-primary-950 transition-colors dark:text-white", t.title)}>
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground/70">{description}</p>
      </div>
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-500 group-hover:scale-x-100",
          t.bar,
        )}
      />
    </div>
  );
}
