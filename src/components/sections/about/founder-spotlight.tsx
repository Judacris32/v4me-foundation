import Image from "next/image";
import { Quote, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

// The origin narrative (five days in an underserved community, the visit
// to Bakassi) lives in our-story.tsx just below. This section stays focused
// on who Jennifer is today.
const bioParagraphs = [
  `Jennifer Kelechi Ekwujuru is an environmentalist, humanitarian and
  researcher, and the founder of Voice for Mother Earth Foundation. The
  organisation exists to protect the environment, advance sustainable
  development and restore dignity to communities hit hardest by
  environmental and humanitarian challenges.`,
  `She holds a BSc in Industrial Chemistry from the Federal University of
  Technology, Minna, and an MSc in Industrial Chemistry from Kaduna State
  University. She is also a certified Data Analyst and SDG Ambassador, with
  further training in menstrual and reproductive health advocacy and in
  leadership. That mix of science, data and advocacy shapes the way she
  leads V4ME: grounded in evidence, full of compassion and focused on
  practical action.`,
  `Jennifer is driven by a simple belief. Real change begins when people
  are given a voice, when communities help shape the solutions, and when
  the environment is treated not as a resource to use up but as a
  responsibility we all share.`,
];

const roles = ["Founder", "Environmentalist", "Humanitarian", "Researcher"];
const roleColours = [
  "bg-primary-100 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300",
  "bg-secondary-100 text-secondary-700 dark:bg-secondary-400/15 dark:text-secondary-300",
  "bg-accent-100 text-accent-800 dark:bg-accent-400/15 dark:text-accent-300",
  "bg-primary-100 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300",
];

export function FounderSpotlight() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-20 -right-40 h-[28rem] w-[28rem] rounded-full bg-secondary-200/40 blur-3xl dark:bg-secondary-400/10"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <Eyebrow color="primary" icon={Sparkles}>
              Our founder
            </Eyebrow>
            <h2 className="mt-5 text-4xl text-primary-950 sm:text-5xl dark:text-white">
              Jennifer Kelechi <em className="accent-word text-eco">Ekwujuru</em>
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {roles.map((role, i) => (
                <span key={role} className={`rounded-full px-3.5 py-1 text-xs font-bold ${roleColours[i]}`}>
                  {role}
                </span>
              ))}
            </div>

            <div className="mt-7 space-y-4 text-lg leading-relaxed text-foreground/75">
              {bioParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-4 -z-0 rotate-3 rounded-[2.75rem] bg-gradient-to-br from-primary-400 via-secondary-400 to-accent-400 opacity-80"
              />
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-[2.5rem] shadow-2xl shadow-primary-950/20">
                <Image
                  src="/images/team/founder.jpeg"
                  alt="Jennifer Kelechi Ekwujuru, Founder of Voice for Mother Earth Foundation"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>

              <figure className="relative -mt-20 ml-auto w-[88%] rounded-3xl bg-surface p-6 shadow-2xl shadow-primary-950/15 ring-1 ring-border-subtle sm:-mr-6">
                <Quote className="h-7 w-7 text-accent-500" aria-hidden="true" />
                <blockquote className="font-display mt-2 text-xl leading-snug text-primary-950 italic dark:text-white">
                  &ldquo;When we wound the Earth, we wound her children. And when we protect her, we protect
                  ourselves.&rdquo;
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-accent-400">
                    <Image
                      src="/images/team/founder-jennifer-headshot.jpg"
                      alt="Jennifer Kelechi Ekwujuru"
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </span>
                  <span className="font-script text-xl font-bold text-primary-700 dark:text-primary-300">
                    Jennifer, Founder
                  </span>
                </figcaption>
              </figure>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
