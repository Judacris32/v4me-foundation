import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe2, HandHeart, Leaf } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const pillars = [
  {
    icon: Leaf,
    title: "Environmental Programs",
    description: "Waste management, tree planting, climate action and clean energy for a healthier planet.",
    href: "/programs#environmental",
    image: "/images/hero/hero-seedling-hands-soil.jpg",
    imageAlt: "A volunteer's soil covered hands cradling a young seedling",
    accent: "primary" as const,
  },
  {
    icon: HandHeart,
    title: "Humanitarian Programs",
    description: "Poverty relief, quality education, health access and support for displaced families.",
    href: "/programs#humanitarian",
    image: "/images/community/classroom-students.jpg",
    imageAlt: "Students engaged in a classroom lesson at a V4ME partner school",
    accent: "secondary" as const,
  },
] as const;

const pillarAccent = {
  primary: {
    iconWrap: "bg-primary-500 text-white",
    hover: "hover:ring-primary-300 dark:hover:ring-primary-500/60",
    title: "group-hover:text-primary-600 dark:group-hover:text-primary-400",
  },
  secondary: {
    iconWrap: "bg-secondary-500 text-white",
    hover: "hover:ring-secondary-300 dark:hover:ring-secondary-400/60",
    title: "group-hover:text-secondary-600 dark:group-hover:text-secondary-400",
  },
} as const;

/**
 * "Who We Are". Sits on the warm cream page background right under the
 * hero. A framed photo with a floating tagline and a small "since" badge on
 * one side; the story and two colour coded pillar cards on the other.
 */
export function QuickIntro() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 -left-32 h-96 w-96 rounded-full bg-primary-200/40 blur-3xl dark:bg-primary-500/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-accent-200/40 blur-3xl dark:bg-accent-400/5"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:px-8">
        <Reveal>
          <div className="relative">
            <div className="relative h-[380px] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-primary-950/15 sm:h-[480px] lg:h-[560px]">
              <Image
                src="/images/community/aid-box-handoff.jpg"
                alt="A V4ME volunteer handing over a box of relief supplies to a community member"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 via-transparent to-transparent" />

              <div className="absolute right-5 bottom-5 left-5 flex items-center gap-3 rounded-full bg-white/95 py-2 pr-5 pl-2 shadow-xl backdrop-blur-sm dark:bg-surface/95">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
                  <Globe2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-script text-xl leading-tight font-bold text-primary-950 dark:text-white">
                  {siteConfig.tagline}
                </span>
              </div>
            </div>

            {/* Floating accent card */}
            <div className="animate-float absolute -top-6 -right-3 hidden rotate-3 rounded-3xl bg-accent-400 px-6 py-5 text-primary-950 shadow-xl shadow-accent-500/30 sm:block lg:-right-8">
              <p className="font-display text-4xl leading-none font-semibold">2</p>
              <p className="mt-1 text-sm font-bold">pillars, one mission</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Eyebrow icon={Globe2} color="accent">
            Who we are
          </Eyebrow>
          <h2 className="mt-5 text-4xl text-primary-950 sm:text-5xl dark:text-white">
            One foundation, two missions: <em className="accent-word text-eco">people</em> and{" "}
            <em className="accent-word text-eco">planet</em>.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground/70">
            {siteConfig.shortName} is a nonprofit that looks after the Earth and the people who live on it. We
            don&apos;t see those as two separate jobs. When a river is cleaned up, a village drinks safer water.
            When a child stays in school, a community gets a stronger future.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-foreground/70">
            So we plant, teach, heal and speak up, all at once, alongside the communities we serve.
          </p>
          <Link
            href="/about"
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-primary-50 py-2 pr-4 pl-5 text-sm font-bold text-primary-700 transition-all duration-300 hover:bg-primary-500 hover:text-white dark:bg-primary-500/15 dark:text-primary-300 dark:hover:bg-primary-500 dark:hover:text-white"
          >
            Read our full story
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {pillars.map(({ icon: Icon, title, description, href, image, imageAlt, accent }) => {
              const styles = pillarAccent[accent];
              return (
                <Link
                  key={title}
                  href={href}
                  className={cn(
                    "group relative flex flex-col overflow-hidden rounded-3xl bg-surface shadow-sm ring-1 ring-border-subtle transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:ring-2",
                    styles.hover,
                  )}
                >
                  <div className="relative h-28 w-full shrink-0 overflow-hidden">
                    <Image
                      src={image}
                      alt={imageAlt}
                      fill
                      sizes="260px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 via-transparent to-transparent" />
                    <span
                      className={cn(
                        "absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full shadow-md",
                        styles.iconWrap,
                      )}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className={cn(
                          "text-lg leading-snug font-semibold text-primary-950 transition-colors dark:text-white",
                          styles.title,
                        )}
                      >
                        {title}
                      </h3>
                      <ArrowUpRight
                        className="mt-1 h-4 w-4 shrink-0 text-foreground/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground/65">{description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
