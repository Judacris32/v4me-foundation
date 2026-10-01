import Image from "next/image";
import type { Sdg } from "@/lib/sdg-data";

type SdgCardProps = {
  sdg: Sdg;
};

/**
 * Full detail card for the SDG Alignment page. The header carries a real
 * photo with the goal's official colour washed over it, matching the home
 * page teaser tiles.
 */
export function SdgCard({ sdg }: SdgCardProps) {
  const Icon = sdg.icon;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl bg-surface shadow-sm ring-1 ring-border-subtle transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/10">
      <div className="relative isolate flex h-32 items-start justify-between overflow-hidden px-5 py-5 text-white">
        <Image
          src={sdg.image}
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 1024px) 260px, 50vw"
          className="-z-10 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 -z-10" style={{ backgroundColor: sdg.color, opacity: 0.8 }} aria-hidden="true" />
        <span className="font-display text-4xl leading-none font-semibold">{String(sdg.number).padStart(2, "0")}</span>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/30 backdrop-blur-sm transition-transform duration-500 group-hover:rotate-12">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col px-5 py-5">
        <h3 className="text-base font-semibold text-primary-950 dark:text-white">{sdg.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground/65">{sdg.connection}</p>
        <span className="mt-auto block h-1 w-10 rounded-full pt-0 transition-all duration-500 group-hover:w-full" style={{ backgroundColor: sdg.color, marginTop: "1rem" }} aria-hidden="true" />
      </div>
    </div>
  );
}
