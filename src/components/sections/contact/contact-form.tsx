"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const subjects = ["General Inquiry", "Volunteering", "Partnership", "Media & Press", "Donation", "Something Else"];

// Theme aware fields: light inputs on light cards, slate inputs in dark mode.
const fieldClasses =
  "w-full rounded-2xl border border-border-subtle bg-surface-muted px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 transition-all duration-200 hover:border-primary-300 focus:border-primary-500 focus:bg-surface focus:ring-4 focus:ring-primary-500/15 focus:outline-none dark:hover:border-primary-500/50";

/**
 * No backend or email service is wired up yet, so submitting builds a
 * mailto: link from the filled-in fields and hands off to the visitor's
 * own email client. Honest and functional, without pretending a form
 * post is happening behind the scenes. Swap this handler out once a real
 * inbox/API integration (e.g. Resend, Formspree) is in place.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(subjects[0]);
  const [message, setMessage] = useState("");
  const [handedOff, setHandedOff] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      `[${subject}] Message from ${name || "the V4ME website"}`,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setHandedOff(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-foreground/80">
            Your name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Amaka Obi"
            className={fieldClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-foreground/80">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={fieldClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-semibold text-foreground/80">
          What&apos;s this about?
        </label>
        <select
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={fieldClasses}
        >
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-foreground/80">
          Your message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us a little about what is on your mind"
          className={`${fieldClasses} resize-none`}
        />
      </div>

      <Button type="submit" variant="primary" size="lg" icon={<Send className="h-4 w-4" />} className="w-full sm:w-auto">
        Send message
      </Button>

      {handedOff && (
        <p className="text-sm text-primary-700 dark:text-primary-300" role="status">
          Opening your email app with your message ready to go. If nothing happens, write to us directly at{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-medium underline underline-offset-2">
            {siteConfig.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
