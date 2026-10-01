"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, HeartHandshake, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

type Slide = {
  src: string;
  alt: string;
  /** Object-position for the background image, tuned per-photo so the key
   * subject stays well framed as object-cover crops it across breakpoints. */
  objectPosition: string;
  eyebrow: string;
  headline: string;
  /** Part of the headline set in italic and colour. */
  accent: string;
  accentClass: string;
  subtext: string;
};

const slides: Slide[] = [
  {
    src: "/images/hero/hero-globe-hands-forest.jpg",
    alt: "Hands of many volunteers lifting a globe toward the sky in a sunlit forest",
    objectPosition: "60% 40%",
    eyebrow: "Our Mission",
    headline: "One Earth, Carried by All of Us",
    accent: "All of Us",
    accentClass: "text-accent-300",
    subtext:
      "No single person saves a planet. It takes hands from every community and every background, working side by side, one project at a time.",
  },
  {
    src: "/images/hero/hero-tree-planting-climate-action.jpg",
    alt: "A volunteer and a child planting a tree seedling together, with wind turbines on the hills behind them",
    objectPosition: "35% 60%",
    eyebrow: "Climate Action",
    headline: "Planting Trees, Raising a Generation That Cares",
    accent: "Generation",
    accentClass: "text-primary-300",
    subtext:
      "Every seedling we plant today is a quiet promise to tomorrow. We plant them together, so one generation can teach the next how to care.",
  },
  {
    src: "/images/hero/hero-food-relief-distribution.jpg",
    alt: "A volunteer handing a bag of food supplies to a family during a relief distribution",
    objectPosition: "35% 55%",
    eyebrow: "Humanitarian Relief",
    headline: "Food, Dignity, and a Hand to Hold",
    accent: "Dignity",
    accentClass: "text-accent-300",
    subtext:
      "Relief is more than a bag of supplies. It is showing up, looking someone in the eye, and making sure they know they have not been forgotten.",
  },
  {
    src: "/images/hero/hero-classroom-education.jpg",
    alt: "A teacher helping three students with their schoolwork at an outdoor desk",
    objectPosition: "50% 42%",
    eyebrow: "Quality Education",
    headline: "Every Child Deserves a Seat and a Chance",
    accent: "a Chance",
    accentClass: "text-secondary-300",
    subtext:
      "A good teacher, a few books and a little encouragement can change the direction of a child's life. We want more children to get that chance.",
  },
  {
    src: "/images/hero/hero-health-outreach.jpg",
    alt: "A health worker examining a child with a stethoscope during a community health outreach",
    objectPosition: "38% 45%",
    eyebrow: "Health Access",
    headline: "Care That Meets Communities Where They Are",
    accent: "Where They Are",
    accentClass: "text-primary-300",
    subtext:
      "For families with no clinic nearby, one outreach visit can mean an illness caught early instead of too late. So we take the care to them.",
  },
  {
    src: "/images/hero/hero-seedling-hands-soil.jpg",
    alt: "A volunteer's soil covered hands cradling a young seedling in a sunlit field",
    objectPosition: "50% 50%",
    eyebrow: "Where It Starts",
    headline: "It Starts With Two Hands and a Little Soil",
    accent: "a Little Soil",
    accentClass: "text-accent-300",
    subtext:
      "Every forest we have helped bring back started the same way: someone kneeling down, planting one seedling and trusting it to grow.",
  },
];

const AUTO_ADVANCE_MS = 6500;

function HeadlineWithAccent({ text, accent, accentClass }: { text: string; accent: string; accentClass: string }) {
  const at = text.indexOf(accent);
  if (at === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <em className={`accent-word ${accentClass}`}>{accent}</em>
      {text.slice(at + accent.length)}
    </>
  );
}

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  const active = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured stories"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden bg-primary-950 text-white"
    >
      {/* Slides */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={active.src}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1 }, scale: { duration: AUTO_ADVANCE_MS / 1000 + 1, ease: "linear" } }}
            className="absolute inset-0"
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: active.objectPosition }}
            />
          </motion.div>
        </AnimatePresence>
        {/* Legibility gradients: navy wash plus a warm glow near the copy */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/95 via-primary-950/45 to-primary-950/35" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_75%,rgba(11,19,43,0.55),transparent)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-36 pb-24 text-center sm:px-6 sm:pb-28 lg:px-8 lg:pb-32">
        <div className="mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.src}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="font-script inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-1.5 text-xl font-bold text-accent-300 ring-1 ring-white/25 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-primary-400" aria-hidden="true" />
                {active.eyebrow}
              </span>
              <h1 className="mt-6 text-[2.6rem] leading-[1.05] text-balance sm:text-6xl lg:text-7xl">
                <HeadlineWithAccent text={active.headline} accent={active.accent} accentClass={active.accentClass} />
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                {active.subtext}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href="/get-involved#volunteer" variant="accent" size="lg" icon={<HeartHandshake className="h-4.5 w-4.5" />}>
              Join Us
            </Button>
            <Button href="/get-involved#donate" variant="primary" size="lg" icon={<Leaf className="h-4.5 w-4.5" />}>
              Donate
            </Button>
            <Button href="/about" variant="outline" size="lg" icon={<ArrowRight className="h-4.5 w-4.5" />}>
              Our Story
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-14 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:text-primary-950"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-3 ring-1 ring-white/20 backdrop-blur-md"
            role="tablist"
            aria-label="Slide selector"
          >
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show slide ${i + 1}: ${slide.headline}`}
                onClick={() => goTo(i)}
                className={`group relative h-1.5 overflow-hidden rounded-full bg-white/25 transition-all duration-500 ${i === index ? "w-12" : "w-5 hover:bg-white/50"}`}
              >
                {i === index && (
                  <motion.span
                    key={`${index}-${paused}`}
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent-300 to-primary-400"
                    initial={{ width: paused ? "100%" : "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: paused ? 0 : AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                  />
                )}
              </button>
            ))}
            <span className="ml-2 font-display text-sm whitespace-nowrap text-white/80 tabular-nums">
              {String(index + 1).padStart(2, "0")}
              <span className="text-white/40"> / {String(slides.length).padStart(2, "0")}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:text-primary-950"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Soft curve into the next section */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -bottom-px z-10 h-10 w-full fill-background sm:h-16"
      >
        <path d="M0 80V40C240 5 480 0 720 22C960 44 1200 50 1440 20V80H0Z" />
      </svg>
    </section>
  );
}
