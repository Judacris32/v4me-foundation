"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { galleryCategories, type GalleryImage } from "@/lib/gallery-data";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

// Flattened list used to drive prev/next navigation inside the lightbox,
// regardless of which category a photo was opened from.
const allImages: GalleryImage[] = galleryCategories.flatMap((category) => category.images);

function PhotoCard({ image, onOpen }: { image: GalleryImage; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group block w-full overflow-hidden rounded-2xl border border-border-subtle bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-950/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <p className="px-4 py-3 text-sm leading-snug font-medium text-primary-950">{image.caption}</p>
    </button>
  );
}

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
          className={ci % 2 === 0 ? "bg-background py-16 sm:py-20" : "bg-surface-muted py-16 sm:py-20"}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <Eyebrow color={ci % 2 === 0 ? "primary" : "accent"} icon={Images} align="center">
                {category.title}
              </Eyebrow>
              <p className="mt-4 text-base leading-relaxed text-foreground/70 sm:text-lg">
                {category.description}
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {category.images.map((image, i) => (
                <Reveal key={image.src} delay={(i % 4) * 0.05}>
                  <PhotoCard image={image} onOpen={() => openByImage(image)} />
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
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
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
              className="absolute left-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
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
              className="absolute right-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
