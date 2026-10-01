import { HandHeart, Laptop2, Leaf, Mail, MessageCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { siteConfig } from "@/lib/site-config";

const ways = [
  {
    icon: Leaf,
    title: "Environmental Programs",
    description: "Tree planting, community clean ups and clean energy outreach. Hands on, outdoors and usually on a weekend.",
    iconWrap: "bg-primary-500 text-white",
    hover: "hover:ring-primary-300 dark:hover:ring-primary-500/50",
  },
  {
    icon: HandHeart,
    title: "Humanitarian Relief",
    description: "Relief distributions, health outreach and support for displaced families. Direct work with the people we serve.",
    iconWrap: "bg-secondary-500 text-white",
    hover: "hover:ring-secondary-300 dark:hover:ring-secondary-400/50",
  },
  {
    icon: Users,
    title: "Events & Organising",
    description: "Help plan and run outreach days, awareness campaigns and community events from start to finish.",
    iconWrap: "bg-accent-400 text-primary-950",
    hover: "hover:ring-accent-300 dark:hover:ring-accent-400/50",
  },
  {
    icon: Laptop2,
    title: "Remote & Skilled Help",
    description: "Design, writing, admin, photography or anything else you are good at. A lot of what we need can be done from anywhere.",
    iconWrap: "bg-primary-950 text-accent-300 dark:bg-white dark:text-primary-950",
    hover: "hover:ring-primary-900/20 dark:hover:ring-white/30",
  },
];

/**
 * No intake form here. Collecting details through a form with no backend
 * behind it just meant quietly emailing them anyway, so this goes straight
 * to a direct, prefilled email to the team.
 */
export function VolunteerSection() {
  return (
    <section id="volunteer" className="scroll-mt-28 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow color="primary" icon={HandHeart} align="center">
            Volunteer
          </Eyebrow>
          <h2 className="mt-5 text-4xl text-primary-950 sm:text-5xl dark:text-white">
            Bring your time and your <em className="accent-word text-eco">skills</em>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-foreground/75">
            Our tree planting drives, relief outreaches and community events run on people who show up. Student,
            professional, tradesperson or simply someone with a free weekend, there is a place for you here.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ways.map((way, i) => {
            const Icon = way.icon;
            return (
              <Reveal key={way.title} delay={(i % 4) * 0.07}>
                <div
                  className={`group flex h-full flex-col rounded-3xl bg-surface p-7 shadow-sm ring-1 ring-border-subtle transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/5 hover:ring-2 ${way.hover}`}
                >
                  <span
                    className={`inline-flex h-13 w-13 items-center justify-center rounded-2xl shadow-md transition-transform duration-500 group-hover:-rotate-6 ${way.iconWrap}`}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-primary-950 dark:text-white">{way.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/65">{way.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15}>
          <div className="relative isolate mx-auto mt-14 flex max-w-4xl flex-col items-center gap-6 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary-600 to-secondary-600 p-8 text-center text-white shadow-2xl shadow-primary-600/20 sm:p-12 lg:flex-row lg:text-left">
            <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />
            <div className="flex-1">
              <p className="font-display text-2xl font-semibold">Ready to lend a hand?</p>
              <p className="mt-2 text-base leading-relaxed text-white/85">
                Tell us your name, where you are based and what you would like to help with. We reply to every
                message, usually within one working day.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Volunteer Interest")}`}
                variant="accent"
                size="lg"
                icon={<Mail className="h-4 w-4" />}
              >
                Email us
              </Button>
              <Button href="/contact" variant="outline" size="lg" icon={<MessageCircle className="h-4 w-4" />}>
                Talk to the team
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
