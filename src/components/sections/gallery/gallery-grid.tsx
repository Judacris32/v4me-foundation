"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, Images, X } from "lucide-react";
import { galleryCategories, type GalleryImage } from "@/lib/gallery-data";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

// Flattened list used to drive prev and next navigation inside the
// lightbox, whichever category a photo was opened from.
const allImages: GalleryImage[] = galleryCategories.flatMap((category) => category.images);

function PhotoCard({ image, onOpen, tone }: { image: GalleryImage; onOpen: () => void; tone: number }) {
  const ring = ["hover:ring-primary-400", "hover:ring-secondary-400", "hover:ring-accent-400"][tone % 3];
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group block w-full overflow-hidden rounded-3xl bg-surface p-2 text-left shadow-sm ring-1 ring-border-subtle transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary-950/10 hover:ring-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${ring}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.25rem]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute right-3 bottom-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-primary-950 opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <Expand className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
      <p className="px-3 pt-3 pb-2 text-sm leading-snug font-semibold text-primary-950 dark:text-white">{image.caption}</p>
    </button>
  );
}

const sectionHeadings: Record<string, ReactNode> = {
  people: (
    <>
      The people who <em className="accent-word text-eco">lead</em> the work
    </>
  ),
  programs: (
    <>
      Out in the <em className="accent-word text-sky">community</em>
    </>
  ),
};

export function GalleryGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openByImage = useCallback((image: GalleryImage) => {
    const idx = allImages.findIndex((img) => img.src === image.src);
    setActiveIndex(idx === -1 ? null : idx);
  }, []);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + allImages.length) % allImages.length)),
    [],
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % allImages.length)),
    [],
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, showPrev, showNext]);

  const active = useMemo(() => (activeIndex === null ? null : allImages[activeIndex]), [activeIndex]);

  return (
    <>
      {galleryCategories.map((category, ci) => (
        <section
          key={category.key}
          className={
            ci % 2 === 0
              ? "bg-background py-20 sm:py-24"
              : "bg-gradient-to-b from-secondary-50 to-background py-20 sm:py-24 dark:from-secondary-950/40"
          }
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <Eyebrow color={ci % 2 === 0 ? "primary" : "secondary"} icon={Images} align="center">
                {category.title}
              </Eyebrow>
              {sectionHeadings[category.key] && (
                <h2 className="mt-5 text-4xl text-primary-950 sm:text-5xl dark:text-white">
                  {sectionHeadings[category.key]}
                </h2>
              )}
              <p className="mt-4 text-base leading-relaxed text-foreground/70 sm:text-lg">{category.description}</p>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {category.images.map((image, i) => (
                <Reveal key={image.src} delay={(i % 4) * 0.05}>
                  <PhotoCard image={image} tone={i + ci} onOpen={() => openByImage(image)} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-primary-950"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous image"
              className="absolute left-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-primary-950 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <motion.div
              key={active.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="flex max-h-[85vh] max-w-3xl flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[75vh] w-full overflow-hidden rounded-xl">
                <Image
                  src={active.src}
                  alt={active.alt}
                  width={1000}
                  height={1250}
                  sizes="90vw"
                  className="max-h-[75vh] w-auto rounded-xl object-contain"
                />
              </div>
              <p className="mt-4 text-center text-sm font-medium text-white/90">{active.caption}</p>
            </motion.div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-primary-950 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
