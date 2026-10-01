import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Paystack calls this URL in the background whenever something happens:
 * a payment succeeds, a monthly gift renews, a subscription is cancelled.
 *
 * Add it in Paystack > Settings > API Keys & Webhooks as:
 *   https://YOUR-DOMAIN/api/paystack/webhook
 *
 * Every request is checked against your secret key so nobody can fake one.
 * Right now it only logs events (visible in Vercel > Logs). This is the
 * place to add a thank you email or save donors to a database later.
 */
export async function POST(req: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) return NextResponse.json({ ok: false }, { status: 503 });

  const raw = await req.text();
  const signature = req.headers.get("x-paystack-signature") ?? "";
  const expected = createHmac("sha512", secret).update(raw).digest("hex");

  const valid =
    signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  if (!valid) return NextResponse.json({ ok: false }, { status: 401 });

  const event = JSON.parse(raw) as { event: string; data: { reference?: string; amount?: number; customer?: { email?: string } } };

  switch (event.event) {
    case "charge.success":
      console.log(
        `[paystack] Donation received: NGN ${((event.data.amount ?? 0) / 100).toLocaleString("en-NG")} from ${event.data.customer?.email} (ref ${event.data.reference})`,
      );
      break;
    case "subscription.create":
      console.log(`[paystack] New monthly giver: ${event.data.customer?.email}`);
      break;
    case "subscription.disable":
    case "subscription.not_renew":
      console.log(`[paystack] Monthly gift stopped: ${event.data.customer?.email}`);
      break;
    case "invoice.payment_failed":
      console.log(`[paystack] Monthly charge failed: ${event.data.customer?.email}`);
      break;
    default:
      console.log(`[paystack] ${event.event}`);
  }

  // Always answer 200 quickly so Paystack doesn't keep retrying.
  return NextResponse.json({ ok: true });
}
