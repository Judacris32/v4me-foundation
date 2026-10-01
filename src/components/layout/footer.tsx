import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navLinks, siteConfig, socialLinks } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

// Real brand icon images the client provided.
const socialIconImages: Record<string, string> = {
  Facebook: "/images/icons/social/facebook.png",
  Instagram: "/images/icons/social/instagram.png",
  "X (Twitter)": "/images/icons/social/x-twitter.png",
  LinkedIn: "/images/icons/social/linkedin.png",
  YouTube: "/images/icons/social/youtube.png",
  WhatsApp: "/images/icons/social/whatsapp.png",
};

const exploreLinks = navLinks.slice(0, 5);
const supportLinks = navLinks.slice(5);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-primary-950 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.22),transparent_70%)]" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.16),transparent_70%)]" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.12),transparent_70%)]" />
      </div>
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-400 to-accent-400" />

      {/* Closing statement */}
      <div className="relative mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end">
          <h2 className="max-w-2xl text-3xl sm:text-4xl lg:text-5xl">
            Together, we give <em className="accent-word text-eco">Mother Earth</em> a voice.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button href="/get-involved#donate" variant="accent" size="lg">
              Give Today
            </Button>
            <Button href="/get-involved#volunteer" variant="outline" size="lg">
              Volunteer
            </Button>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.1fr] lg:gap-8">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white p-1.5 shadow-sm">
                <Image
                  src="/images/logo.png"
                  alt={`${siteConfig.shortName} logo`}
                  width={96}
                  height={100}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-semibold text-white">{siteConfig.shortName}</span>
                <span className="font-script mt-1 text-base font-semibold text-accent-300">Voice for Mother Earth</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">{siteConfig.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              {socialLinks.map((social) => {
                const icon = socialIconImages[social.label];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-400/30 hover:ring-2 hover:ring-accent-400"
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
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary-400">Explore</h3>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/75 transition-colors duration-200 hover:text-primary-300"
                  >
                    <span className="h-1.5 w-0 rounded-full bg-primary-400 transition-all duration-200 group-hover:w-3" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-secondary-400">Get Involved</h3>
            <ul className="mt-5 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/75 transition-colors duration-200 hover:text-secondary-300"
                  >
                    <span className="h-1.5 w-0 rounded-full bg-secondary-400 transition-all duration-200 group-hover:w-3" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-accent-400">Say Hello</h3>
            <ul className="mt-5 space-y-3">
              {[
                {
                  icon: "/images/icons/social/google-maps.png",
                  label: siteConfig.address,
                  href: `https://maps.google.com/?q=${encodeURIComponent(siteConfig.address)}`,
                  external: true,
                },
                {
                  icon: "/images/icons/social/phone.png",
                  label: siteConfig.phone,
                  href: `tel:${siteConfig.phone.replace(/\s+/g, "")}`,
                },
                { icon: "/images/icons/social/gmail.png", label: siteConfig.email, href: `mailto:${siteConfig.email}` },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-3 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10 transition-all duration-200 hover:bg-white/10 hover:ring-accent-400/40"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
                      <Image src={item.icon} alt="" aria-hidden="true" width={28} height={28} className="h-4 w-4 object-contain" />
                    </span>
                    <span className="flex-1 pt-1 text-sm leading-snug text-white/80 group-hover:text-white">{item.label}</span>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-white/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-300" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-6 text-center text-xs text-white/55 sm:flex-row sm:justify-between sm:px-6 sm:text-left lg:px-8">
          <span>
            © {year} {siteConfig.name}. All rights reserved.
          </span>
          <span className="font-script text-base text-white/70">{siteConfig.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
