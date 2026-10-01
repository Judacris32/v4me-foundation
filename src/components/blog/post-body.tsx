import Image from "next/image";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { urlFor } from "@/sanity/client";
import type { Post, SanityImage } from "@/sanity/queries";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-6 text-lg leading-[1.85] text-foreground/80">{children}</p>,
    h2: ({ children }) => <h2 className="mt-14 text-3xl text-primary-950 sm:text-4xl dark:text-white">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-10 text-2xl font-semibold text-primary-950 dark:text-white">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="font-display my-10 rounded-3xl border-l-4 border-accent-400 bg-accent-50 px-7 py-6 text-2xl leading-snug text-primary-950 italic dark:bg-accent-400/10 dark:text-white">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-6 list-disc space-y-2 pl-6 text-lg leading-relaxed text-foreground/80 marker:text-primary-500">{children}</ul>,
    number: ({ children }) => <ol className="mt-6 list-decimal space-y-2 pl-6 text-lg leading-relaxed text-foreground/80 marker:font-bold marker:text-secondary-500">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-primary-950 dark:text-white">{children}</strong>,
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="font-semibold text-primary-600 underline decoration-accent-400 decoration-2 underline-offset-4 transition-colors hover:text-secondary-600 dark:text-primary-400"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: SanityImage }) => {
      const src = urlFor(value, 1600);
      if (!src) return null;
      return (
        <figure className="my-10">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl shadow-xl shadow-primary-950/10">
            <Image src={src} alt={value.alt ?? ""} fill sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
          </div>
          {value.caption && (
            <figcaption className="font-script mt-3 text-center text-lg text-foreground/60">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
};

export function PostBody({ body }: { body: Post["body"] }) {
  return (
    <div className="[&>*:first-child]:mt-0 [&>p:first-of-type]:text-xl [&>p:first-of-type]:text-foreground/90">
      <PortableText value={body} components={components} />
    </div>
  );
}
