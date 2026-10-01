import { NextResponse } from "next/server";
import { getOrCreateMonthlyPlan, isPaystackConfigured, paystack } from "@/lib/paystack";

export const runtime = "nodejs";

const MIN_NAIRA = 500;
const MAX_NAIRA = 50_000_000;

type Body = {
  name?: string;
  email?: string;
  amount?: number;
  frequency?: "once" | "monthly";
};

/**
 * Starts a Paystack payment and returns the checkout link.
 * The browser is then sent to Paystack's secure page; afterwards Paystack
 * sends the donor back to /donate/thank-you where the payment is verified.
 */
export async function POST(req: Request) {
  if (!isPaystackConfigured) {
    return NextResponse.json(
      { error: "Online giving isn't switched on yet. Please email us and we will send payment details." },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Something went wrong reading your details." }, { status: 400 });
  }

  const name = (body.name ?? "").trim().slice(0, 120);
  const email = (body.email ?? "").trim().toLowerCase();
  const frequency = body.frequency === "monthly" ? "monthly" : "once";
  const amount = Math.round(Number(body.amount));

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!Number.isFinite(amount) || amount < MIN_NAIRA || amount > MAX_NAIRA) {
    return NextResponse.json(
      { error: `Please enter an amount of at least ₦${MIN_NAIRA.toLocaleString("en-NG")}.` },
      { status: 400 },
    );
  }

  const amountKobo = amount * 100;
  const origin = new URL(req.url).origin;

  try {
    const plan = frequency === "monthly" ? await getOrCreateMonthlyPlan(amountKobo) : undefined;

    const data = await paystack<{ authorization_url: string; reference: string }>("/transaction/initialize", {
      method: "POST",
      body: {
        email,
        amount: amountKobo,
        currency: "NGN",
        callback_url: `${origin}/donate/thank-you`,
        ...(plan ? { plan } : {}),
        metadata: {
          donor_name: name,
          frequency,
          custom_fields: [
            { display_name: "Donor name", variable_name: "donor_name", value: name || "Not given" },
            { display_name: "Gift type", variable_name: "frequency", value: frequency === "monthly" ? "Monthly" : "One time" },
          ],
        },
      },
    });

    return NextResponse.json({ authorizationUrl: data.authorization_url });
  } catch (err) {
    console.error("[donate] Paystack error:", err);
    return NextResponse.json(
      { error: "We couldn't reach our payment partner just now. Please try again in a moment." },
      { status: 502 },
    );
  }
}
