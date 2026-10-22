"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { AlertCircle, Loader2, Lock, Mail, ShieldCheck, UserRound } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

// Suggested amounts in naira. Donors can always type their own.
const PRESETS = [10000, 25000, 50000, 100000, 250000];
const MIN = 10000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

const inputBase =
  "block h-12 w-full rounded-lg border bg-white px-3.5 text-[15px] text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-[border-color,box-shadow] duration-150 placeholder:text-slate-400 focus:outline-none focus-visible:outline-none dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500";
const inputOk = "border-slate-300 hover:border-slate-400 focus:border-primary-600 focus:shadow-[0_0_0_3px_rgba(22,163,74,0.18)] dark:border-slate-600";
const inputErr = "border-red-500 focus:border-red-600 focus:shadow-[0_0_0_3px_rgba(220,38,38,0.15)]";

function Label({ htmlFor, children, optional }: { htmlFor: string; children: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-center justify-between text-[13px] font-semibold text-slate-700 dark:text-slate-200">
      {children}
      {optional && <span className="text-xs font-normal text-slate-400">Optional</span>}
    </label>
  );
}

function ErrorText({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-[13px] text-red-600 dark:text-red-400">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

/**
 * Checkout style donation card. Header with the foundation's identity and a
 * secure badge, segmented frequency control, amount options, donor details,
 * a receipt style summary and a security footer. Submits to /api/donate,
 * which creates a Paystack checkout and returns its link.
 */
export function DonateForm() {
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [preset, setPreset] = useState<number | "other">(25000);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showErrors, setShowErrors] = useState({ email: false, amount: false });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const amount = preset === "other" ? Number(custom.replace(/[^\d]/g, "")) || 0 : preset;
  const amountValid = amount >= MIN;
  const emailValid = EMAIL_RE.test(email.trim());
  const amountError = showErrors.amount && !amountValid;
  const emailError = showErrors.email && !emailValid;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);
    setShowErrors({ email: true, amount: true });
    if (!amountValid) {
      document.getElementById(preset === "other" ? "donate-custom" : "donate-amounts")?.focus();
      return;
    }
    if (!emailValid) {
      document.getElementById("donor-email")?.focus();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), amount, frequency }),
      });
      const data = (await res.json()) as { authorizationUrl?: string; error?: string };
      if (!res.ok || !data.authorizationUrl) throw new Error(data.error ?? "Something went wrong.");
      window.location.href = data.authorizationUrl;
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-20px_rgba(11,19,43,0.35)] ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
      {/* Header: who you are giving to */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-800/60">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white p-1 ring-1 ring-slate-200">
            <Image src="/images/logo.png" alt="" width={40} height={42} className="h-full w-full object-contain" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900 dark:text-white">Voice for Mother Earth Foundation</p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">Donation · Abuja, Nigeria</p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary-50 px-2.5 py-1 text-[11px] font-bold text-primary-700 ring-1 ring-primary-200 dark:bg-primary-500/10 dark:text-primary-300 dark:ring-primary-500/30">
          <Lock className="h-3 w-3" aria-hidden="true" />
          Secure
        </span>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6 px-6 py-6 sm:px-7">
        {/* Frequency */}
        <div role="radiogroup" aria-label="Donation frequency" className="grid grid-cols-2 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
          {(
            [
              { value: "once", label: "Give once" },
              { value: "monthly", label: "Give monthly" },
            ] as const
          ).map(({ value, label }) => {
            const on = frequency === value;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setFrequency(value)}
                className={cn(
                  "h-10 rounded-md text-sm font-semibold transition-all duration-150",
                  on
                    ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200 dark:bg-slate-700 dark:text-white dark:ring-slate-600"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Amount */}
        <fieldset>
          <legend className="mb-2.5 text-[13px] font-semibold text-slate-700 dark:text-slate-200">
            Select an amount <span className="font-normal text-slate-400">(NGN)</span>
          </legend>
          <div id="donate-amounts" tabIndex={-1} className="grid grid-cols-3 gap-2 focus:outline-none">
            {[...PRESETS, "other" as const].map((value) => {
              const on = preset === value;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    setPreset(value);
                    if (value !== "other") setCustom("");
                  }}
                  className={cn(
                    "relative h-12 rounded-lg border text-[15px] font-semibold tabular-nums transition-all duration-150",
                    on
                      ? "border-primary-600 bg-primary-50 text-primary-800 shadow-[0_0_0_1px_var(--color-primary-600)] dark:border-primary-400 dark:bg-primary-500/15 dark:text-primary-200"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800",
                  )}
                >
                  {value === "other" ? "Other" : naira(value)}
                </button>
              );
            })}
          </div>

          {preset === "other" && (
            <div className="mt-3">
              <Label htmlFor="donate-custom">Enter amount</Label>
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[15px] font-semibold text-slate-500">₦</span>
                <input
                  id="donate-custom"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={custom}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/[^\d]/g, "").slice(0, 9);
                    setCustom(digits ? Number(digits).toLocaleString("en-NG") : "");
                  }}
                  onBlur={() => custom && setShowErrors((s) => ({ ...s, amount: true }))}
                  placeholder="10,000"
                  aria-invalid={amountError || undefined}
                  aria-describedby="donate-custom-msg"
                  className={cn(inputBase, amountError ? inputErr : inputOk, "pl-8 font-semibold tabular-nums")}
                />
              </div>
              {amountError ? (
                <ErrorText id="donate-custom-msg">{`Minimum donation is ${naira(MIN)}.`}</ErrorText>
              ) : (
                <p id="donate-custom-msg" className="mt-1.5 text-[13px] text-slate-500 dark:text-slate-400">
                  Minimum donation is {naira(MIN)}.
                </p>
              )}
            </div>
          )}
        </fieldset>

        {/* Donor details */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="donor-name" optional>
              Full name
            </Label>
            <div className="relative">
              <UserRound className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                id="donor-name"
                type="text"
                autoComplete="name"
                maxLength={120}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Amaka Obi"
                className={cn(inputBase, inputOk, "pl-10")}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="donor-email">Email address</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                id="donor-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => email && setShowErrors((s) => ({ ...s, email: true }))}
                placeholder="you@example.com"
                aria-invalid={emailError || undefined}
                aria-describedby="donor-email-msg"
                className={cn(inputBase, emailError ? inputErr : inputOk, "pl-10")}
              />
            </div>
            {emailError ? (
              <ErrorText id="donor-email-msg">Enter a valid email address.</ErrorText>
            ) : (
              <p id="donor-email-msg" className="mt-1.5 text-[13px] text-slate-500 dark:text-slate-400">
                Your receipt will be sent to this address.
              </p>
            )}
          </div>
        </div>

        {/* Summary */}
        <dl className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm dark:border-slate-700 dark:bg-slate-800/60">
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500 dark:text-slate-400">Donation</dt>
            <dd className="font-medium text-slate-900 tabular-nums dark:text-white">{amountValid ? naira(amount) : "₦0"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500 dark:text-slate-400">Frequency</dt>
            <dd className="font-medium text-slate-900 dark:text-white">{frequency === "monthly" ? "Monthly" : "One time"}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-slate-200 pt-2 dark:border-slate-700">
            <dt className="font-semibold text-slate-900 dark:text-white">{frequency === "monthly" ? "Total per month" : "Total"}</dt>
            <dd className="text-base font-bold text-slate-900 tabular-nums dark:text-white">{amountValid ? naira(amount) : "₦0"}</dd>
          </div>
        </dl>

        {serverError && (
          <div role="alert" className="flex gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-800 dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-300">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              {serverError}{" "}
              {serverError.includes("email us") && (
                <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Donation Inquiry")}`} className="font-semibold underline">
                  {siteConfig.email}
                </a>
              )}
            </span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex h-13 w-full items-center justify-center gap-2 rounded-lg bg-primary-600 text-[15px] font-bold text-white shadow-[0_1px_2px_rgba(15,23,42,0.1),inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-150 hover:bg-primary-700 hover:shadow-[0_8px_20px_-6px_rgba(21,128,61,0.55)] active:scale-[0.99] disabled:cursor-wait disabled:opacity-80"
        >
          {loading ? (
            <>
              <Loader2 className="h-4.5 w-4.5 animate-spin" aria-hidden="true" />
              Redirecting to secure checkout
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" aria-hidden="true" />
              {amountValid ? `Donate ${naira(amount)}${frequency === "monthly" ? " monthly" : ""}` : "Donate"}
            </>
          )}
        </button>

        {frequency === "monthly" && (
          <p className="-mt-2 text-center text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            You will be charged {amountValid ? naira(amount) : "this amount"} today and on the same date each month. Cancel any
            time from the link in your Paystack receipt.
          </p>
        )}
      </form>

      {/* Security footer */}
      <div className="space-y-3 border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-800/60">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary-600 dark:text-primary-400" aria-hidden="true" />
          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            Payments are processed securely by <span className="font-semibold text-slate-900 dark:text-white">Paystack</span>.
            Your card details are encrypted and never reach our website.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <ul className="flex flex-wrap gap-1.5" aria-label="Accepted payment methods">
            {["Visa", "Mastercard", "Verve", ...(frequency === "once" ? ["Bank transfer", "USSD"] : [])].map((m) => (
              <li
                key={m}
                className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-slate-600 uppercase dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300"
              >
                {m}
              </li>
            ))}
          </ul>
          <a href={`mailto:${siteConfig.email}`} className="text-xs font-medium text-slate-500 underline-offset-2 hover:text-slate-800 hover:underline dark:text-slate-400 dark:hover:text-white">
            Need help? {siteConfig.email}
          </a>
        </div>
      </div>
    </div>
  );
}

