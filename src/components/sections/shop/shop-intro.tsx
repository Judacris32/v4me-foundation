import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

export function ShopIntro() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-4 -rotate-3 rounded-[2.75rem] bg-gradient-to-br from-accent-300 via-primary-300 to-secondary-300"
              />
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-[2.5rem] shadow-2xl shadow-primary-950/15">
                <Image
                  src="/images/merch/merch-lifestyle-collection.png"
                  alt="A V4ME supporter wearing the branded cap and hoodie, carrying the tote bag and water bottle"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Eyebrow color="accent" icon={ShoppingBag}>
              First look
            </Eyebrow>
            <h2 className="mt-5 text-4xl text-primary-950 sm:text-5xl dark:text-white">
              A small collection, a <em className="accent-word text-eco">big statement</em>
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/75">
              <p>
                We are putting together a small line of V4ME gear so our community can carry the mission wherever
                they go: on a morning walk, at the market or out on the next community outreach.
              </p>
              <p>
                Every piece carries the same message on the back: People. Planet. A Brighter Future. Nothing is on
                sale just yet, but early supporters can reach out to reserve a piece before the online store opens
                to everyone.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {["Caps", "Hoodies", "Totes", "Tees", "Bottles", "Jackets"].map((tag, i) => (
                <span
                  key={tag}
                  className={`rounded-full px-4 py-1.5 text-sm font-bold ${
                    [
                      "bg-primary-100 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300",
                      "bg-secondary-100 text-secondary-700 dark:bg-secondary-400/15 dark:text-secondary-300",
                      "bg-accent-100 text-accent-800 dark:bg-accent-400/15 dark:text-accent-300",
                    ][i % 3]
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
