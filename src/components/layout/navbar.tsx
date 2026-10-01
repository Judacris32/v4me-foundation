"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { HeartHandshake, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { navLinks, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/**
 * Floating pill navbar. The whole bar is a rounded capsule that sits a
 * little below the top of the page; the links live in their own inner
 * capsule, and the current page is marked by a solid green pill that
 * glides between links (shared layoutId). Over the hero it is a frosted
 * glass pill; once the page scrolls it turns into a solid surface pill.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solid = scrolled || mobileOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-[1380px] items-center justify-between gap-3 rounded-full py-2 pr-2 pl-2.5 transition-all duration-500",
          solid
            ? "bg-surface/90 shadow-xl shadow-primary-950/10 ring-1 ring-border-subtle backdrop-blur-xl dark:bg-surface/85 dark:shadow-black/40"
            : "bg-white/10 ring-1 ring-white/25 backdrop-blur-md",
        )}
      >
        <Link href="/" className="flex shrink-0 items-center gap-2.5 rounded-full pr-2 focus-visible:outline-offset-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white p-1.5 shadow-sm ring-1 ring-black/5">
            <Image
              src="/images/logo.png"
              alt={`${siteConfig.shortName} logo`}
              width={96}
              height={100}
              priority
              className="h-full w-full object-contain"
            />
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span
              className={cn(
                "font-display text-lg font-semibold",
                solid ? "text-primary-950 dark:text-white" : "text-white",
              )}
            >
              {siteConfig.shortName}
            </span>
            <span
              className={cn(
                "font-script mt-0.5 text-[15px] font-semibold",
                solid ? "text-primary-600 dark:text-primary-400" : "text-accent-300",
              )}
            >
              Voice for Mother Earth
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          onMouseLeave={() => setHovered(null)}
          className={cn(
            "hidden items-center gap-0.5 rounded-full p-1 xl:flex",
            solid ? "bg-surface-muted ring-1 ring-border-subtle" : "bg-black/20 ring-1 ring-white/15",
          )}
        >
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3 py-2 text-[13px] font-semibold whitespace-nowrap transition-colors duration-200 2xl:px-3.5",
                  active
                    ? "text-white"
                    : solid
                      ? "text-primary-900/75 hover:text-primary-950 dark:text-white/75 dark:hover:text-white"
                      : "text-white/85 hover:text-white",
                )}
              >
                {hovered === link.href && !active && (
                  <motion.span
                    layoutId="nav-hover"
                    className={cn(
                      "absolute inset-0 -z-0 rounded-full",
                      solid ? "bg-accent-100 dark:bg-white/10" : "bg-white/15",
                    )}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 shadow-md shadow-primary-600/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <ThemeToggle onDark={!solid} />
          <Button
            href="/get-involved#donate"
            size="sm"
            variant="accent"
            icon={<HeartHandshake className="h-4 w-4" />}
            className="h-11 px-5"
          >
            Donate
          </Button>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <ThemeToggle onDark={!solid} />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:scale-105",
              solid
                ? "bg-primary-500 text-white shadow-md shadow-primary-600/30 hover:bg-primary-600"
                : "bg-white/15 text-white ring-1 ring-white/30 hover:bg-white/25",
            )}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mx-auto mt-2 max-h-[calc(100svh-6rem)] max-w-[1380px] overflow-y-auto rounded-[2rem] bg-surface p-3 shadow-2xl shadow-primary-950/20 ring-1 ring-border-subtle xl:hidden"
          >
            <nav className="grid grid-cols-2 gap-1.5 sm:grid-cols-3" aria-label="Mobile">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-4 py-3 text-center text-sm font-semibold transition-all duration-200",
                      active
                        ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md shadow-primary-600/25"
                        : "bg-surface-muted text-primary-900 hover:bg-accent-100 dark:text-white/85 dark:hover:bg-white/10",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border-subtle pt-3">
              <Button href="/get-involved#volunteer" variant="outline-primary" onClick={() => setMobileOpen(false)}>
                Volunteer
              </Button>
              <Button href="/get-involved#donate" variant="accent" onClick={() => setMobileOpen(false)}>
                Donate
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
