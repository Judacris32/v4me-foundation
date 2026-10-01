"use client";

import { useState, type FormEvent } from "react";
import { Heart, Loader2, Lock, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

// Suggested amounts in naira. Donors can always type their own.
const PRESETS = [2000, 5000, 10000, 25000, 50000];
const MIN = 500;

const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

const field =
  "h-12 w-full rounded-2xl border border-border-subtle bg-surface-muted px-4 text-sm text-foreground placeholder:text-foreground/40 transition-all duration-200 hover:border-primary-300 focus:border-primary-500 focus:bg-surface focus:ring-4 focus:ring-primary-500/15 focus:outline-none";

/**
 * Donation form. Sends the details to /api/donate, which creates a Paystack
 * checkout and returns its link; the donor then pays on Paystack's secure page.
 */
export function DonateForm() {
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [preset, setPreset] = useState<number | null>(10000);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const amount = preset ?? (Number(custom.replace(/[^\d]/g, "")) || 0);
  const valid = amount >= MIN;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!valid) {
      setError(`Please choose an amount of at least ${naira(MIN)}.`);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, amount, frequency }),
      });
      const data = (await res.json()) as { authorizationUrl?: string; error?: string };
      if (!res.ok || !data.authorizationUrl) throw new Error(data.error ?? "Something went wrong.");
      window.location.href = data.authorizationUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Frequency */}
      <div role="radiogroup" aria-label="How often" className="grid grid-cols-2 gap-1 rounded-full bg-surface-muted p-1 ring-1 ring-border-subtle">
        {(
          [
            { value: "once", label: "Give once", icon: Heart },
            { value: "monthly", label: "Give monthly", icon: Repeat },
          ] as const
        ).map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={frequency === value}
            onClick={() => setFrequency(value)}
            className={cn(
              "inline-flex h-11 items-center justify-center gap-2 rounded-full text-sm font-bold transition-all duration-300",
              frequency === value
                ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md shadow-primary-600/25"
                : "text-foreground/65 hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      {/* Amount */}
      <fieldset>
        <legend className="mb-2.5 text-sm font-semibold text-foreground/80">Choose an amount</legend>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {PRESETS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setPreset(value);
                setCustom("");
              }}
              aria-pressed={preset === value}
              className={cn(
                "h-12 rounded-full text-sm font-bold ring-1 transition-all duration-200 hover:-translate-y-0.5",
                preset === value
                  ? "bg-accent-400 text-primary-950 shadow-md shadow-accent-500/30 ring-accent-500"
                  : "bg-surface text-foreground/80 ring-border-subtle hover:ring-accent-400",
              )}
            >
              {naira(value)}
            </button>
          ))}
          <div className="relative col-span-3 sm:col-span-5">
            <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-sm font-bold text-foreground/50">₦</span>
            <input
              type="text"
              inputMode="numeric"
              value={custom}
              onChange={(e) => {
                const digits = e.target.value.replace(/[^\d]/g, "");
                setCustom(digits ? Number(digits).toLocaleString("en-NG") : "");
                setPreset(null);
              }}
              onFocus={() => setPreset(null)}
              placeholder="Or type your own amount"
              aria-label="Custom amount in naira"
              className={cn(field, "rounded-full pl-9", preset === null && custom && "border-accent-400 ring-4 ring-accent-400/20")}
            />
          </div>
        </div>
      </fieldset>

      {/* Donor */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="donor-name" className="mb-1.5 block text-sm font-semibold text-foreground/80">
            Your name
          </label>
          <input id="donor-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Amaka Obi" className={field} />
        </div>
        <div>
          <label htmlFor="donor-email" className="mb-1.5 block text-sm font-semibold text-foreground/80">
            Email for your receipt
          </label>
          <input
            id="donor-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={field}
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="rounded-2xl bg-accent-50 px-4 py-3 text-sm font-medium text-accent-800 ring-1 ring-accent-200 dark:bg-accent-400/10 dark:text-accent-300 dark:ring-accent-400/30">
          {error}{" "}
          {error.includes("email us") && (
            <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Donation Inquiry")}`} className="font-bold underline">
              {siteConfig.email}
            </a>
          )}
        </p>
      )}

      <Button
        type="submit"
        variant="accent"
        size="lg"
        disabled={loading}
        className="w-full"
        icon={loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
      >
        {loading
          ? "Taking you to Paystack"
          : valid
            ? `Give ${naira(amount)}${frequency === "monthly" ? " every month" : ""}`
            : "Give now"}
      </Button>

      <p className="text-center text-xs leading-relaxed text-foreground/55">
        Secure checkout by Paystack.{" "}
        {frequency === "monthly"
          ? "Monthly gifts are charged to your card, and Paystack emails you a link to change or cancel any time."
          : "Pay with card, bank transfer or USSD."}
      </p>
    </form>
  );
}
