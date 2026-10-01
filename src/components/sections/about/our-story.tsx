import Image from "next/image";
import { BookOpen, Quote } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

// Real founding narrative, drawn from V4ME's founder biography document.
// See founder-spotlight.tsx for Jennifer's credentials and present day role.
const storyParagraphs = [
  `V4ME didn't begin as a plan. It began with five days in a community that
  had no electricity, no school, no clean water and no health centre.
  Families drew from the same stream for drinking and bathing. Watching
  people get through each day, and seeing what a medical emergency looks
  like with no clinic nearby, stayed with our founder, Jennifer, long after
  she left.`,
  `A later visit to Bakassi, where she saw children and adults struggling
  with severe food insecurity, deepened that conviction. These were not
  distant statistics. They were real people in communities that deserved
  far more attention, dignity and opportunity than they were getting.`,
  `That was when protecting the planet and protecting people stopped being
  two separate causes. They became one task: clean water and energy, good
  schools and healthcare, stronger communities and practical solutions
  linked to the UN Sustainable Development Goals. Preparedness mattered
  too, because Jennifer had seen how quickly a flood can turn from an
  environmental event into a humanitarian crisis.`,
  `Voice for Mother Earth Foundation was started to close that gap, giving
  Mother Earth and the people who depend on her one united voice. Every
  program we run today, from reforestation drives to relief outreach,
  still comes back to that same conviction.`,
];

const milestones = [
  { label: "Five days", text: "in a community with no power, school, clinic or clean water" },
  { label: "Bakassi", text: "where hunger among children made the need impossible to ignore" },
  { label: "One voice", text: "for the planet and the people who depend on her" },
];

const milestoneColours = ["bg-primary-500", "bg-secondary-500", "bg-accent-400"];

export function OurStory() {
  return (
    <section className="bg-white py-20 sm:py-28 dark:bg-surface-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-[2.5rem] shadow-2xl shadow-primary-950/15">
              <Image
                src="/images/community/aid-box-handoff.jpg"
                alt="A V4ME volunteer handing a relief box to a community member during a distribution outreach"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/85 via-primary-950/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                <Quote className="h-7 w-7 text-accent-300" aria-hidden="true" />
                <p className="font-display mt-2 text-xl leading-snug italic">
                  &ldquo;The Earth is wounded, and her children are hurting. Every polluted river, devastated
                  community, and lost life is a reminder that when we wound the Earth, we wound ourselves.&rdquo;
                </p>
                <p className="font-script mt-3 text-xl font-bold text-accent-300">Jennifer, Founder</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Eyebrow color="accent" icon={BookOpen}>
              Our story
            </Eyebrow>
            <h2 className="mt-5 text-4xl text-primary-950 sm:text-5xl dark:text-white">
              The journey that <em className="accent-word text-accent-600 dark:text-accent-400">became</em> V4ME
            </h2>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {milestones.map((m, i) => (
                <div key={m.label} className="rounded-2xl bg-surface-muted p-4 ring-1 ring-border-subtle dark:bg-surface">
                  <span className={`block h-1.5 w-8 rounded-full ${milestoneColours[i]}`} aria-hidden="true" />
                  <p className="font-display mt-3 text-lg font-semibold text-primary-950 dark:text-white">{m.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-foreground/65">{m.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/75">
              {storyParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
