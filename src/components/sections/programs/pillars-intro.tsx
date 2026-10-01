import Link from "next/link";
import { ArrowDown, HandHeart, Leaf } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

const pillars = [
  {
    href: "#environmental",
    icon: Leaf,
    title: "Environmental Programs",
    text: "Clean ups, tree planting, climate action and clean energy.",
    card: "from-primary-600 to-primary-800 shadow-primary-600/25",
    iconWrap: "bg-white/15 text-white",
  },
  {
    href: "#humanitarian",
    icon: HandHeart,
    title: "Humanitarian Programs",
    text: "Poverty relief, education, health and support for displaced families.",
    card: "from-secondary-500 to-secondary-700 shadow-secondary-600/25",
    iconWrap: "bg-white/15 text-white",
  },
] as const;

/**
 * Opens the Our Work page: a short, warm intro, then two big colour coded
 * panels (green for the planet, blue for people) that jump to each pillar.
 */
export function PillarsIntro() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow color="accent" align="center">
            Two halves of one whole
          </Eyebrow>
          <p className="font-display mt-6 text-2xl leading-snug text-primary-950 sm:text-3xl dark:text-white">
            Everything V4ME does falls under one of two pillars: restoring the planet, and standing beside the
            people who depend on it. They aren&apos;t separate missions. They are{" "}
            <em className="accent-word text-eco">two halves of the same work</em>.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {pillars.map(({ href, icon: Icon, title, text, card, iconWrap }, i) => (
            <Reveal key={title} delay={0.1 + i * 0.08}>
              <Link
                href={href}
                className={`group relative isolate flex h-full items-center gap-5 overflow-hidden rounded-[2rem] bg-gradient-to-br p-7 text-white shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl sm:p-8 ${card}`}
              >
                <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10 opacity-70" />
                <span
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ring-1 ring-white/25 transition-transform duration-500 group-hover:-rotate-6 ${iconWrap}`}
                >
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <span className="flex-1">
                  <span className="font-display block text-2xl font-semibold">{title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-white/80">{text}</span>
                </span>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-primary-950 transition-transform duration-500 group-hover:translate-y-1">
                  <ArrowDown className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
