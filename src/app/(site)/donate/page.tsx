import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CreditCard,
  GraduationCap,
  HandHeart,
  HeartPulse,
  Landmark,
  Lock,
  Mail,
  MousePointerClick,
  Newspaper,
  Package,
  Receipt,
  Repeat,
  Sprout,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { DonateForm } from "@/components/sections/get-involved/donate-form";
import { FaqSection } from "@/components/sections/get-involved/faq-section";
import { CtaBand } from "@/components/sections/cta-band";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Give once or every month to Voice for Mother Earth Humanitarian Foundation. Your gift plants trees, keeps children in class, funds health outreach and brings relief to displaced families.",
};

const causes = [
  {
    icon: Sprout,
    title: "Trees and climate",
    text: "Seedlings, tools and planting drives that bring land back to life and teach the next generation to care for it.",
    image: "/images/hero/hero-tree-planting-climate-action.jpg",
    href: "/programs#environmental",
    tone: "bg-primary-500 text-white",
  },
  {
    icon: GraduationCap,
    title: "Classrooms",
    text: "Books, learning materials and support that help children stay in school and adults return to learning.",
    image: "/images/community/classroom-students.jpg",
    href: "/programs#humanitarian",
    tone: "bg-accent-400 text-primary-950",
  },
  {
    icon: HeartPulse,
    title: "Health outreach",
    text: "Outreach days that bring checkups, care and good health information to families far from a clinic.",
    image: "/images/community/health-outreach-table.jpg",
    href: "/programs#humanitarian",
    tone: "bg-secondary-500 text-white",
  },
  {
    icon: HandHeart,
    title: "Relief for families",
    text: "Food and essentials for households in hardship and for families displaced by crisis.",
    image: "/images/community/aid-distribution.jpg",
    href: "/programs#humanitarian",
    tone: "bg-primary-950 text-white",
  },
];

const steps = [
  { icon: MousePointerClick, title: "Choose your gift", text: "Pick an amount, or type your own, and decide between once or every month." },
  { icon: Lock, title: "Pay securely", text: "You finish on Paystack's secure page with a card, bank transfer or USSD." },
  { icon: Receipt, title: "Get your receipt", text: "Paystack emails your receipt straight away. Monthly givers can manage their gift from that email." },
  { icon: Newspaper, title: "See the difference", text: "Follow the work on our blog, with stories and photos from the outreaches you make possible." },
];

const otherWays = [
  {
    icon: Landmark,
    title: "Bank transfer",
    text: "Prefer to pay straight into our account? Email us and we will send the foundation's bank details.",
    cta: "Request bank details",
    href: `mailto:${siteConfig.email}?subject=${encodeURIComponent("Donation: bank transfer details")}`,
    tone: "bg-primary-500 text-white",
  },
  {
    icon: Package,
    title: "Give in kind",
    text: "Books, seedlings, medical supplies, transport or venue space. Tell us what you have and we will match it to a need.",
    cta: "Offer supplies",
    href: `mailto:${siteConfig.email}?subject=${encodeURIComponent("Donation: in kind support")}`,
    tone: "bg-accent-400 text-primary-950",
  },
  {
    icon: Building2,
    title: "Partner or sponsor",
    text: "Companies, churches, mosques and schools can sponsor an outreach or partner with us over the long term.",
    cta: "Talk partnership",
    href: `mailto:${siteConfig.email}?subject=${encodeURIComponent("Partnership and sponsorship")}`,
    tone: "bg-secondary-500 text-white",
  },
];

const promises = [
  { icon: CreditCard, text: "Your card details go straight to Paystack and never touch our website." },
  { icon: Receipt, text: "Every gift gets an email receipt the moment it goes through." },
  { icon: Repeat, text: "Monthly gifts can be changed or cancelled any time, no questions asked." },
  { icon: BadgeCheck, text: "We share what your support makes possible, openly, on our blog." },
];

