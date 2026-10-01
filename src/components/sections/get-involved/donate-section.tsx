import { Gift, Mail, Package, Repeat, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { siteConfig } from "@/lib/site-config";
import { DonateForm } from "./donate-form";

const points = [
  {
    icon: Repeat,
    title: "Monthly giving keeps us steady",
    text: "A regular gift, even a small one, lets us plan a whole season of outreaches instead of one at a time.",
    iconWrap: "bg-primary-500 text-white",
  },
  {
    icon: ShieldCheck,
    title: "Safe and simple",
    text: "Payments are handled by Paystack. We never see or store your card details.",
    iconWrap: "bg-secondary-500 text-white",
  },
  {
    icon: Package,
    title: "Prefer to give in kind?",
    text: "Materials, transport, venue space or sponsoring an outreach. Write to us and we will work out what fits.",
    iconWrap: "bg-accent-400 text-primary-950",
  },
];

/**
 * Giving section on Get Involved. Paystack checkout on the right, the why
 * and the other ways to help on the left. No "this sum buys X" claims,
 * since V4ME hasn't confirmed those figures.
 */
export function DonateSection() {
  return (
    <section
      id="donate"
      className="relative isolate scroll-mt-28 overflow-hidden bg-gradient-to-br from-accent-50 via-accent-100/70 to-accent-200/60 py-20 sm:py-28 dark:from-accent-950/40 dark:via-background dark:to-background"
    >
      <div aria-hidden="true" className="bg-dots-dark absolute inset-0 -z-10" />
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        <Reveal>
          <Eyebrow color="accent" icon={Gift}>
            Ways to give
          </Eyebrow>
          <h2 className="mt-5 text-4xl text-primary-950 sm:text-5xl dark:text-white">
            Every gift moves the work <em className="accent-word text-accent-700 dark:text-accent-400">forward</em>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-foreground/75">
            There is no price tag on generosity. Whatever you are able to give goes straight into the field: trees in
            the ground, children in class, care for families who need it.
          </p>

          <ul className="mt-10 space-y-4">
            {points.map(({ icon: Icon, title, text, iconWrap }) => (
              <li key={title} className="flex gap-4 rounded-3xl bg-surface/70 p-5 ring-1 ring-border-subtle backdrop-blur-sm">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-md ${iconWrap}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-primary-950 dark:text-white">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/70">{text}</p>
                </div>
              </li>
            ))}
          </ul>

          <a
            href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Donation Inquiry")}`}
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-primary-950 px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:bg-white dark:text-primary-950"
          >
            <Mail className="h-4 w-4 transition-transform group-hover:-rotate-12" aria-hidden="true" />
            Prefer a bank transfer? Email us
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative rounded-[2.5rem] bg-surface p-6 shadow-2xl shadow-accent-900/15 ring-1 ring-border-subtle sm:p-10 lg:sticky lg:top-28">
            <div
              aria-hidden="true"
              className="absolute inset-x-10 top-0 h-1.5 rounded-b-full bg-gradient-to-r from-accent-400 via-primary-400 to-secondary-400"
            />
            <h3 className="text-3xl font-semibold text-primary-950 dark:text-white">Make a gift</h3>
            <p className="mt-1 mb-7 text-sm text-foreground/60">Takes less than a minute.</p>
            <DonateForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
