import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, HeartHandshake, RefreshCw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareButtons } from "@/components/blog/share-buttons";
import { isPaystackConfigured, verifyTransaction, type VerifiedTransaction } from "@/lib/paystack";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false },
};

async function check(reference?: string): Promise<VerifiedTransaction | null> {
  if (!reference || !isPaystackConfigured) return null;
  try {
    return await verifyTransaction(reference);
  } catch {
    return null;
  }
}

/**
 * Paystack sends donors here after checkout with ?reference=...
 * The payment is verified with Paystack on the server before we say thank you,
 * so the page can't be faked by editing the address bar.
 */
export default async function ThankYouPage({ searchParams }: PageProps<"/donate/thank-you">) {
  const params = await searchParams;
  const reference = typeof params.reference === "string" ? params.reference : undefined;
  const tx = await check(reference);
  const ok = tx?.status === "success";

  const meta: { donor_name?: string; frequency?: string } =
    tx && typeof tx.metadata === "object" && tx.metadata ? tx.metadata : {};
  const monthly = meta.frequency === "monthly";
  const firstName = (meta.donor_name || tx?.customer.first_name || "").split(" ")[0];
  const amount = tx ? `₦${(tx.amount / 100).toLocaleString("en-NG")}` : "";

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-primary-950 px-4 pt-32 pb-20 text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_20%_10%,rgba(34,197,94,0.3),transparent),radial-gradient(45%_45%_at_85%_90%,rgba(251,191,36,0.2),transparent)]"
      />
      <div className="mx-auto w-full max-w-2xl text-center">
        {ok ? (
          <>
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-500 shadow-2xl shadow-primary-500/40 ring-8 ring-primary-500/20">
              <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
            </span>
            <p className="font-script mt-8 text-3xl font-bold text-accent-300">
              {firstName ? `Thank you, ${firstName}!` : "Thank you!"}
            </p>
            <h1 className="mt-3 text-4xl text-balance sm:text-6xl">
              Your gift of <em className="accent-word text-sun">{amount}</em> {monthly ? "every month " : ""}is on its way
              to the field.
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-white/80">
              {monthly
                ? "Your monthly gift is set up. Paystack will email you a receipt each month, along with a link to change or cancel it whenever you like."
                : "A receipt is on its way to your inbox from Paystack. Every naira goes into trees, classrooms, clinics and relief for the communities we serve."}
            </p>
            <div className="mt-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs text-white/70 ring-1 ring-white/15">
              Reference: {tx?.reference}
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button href="/blog" variant="accent" size="lg">
                Read stories from the field
              </Button>
              <Button href="/" variant="outline" size="lg">
                Back to home
              </Button>
            </div>
            <div className="mt-12 flex flex-col items-center gap-3">
              <p className="text-sm text-white/65">Tell a friend. Every hand counts.</p>
              <ShareButtons url={`${siteConfig.url}/get-involved#donate`} title="I just gave to Voice for Mother Earth. Join me!" />
            </div>
          </>
        ) : tx && tx.status !== "success" ? (
          <>
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-400 text-primary-950 shadow-2xl shadow-accent-500/40">
              <XCircle className="h-10 w-10" aria-hidden="true" />
            </span>
            <h1 className="mt-8 text-4xl sm:text-5xl">That payment didn&apos;t go through</h1>
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-white/80">
              No money was taken. It happens sometimes with cards or network issues. You are welcome to try again,
              or pick another way to pay on the Paystack page.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button href="/get-involved#donate" variant="accent" size="lg" icon={<RefreshCw className="h-4 w-4" />}>
                Try again
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Contact us
              </Button>
            </div>
          </>
        ) : (
          <>
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary-500 shadow-2xl shadow-secondary-500/40">
              <HeartHandshake className="h-10 w-10" aria-hidden="true" />
            </span>
            <h1 className="mt-8 text-4xl sm:text-5xl">We couldn&apos;t find that payment</h1>
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-white/80">
              If you have just paid, your receipt from Paystack is the confirmation you need. If something looks
              wrong, write to us at{" "}
              <Link href={`mailto:${siteConfig.email}`} className="font-semibold text-accent-300 underline underline-offset-4">
                {siteConfig.email}
              </Link>{" "}
              and we will sort it out.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button href="/get-involved#donate" variant="accent" size="lg">
                Go to giving
              </Button>
              <Button href="/" variant="outline" size="lg">
                Back to home
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
