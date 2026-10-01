"use client";

import { useState, type FormEvent } from "react";
import { Mail, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { siteConfig } from "@/lib/site-config";

/**
 * Field stories and articles aren't published yet, so this section says so
 * plainly instead of shipping placeholder blog posts with invented dates
 * and authors. The signup hands off to email the same way the Contact and
 * Volunteer forms do, until a real newsletter service is connected.
 */
type NewsletterSectionProps = {
  /** True when posts exist, so the copy talks about new stories rather than "coming soon". */
  hasPosts?: boolean;
};

export function NewsletterSection({ hasPosts = false }: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [handedOff, setHandedOff] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      "Newsletter Signup",
    )}&body=${encodeURIComponent(`Please add this address to the V4ME updates list: ${email}`)}`;
    window.location.href = mailto;
    setHandedOff(true);
  }

  return (
    <section className="bg-background pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate grid items-center gap-10 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary-950 via-primary-900 to-secondary-900 p-8 text-white shadow-2xl shadow-primary-950/20 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
          <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10 opacity-60" />
          <div aria-hidden="true" className="absolute -top-24 -right-24 -z-10 h-80 w-80 rounded-full bg-primary-400/25 blur-3xl" />
          <Reveal>
            <Eyebrow color="accent" icon={Newspaper} onDark>
              Stories &amp; updates
            </Eyebrow>
            <h2 className="mt-5 text-4xl sm:text-5xl">
              {hasPosts ? (
                <>
                  New stories, <em className="accent-word text-sun">straight to you</em>
                </>
              ) : (
                <>
                  Field stories are <em className="accent-word text-sun">coming soon</em>
                </>
              )}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              {hasPosts
                ? "Leave your email and we will let you know whenever a new story from the field goes up. Nothing else, no spam."
                : "We are building a home for notes from our outreaches, program updates and the people behind the work. Leave your email and we will tell you the moment the first story goes live."}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur-md sm:p-8">
              <label htmlFor="update-email" className="mb-2 block text-sm font-semibold text-white/85">
                Your email address
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="update-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-13 w-full rounded-full border border-white/20 bg-white/10 px-5 text-sm text-white placeholder:text-white/45 transition-all focus:border-accent-300 focus:bg-white/15 focus:ring-4 focus:ring-accent-300/20 focus:outline-none"
                />
                <Button type="submit" variant="accent" size="lg" icon={<Mail className="h-4 w-4" />} className="shrink-0">
                  Notify me
                </Button>
              </div>
              <p className="mt-4 text-xs text-white/55">No spam, ever. Just the good news from the field.</p>
              {handedOff && (
                <p className="mt-4 text-sm text-accent-200" role="status">
                  Opening your email app to confirm. Thank you for your patience while we build this out.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
