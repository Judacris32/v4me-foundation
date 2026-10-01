import "server-only";

/**
 * Minimal Paystack API helper. Runs on the server only, so the secret key
 * never reaches the browser.
 *
 * Needs PAYSTACK_SECRET_KEY in .env.local and in Vercel's environment
 * variables. Use the sk_test_ key while testing and sk_live_ when going live.
 */
const PAYSTACK_API = "https://api.paystack.co";

export const isPaystackConfigured = Boolean(process.env.PAYSTACK_SECRET_KEY);

type PaystackResponse<T> = { status: boolean; message: string; data: T };

export async function paystack<T>(path: string, init?: { method?: "GET" | "POST"; body?: unknown }): Promise<T> {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) throw new Error("PAYSTACK_SECRET_KEY is not set");

  const res = await fetch(`${PAYSTACK_API}${path}`, {
    method: init?.method ?? "GET",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: init?.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });

  let json: PaystackResponse<T>;
  try {
    json = (await res.json()) as PaystackResponse<T>;
  } catch {
    throw new Error(`Paystack returned an unexpected response (${res.status})`);
  }
  if (!res.ok || !json.status) {
    throw new Error(json.message || `Paystack request failed (${res.status})`);
  }
  return json.data;
}

type Plan = { plan_code: string; name: string; amount: number; interval: string; currency: string };

/**
 * Monthly gifts use a Paystack subscription plan. Donors can type any
 * amount, so we reuse a plan for that exact amount if one exists, and
 * create it the first time someone gives that amount.
 */
export async function getOrCreateMonthlyPlan(amountKobo: number): Promise<string> {
  const plans = await paystack<Plan[]>(`/plan?interval=monthly&amount=${amountKobo}&perPage=50`);
  const existing = plans.find(
    (p) => p.amount === amountKobo && p.interval === "monthly" && p.currency === "NGN" && p.name.startsWith("V4ME Monthly"),
  );
  if (existing) return existing.plan_code;

  const naira = (amountKobo / 100).toLocaleString("en-NG");
  const created = await paystack<Plan>("/plan", {
    method: "POST",
    body: {
      name: `V4ME Monthly Gift NGN ${naira}`,
      interval: "monthly",
      amount: amountKobo,
      currency: "NGN",
      description: "Monthly donation to Voice for Mother Earth Humanitarian Foundation",
    },
  });
  return created.plan_code;
}

export type VerifiedTransaction = {
  status: "success" | "failed" | "abandoned" | "ongoing" | "pending" | "reversed";
  reference: string;
  amount: number;
  currency: string;
  paid_at: string | null;
  customer: { email: string; first_name: string | null };
  metadata: { donor_name?: string; frequency?: "once" | "monthly" } | string | null;
  plan?: unknown;
};

export function verifyTransaction(reference: string) {
  return paystack<VerifiedTransaction>(`/transaction/verify/${encodeURIComponent(reference)}`);
}
