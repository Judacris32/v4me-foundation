import Image from "next/image";
import { Clock, MessageCircleHeart } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig, socialLinks } from "@/lib/site-config";
import { ContactForm } from "./contact-form";

// Real brand icon images the client provided (the same set the footer
// uses), so every icon here is an actual, recognizable platform mark
// rather than a generic outline glyph. Keeping the map keyed by social
// label also means a new entry in socialLinks (site-config.ts) picks up
// its icon automatically instead of silently rendering blank.
const socialIconImages: Record<string, string> = {
  Facebook: "/images/icons/social/facebook.png",
  Instagram: "/images/icons/social/instagram.png",
  "X (Twitter)": "/images/icons/social/x-twitter.png",
  LinkedIn: "/images/icons/social/linkedin.png",
  YouTube: "/images/icons/social/youtube.png",
  WhatsApp: "/images/icons/social/whatsapp.png",
};

const whatsAppLink = socialLinks.find((s) => s.label === "WhatsApp");

const infoCards = [
  {
    icon: "/images/icons/social/google-maps.png",
    label: "Visit Us",
    value: siteConfig.address,
    href: `https://maps.google.com/?q=${encodeURIComponent(siteConfig.address)}`,
    external: true,
  },
  {
    icon: "/images/icons/social/phone.png",
    label: "Call Us",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s+/g, "")}`,
  },
  {
    icon: "/images/icons/social/gmail.png",
    label: "Email Us",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  ...(whatsAppLink
    ? [
        {
          icon: "/images/icons/social/whatsapp.png",
          label: "Chat on WhatsApp",
          value: "Message us directly",
          href: whatsAppLink.href,
          external: true,
        },
      ]
    : []),
  {
    icon: null,
    label: "Office Hours",
    value: "Monday to Friday, 9am to 5pm (WAT)",
  },
];

const cardTones = [
  "hover:ring-primary-400 dark:hover:ring-primary-500/60",
  "hover:ring-secondary-400 dark:hover:ring-secondary-400/60",
  "hover:ring-accent-400 dark:hover:ring-accent-400/60",
];
const iconTones = [
  "bg-primary-100 dark:bg-primary-500/15",
  "bg-secondary-100 dark:bg-secondary-400/15",
  "bg-accent-100 dark:bg-accent-400/15",
];

export function ContactSection() {
  return (
    <section className="relative isolate overflow-hidden bg-background py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-40 -left-40 h-96 w-96 rounded-full bg-primary-200/40 blur-3xl dark:bg-primary-500/10" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-secondary-200/40 blur-3xl dark:bg-secondary-400/10" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-14">
          <Reveal className="lg:col-span-2">
            <Eyebrow color="secondary" icon={MessageCircleHeart}>
              Reach out
            </Eyebrow>
            <h2 className="mt-5 text-4xl text-primary-950 sm:text-5xl dark:text-white">
              We&apos;d love to <em className="accent-word text-eco">hear from you</em>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-foreground/75">
              Curious about a program, keen to volunteer or just have a question? A real person on our team reads
              every single message.
            </p>

            <div className="mt-8 space-y-3">
              {infoCards.map((item, i) => {
                const content = (
                  <div
                    className={`flex items-center gap-4 rounded-full bg-surface py-2.5 pr-5 pl-2.5 shadow-sm ring-1 ring-border-subtle transition-all duration-300 group-hover:shadow-lg group-hover:ring-2 ${cardTones[i % 3]}`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconTones[i % 3]}`}
                    >
                      {item.icon ? (
                        <Image src={item.icon} alt="" aria-hidden="true" width={28} height={28} className="h-5 w-5 object-contain" />
                      ) : (
                        <Clock className="h-5 w-5 text-accent-700 dark:text-accent-400" aria-hidden="true" />
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold tracking-wide text-foreground/50 uppercase">{item.label}</p>
                      <p className="truncate text-sm font-semibold text-foreground/90">{item.value}</p>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="group block rounded-full transition-transform duration-300 hover:translate-x-1"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              {socialLinks.map((social) => {
                const icon = socialIconImages[social.label];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-2 hover:ring-accent-400"
                  >
                    {icon && (
                      <Image
                        src={icon}
                        alt=""
                        aria-hidden="true"
                        width={40}
                        height={40}
                        className="h-6 w-6 object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    )}
                  </a>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="relative rounded-[2.5rem] bg-surface p-6 shadow-2xl shadow-primary-950/10 ring-1 ring-border-subtle sm:p-10">
              <div
                aria-hidden="true"
                className="absolute inset-x-10 top-0 h-1.5 rounded-b-full bg-gradient-to-r from-primary-500 via-secondary-400 to-accent-400"
              />
              <h3 className="text-2xl font-semibold text-primary-950 dark:text-white">Send us a note</h3>
              <p className="mt-1 mb-7 text-sm text-foreground/60">We usually reply within one working day.</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
