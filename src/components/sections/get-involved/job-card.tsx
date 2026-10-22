"use client";

import { useState } from "react";
import { PortableText } from "next-sanity";
import { CalendarClock, ChevronDown, Clock, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jobTypeLabel } from "@/sanity/categories";
import type { Job } from "@/sanity/careers";
import { cn } from "@/lib/utils";

const typeTone: Record<string, string> = {
  "full-time": "bg-primary-500 text-white",
  "part-time": "bg-secondary-500 text-white",
  contract: "bg-primary-950 text-white dark:bg-white dark:text-primary-950",
  internship: "bg-accent-400 text-primary-950",
};

function formatDeadline(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/** One open role. Click to expand the full description and apply by email. */
export function JobCard({ job, defaultEmail }: { job: Job; defaultEmail: string }) {
  const [open, setOpen] = useState(false);
  const email = job.applyEmail || defaultEmail;
  const apply = `mailto:${email}?subject=${encodeURIComponent(`Application: ${job.title}`)}&body=${encodeURIComponent(
    `Hello V4ME team,\n\nI would like to apply for the ${job.title} role. My CV is attached.\n\n`,
  )}`;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[2rem] bg-surface ring-1 transition-all duration-300",
        open ? "shadow-2xl shadow-secondary-900/10 ring-secondary-300 dark:ring-secondary-400/40" : "shadow-sm ring-border-subtle hover:shadow-lg",
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full flex-col gap-4 p-6 text-left sm:flex-row sm:items-center sm:p-7"
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("rounded-full px-3 py-1 text-[11px] font-bold", typeTone[job.type] ?? "bg-primary-500 text-white")}>
              {jobTypeLabel(job.type)}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-surface-muted px-3 py-1 text-[11px] font-semibold text-foreground/70 ring-1 ring-border-subtle">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {job.location}
            </span>
            {job.deadline && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent-50 px-3 py-1 text-[11px] font-semibold text-accent-800 ring-1 ring-accent-200 dark:bg-accent-400/10 dark:text-accent-300 dark:ring-accent-400/30">
                <CalendarClock className="h-3 w-3" aria-hidden="true" />
                Apply by {formatDeadline(job.deadline)}
              </span>
            )}
          </div>
          <h4 className="mt-3 text-2xl font-semibold text-primary-950 dark:text-white">{job.title}</h4>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">{job.summary}</p>
        </div>
        <span
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center self-end rounded-full transition-all duration-300 sm:self-center",
            open ? "rotate-180 bg-secondary-500 text-white" : "bg-secondary-50 text-secondary-600 dark:bg-secondary-400/15 dark:text-secondary-300",
          )}
        >
          <ChevronDown className="h-5 w-5" aria-hidden="true" />
        </span>
      </button>

      <div className={cn("grid transition-all duration-300 ease-in-out", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">
          <div className="border-t border-border-subtle px-6 pt-6 pb-7 sm:px-7">
            {job.details && job.details.length > 0 ? (
              <div className="max-w-3xl text-base leading-relaxed text-foreground/80 [&_h3]:font-display [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-primary-950 [&_li]:mt-1.5 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-3 [&_strong]:text-primary-950 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 dark:[&_h3]:text-white dark:[&_strong]:text-white [&>*:first-child]:mt-0">
                <PortableText value={job.details} />
              </div>
            ) : (
              <p className="text-base text-foreground/70">Get in touch for the full role description.</p>
            )}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Button href={apply} variant="secondary" size="lg" icon={<Send className="h-4 w-4" />}>
                Apply for this role
              </Button>
              <span className="inline-flex items-center gap-1.5 text-xs text-foreground/55">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                Send your CV to {email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
