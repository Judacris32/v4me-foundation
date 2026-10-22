"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { navLinks, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid
          ? "bg-surface/95 shadow-sm shadow-black/5 backdrop-blur supports-[backdrop-filter]:bg-surface/80"
          : "bg-gradient-to-b from-black/50 via-black/20 to-transparent",
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 rounded-md focus-visible:outline-offset-4"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 p-1.5 shadow-sm ring-1 ring-black/5 sm:h-12 sm:w-12">
            <Image
              src="/images/logo.png"
              alt={`${siteConfig.shortName} logo`}
              width={96}
              height={100}
              priority
              className="h-full w-full object-contain"
            />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span
              className={cn(
                "font-display text-base font-bold tracking-tight",
                solid ? "text-primary-800 dark:text-white" : "text-white",
              )}
            >
              {siteConfig.shortName}
            </span>
            <span
              className={cn(
                "text-[11px] font-medium tracking-wide uppercase",
                solid ? "text-primary-500 dark:text-primary-300" : "text-white/80",
              )}
            >
              Voice for Mother Earth
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                solid
                  ? "text-primary-900/80 hover:bg-primary-50 hover:text-primary-700 dark:text-white/85 dark:hover:bg-white/10 dark:hover:text-white"
                  : "text-white/90 hover:bg-white/10 hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 xl:flex">
          <ThemeToggle />
          <Button
            href="/get-involved#volunteer"
            size="sm"
            variant={solid ? "outline-primary" : "outline"}
            className="whitespace-nowrap"
          >
            Volunteer
          </Button>
          <Button href="/get-involved#donate" size="sm" variant="accent" className="whitespace-nowrap">
            Donate Now
          </Button>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
              solid
                ? "border-border-subtle text-primary-800 hover:bg-primary-50 dark:text-white dark:hover:bg-white/10"
                : "border-white/30 text-white hover:bg-white/10",
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border-subtle bg-surface xl:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-primary-900 hover:bg-primary-50 dark:text-white/90 dark:hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2.5 border-t border-border-subtle pt-4">
                <Button
                  href="/get-involved#volunteer"
                  variant="outline-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  Volunteer
                </Button>
                <Button href="/get-involved#donate" variant="accent" onClick={() => setMobileOpen(false)}>
                  Donate Now
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