export default function DonatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Donate"
        tone="gold"
        title={
          <>
            Give so no one is <em className="accent-word text-accent-300">left behind</em>
          </>
        }
        description="For a child without books, a family without food or a village without a clinic, your kindness changes everything. Give today and help us reach the people who need it most."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Donate" }]}
        image="/images/community/aid-box-handoff.jpg"
        imageAlt="A V4ME volunteer handing over a box of relief supplies to a community member"
      />

      {/* Form + where it goes */}
      <section id="give" className="relative scroll-mt-28 bg-background py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8">
          <div>
            <Reveal>
              <Eyebrow color="accent" icon={HandHeart}>
                Where your gift goes
              </Eyebrow>
              <h2 className="mt-5 text-4xl text-primary-950 sm:text-5xl dark:text-white">
                Four ways your support <em className="accent-word text-eco">shows up</em>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-foreground/75">
                Gifts go where the need is greatest at the time, across the programs below. A monthly gift lets us plan
                a whole season of outreaches instead of one at a time.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {causes.map(({ icon: Icon, title, text, image, href, tone }, i) => (
                <Reveal key={title} delay={(i % 2) * 0.08}>
                  <Link
                    href={href}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl bg-surface shadow-sm ring-1 ring-border-subtle transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <Image src={image} alt="" aria-hidden="true" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/50 to-transparent" />
                      <span className={`absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-2xl shadow-lg ${tone}`}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xl font-semibold text-primary-950 dark:text-white">{title}</h3>
                        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-foreground/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" aria-hidden="true" />
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">{text}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1} className="lg:sticky lg:top-28">
            <div className="relative rounded-[2.5rem] bg-surface p-6 shadow-2xl shadow-accent-900/15 ring-1 ring-border-subtle sm:p-10">
              <div
                aria-hidden="true"
                className="absolute inset-x-10 top-0 h-1.5 rounded-b-full bg-gradient-to-r from-accent-400 via-primary-400 to-secondary-400"
              />
              <h2 className="text-3xl font-semibold text-primary-950 dark:text-white">Make a donation</h2>
              <p className="mt-1 mb-7 text-sm text-foreground/60">Takes less than a minute.</p>
              <DonateForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 py-20 text-white sm:py-24">
        <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />
        <div aria-hidden="true" className="absolute -top-24 right-0 -z-10 h-80 w-80 rounded-full bg-secondary-400/25 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow color="accent" onDark align="center">
              How giving works
            </Eyebrow>
            <h2 className="mt-5 text-4xl sm:text-5xl">
              Simple, safe and <em className="accent-word text-accent-300">quick</em>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="relative h-full rounded-3xl bg-white/10 p-7 ring-1 ring-white/15 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/15">
                  <span className="font-display absolute top-5 right-6 text-5xl leading-none font-semibold text-white/15">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-400 text-primary-950 shadow-lg">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Other ways */}
      <section className="bg-white py-20 sm:py-24 dark:bg-surface-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow color="secondary" icon={Package} align="center">
              Other ways to give
            </Eyebrow>
            <h2 className="mt-5 text-4xl text-primary-950 sm:text-5xl dark:text-white">
              Not paying online? <em className="accent-word text-sky">No problem.</em>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {otherWays.map(({ icon: Icon, title, text, cta, href, tone }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="group flex h-full flex-col rounded-[2rem] bg-surface p-8 shadow-sm ring-1 ring-border-subtle transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-md transition-transform duration-500 group-hover:-rotate-6 ${tone}`}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold text-primary-950 dark:text-white">{title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/70">{text}</p>
                  <Button href={href} variant="outline-primary" size="md" icon={<Mail className="h-4 w-4" />} className="mt-6 self-start">
                    {cta}
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-accent-50 via-accent-100/70 to-accent-200/60 py-20 sm:py-24 dark:from-accent-950/40 dark:via-background dark:to-background">
        <div aria-hidden="true" className="bg-dots-dark absolute inset-0 -z-10" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <Eyebrow color="accent" icon={BadgeCheck}>
              Our promise to you
            </Eyebrow>
            <h2 className="mt-5 text-4xl text-primary-950 sm:text-5xl dark:text-white">
              Your trust is the <em className="accent-word text-accent-700 dark:text-accent-400">real gift</em>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-foreground/75">
              Giving should feel good from start to finish. Here is what you can count on every time you support
              V4ME.
            </p>
            <div className="mt-8">
              <Button href="#give" variant="primary" size="lg">
                Make a gift now
              </Button>
            </div>
          </Reveal>
          <ul className="space-y-3">
            {promises.map(({ icon: Icon, text }, i) => (
              <Reveal key={text} delay={i * 0.06}>
                <li className="flex items-center gap-4 rounded-full bg-surface py-3 pr-6 pl-3 shadow-sm ring-1 ring-border-subtle">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                      ["bg-primary-500 text-white", "bg-secondary-500 text-white", "bg-accent-400 text-primary-950", "bg-primary-950 text-white"][i]
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-foreground/85">{text}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection />

      <CtaBand
        tone="sky"
        eyebrow="Rather give your time?"
        title="Volunteer or join the team"
        description="Money is one way to help. Your time and skills are another, and both matter just as much."
        primaryAction={{ label: "Volunteer with us", href: "/get-involved#volunteer", variant: "accent" }}
        secondaryAction={{ label: "See careers", href: "/get-involved#careers" }}
      />
    </>
  );
}
