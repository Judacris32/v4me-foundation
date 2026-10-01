"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Is it safe to give online?",
    answer:
      "Yes. Payments go through Paystack, one of Nigeria's most trusted payment companies. Your card or bank details go straight to them and never touch our website, and you get a receipt by email as soon as your gift goes through.",
  },
  {
    question: "How do I change or cancel a monthly gift?",
    answer:
      "Paystack sends you an email when your monthly gift starts, with a link to manage it. You can use that link to update your card or cancel at any time. If you get stuck, email us and we will sort it out for you.",
  },
  {
    question: "How can I get involved if I can't donate money?",
    answer:
      "Volunteering is just as valuable. Our outreaches, tree planting drives and events all run on people's time and skills. Practical support such as materials, transport or professional skills like design and writing is always welcome too. Send us a quick email from the volunteer section above and we'll match you with something that fits.",
  },
  {
    question: "Where does V4ME currently operate?",
    answer:
      "Our programs are based in Abuja, Nigeria, with outreaches reaching into surrounding communities. As our partnerships grow, so does our reach. Our Work page and our blog always have the latest on where we are active.",
  },
  {
    question: "Can my company or organization partner with V4ME?",
    answer:
      "Yes, and we would love that. We welcome partnerships with businesses, schools and other organisations, from sponsoring a single outreach to working together over the long term. Send us a note through the Contact page and tell us what you have in mind.",
  },
  {
    question: "Do you accept donated supplies and materials?",
    answer:
      "Often, yes. What we need changes with each program and season, so the best thing to do is email us first. We will tell you exactly what would help most right now.",
  },
  {
    question: "How do I stay updated on new programs and outreaches?",
    answer:
      "Follow us on social media (the links are in the footer), read our blog, or leave your email on the blog page and we will send you each new story from the field.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative isolate scroll-mt-28 bg-gradient-to-b from-secondary-50 to-background py-20 sm:py-28 dark:from-secondary-950/40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <Eyebrow color="secondary" icon={HelpCircle} align="center">
            Common questions
          </Eyebrow>
          <h2 className="mt-5 text-4xl text-primary-950 sm:text-5xl dark:text-white">
            Answers before you <em className="accent-word text-sky">ask</em>
          </h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => {
            const open = openIndex === i;
            return (
              <Reveal key={faq.question} delay={i * 0.04}>
                <div
                  className={cn(
                    "overflow-hidden rounded-[1.75rem] bg-surface ring-1 transition-all duration-300",
                    open
                      ? "shadow-xl shadow-secondary-900/10 ring-secondary-300 dark:ring-secondary-400/40"
                      : "ring-border-subtle hover:ring-secondary-200 dark:hover:ring-secondary-400/25",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-7"
                  >
                    <span className="font-display text-lg font-semibold text-primary-950 dark:text-white">
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                        open
                          ? "rotate-180 bg-secondary-500 text-white"
                          : "bg-secondary-50 text-secondary-600 dark:bg-secondary-400/15 dark:text-secondary-300",
                      )}
                    >
                      <ChevronDown className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-base leading-relaxed text-foreground/70 sm:px-7">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
