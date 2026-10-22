import { Briefcase, FileText, Mail, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { getOpenJobs } from "@/sanity/careers";
import { JobCard } from "./job-card";

const reasons = [
  { title: "Work that matters", text: "Every role moves real projects in real communities, from tree planting to relief." },
  { title: "Room to grow", text: "A small team means you learn fast, take on responsibility and see your impact." },
  { title: "Good people", text: "Trustees and teammates from health, law, finance, education and tech." },
];

/**
 * Careers on Get Involved. Open roles come from the Sanity studio
 * ("Job openings"), so the team can post and close them without code.
 * With no roles open, it invites people to send a CV for future openings.
 */
export async function CareersSection() {
  const jobs = await getOpenJobs();
  const cvMail = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Careers: CV for future roles")}`;

  return (
    <section id="careers" className="relative isolate scroll-mt-28 bg-gradient-to-b from-secondary-50 to-background py-20 sm:py-28 dark:from-secondary-950/40">
      <div aria-hidden="true" className="bg-dots-dark absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow color="secondary" icon={Briefcase} align="center">
            Careers
          </Eyebrow>
          <h2 className="mt-5 text-4xl text-primary-950 sm:text-5xl dark:text-white">
            Build a career that <em className="accent-word text-sky">gives back</em>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-foreground/75">
            Volunteering is about lending a hand when you can. Careers are for people who want to make this work
            their job. When we are hiring, every open role is listed right here.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.06}>
              <div className="flex h-full gap-3 rounded-3xl bg-surface/80 p-5 ring-1 ring-border-subtle backdrop-blur-sm">
                <Sparkles
                  className={`mt-0.5 h-5 w-5 shrink-0 ${["text-primary-500", "text-secondary-500", "text-accent-500"][i]}`}
                  aria-hidden="true"
                />
                <div>
                  <p className="font-display text-lg font-semibold text-primary-950 dark:text-white">{r.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/70">{r.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14">
          {jobs.length > 0 ? (
            <>
              <h3 className="text-2xl font-semibold text-primary-950 sm:text-3xl dark:text-white">
                Open roles <span className="font-sans text-base font-bold text-secondary-600 dark:text-secondary-400">({jobs.length})</span>
              </h3>
              <div className="mt-6 space-y-4">
                {jobs.map((job, i) => (
                  <Reveal key={job._id} delay={(i % 4) * 0.05}>
                    <JobCard job={job} defaultEmail={siteConfig.email} />
                  </Reveal>
                ))}
              </div>
              <p className="mt-8 text-center text-sm text-foreground/65">
                Don&apos;t see your role?{" "}
                <a href={cvMail} className="font-bold text-secondary-600 underline underline-offset-4 hover:text-secondary-700 dark:text-secondary-400">
                  Send us your CV
                </a>{" "}
                and we will keep you in mind.
              </p>
            </>
          ) : (
            <Reveal>
              <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-[2.5rem] bg-surface p-8 text-center shadow-xl shadow-secondary-900/10 ring-1 ring-border-subtle sm:p-12 md:flex-row md:text-left">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-secondary-500 text-white shadow-lg shadow-secondary-600/30">
                  <FileText className="h-7 w-7" aria-hidden="true" />
                </span>
                <div className="flex-1">
                  <p className="font-display text-2xl font-semibold text-primary-950 dark:text-white">No open roles right now</p>
                  <p className="mt-2 text-base leading-relaxed text-foreground/70">
                    We are not hiring at the moment, but we would still love to hear from you. Send your CV and a few
                    lines about the work you want to do, and we will reach out when something fits.
                  </p>
                </div>
                <Button href={cvMail} variant="secondary" size="lg" icon={<Mail className="h-4 w-4" />} className="shrink-0">
                  Send your CV
                </Button>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

