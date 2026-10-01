# V4ME setup guide: Blog (Sanity) and Donations (Paystack)

The site runs fine before either is connected. The blog shows a "first post on the way" message, and the
donate form shows a friendly "email us" note. Once you do the steps below, both switch on by themselves.

All secret values live in **`.env.local`** on your computer and in **Vercel's environment variables** online.
Copy `.env.example` to `.env.local` to start:

```powershell
Copy-Item .env.example .env.local
```

---

## Part 1: The blog (Sanity), about 10 minutes

### 1. Create the Sanity project

1. Go to **https://www.sanity.io** and sign up. Google login is fine. Use the email the NGO will keep long term.
2. Open **https://www.sanity.io/manage** and click **Create new project**.
3. Name it `V4ME Blog`. When asked for a dataset, keep **production** and set it to **Public**.
4. On the project page, copy the **Project ID** (a short code like `a1b2c3d4`).

### 2. Add the keys

In `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=a1b2c3d4
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Allow your website to talk to Sanity (easy to miss)

In **sanity.io/manage > your project > API > CORS origins**, click **Add CORS origin** for each of these,
and **tick "Allow credentials"** every time:

- `http://localhost:3000`
- your Vercel address, e.g. `https://v4me-foundation.vercel.app`
- your real domain when you have it, e.g. `https://v4me.org`

Without this step the studio page will show a login or CORS error.

### 4. Try it

```powershell
npm run dev
```

Open **http://localhost:3000/studio**, log in with your Sanity account, click **Blog posts > +**, fill it in and
press **Publish**. Open **http://localhost:3000/blog** to see it.

### 5. Writing posts (for whoever runs the blog)

| Field | Tip |
|---|---|
| Title | Keep it human and specific. "Two hundred seedlings in Kuje" beats "Tree Planting Update". |
| Web address | Click **Generate**. |
| Short summary | One or two sentences. Shown on the blog list and when shared on WhatsApp. |
| Cover photo | Landscape photos work best. Drag the circle to choose the focus point. Fill in "Describe the photo". |
| Category | Environment, Humanitarian, Field Notes, News or Events. |
| Feature this post | Pins it to the big card at the top. If none is featured, the newest post is used. |
| Story | Use **Heading** for section titles, **Quote** for pull quotes, and the image button for extra photos. |

Published posts appear on the live site **within about a minute**. No code, no redeploy.
A future publish date keeps a post hidden until that date.

To let someone else post, invite them in **sanity.io/manage > Members**.

---

## Part 2: Donations (Paystack)

### How it works

1. A donor picks **Give once** or **Give monthly**, chooses or types an amount, and adds their name and email.
2. The site asks Paystack (securely, from the server) for a checkout link and sends the donor there.
3. They pay on Paystack's page: card, bank transfer or USSD for one time gifts; card for monthly gifts.
4. Paystack sends them back to **/donate/thank-you**, where the site checks with Paystack that the payment really
   went through before saying thank you.
5. Monthly gifts become Paystack subscriptions. Paystack emails the donor a link to change or cancel.

Card details never touch the website. Only the **secret key** is needed, and it stays on the server.

### 1. Create the Paystack account

1. Sign up at **https://dashboard.paystack.com/#/signup** with the NGO's email.
2. You start in **Test mode**. That is all you need to build and test.
3. To take real money, complete **Activate your account** in the dashboard. For an NGO this needs the
   organisation's registration documents (CAC) and a Nigerian bank account in the organisation's name.
   Paystack reviews it, usually within a few working days. You can finish testing while you wait.

### 2. Add the test key

In the dashboard, make sure the **Test mode** toggle is on, then go to
**Settings > API Keys & Webhooks** and copy the **Test Secret Key** (starts with `sk_test_`).

In `.env.local`:

```
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
```

Restart `npm run dev` after changing `.env.local`.

### 3. Test a payment

1. Go to **http://localhost:3000/get-involved#donate**.
2. Pick an amount, enter your email, click **Give**.
3. On Paystack's test page, use Paystack's test card. It is shown on the test checkout page and in the
   Paystack docs (search "Paystack test cards"). At the time of writing: card `4084 0840 8408 4081`,
   CVV `408`, any future expiry, PIN `0000`, OTP `123456`.
4. You should land on the thank you page with the amount and a reference.
5. Try **Give monthly** too. In the dashboard you will see a new plan under **Plans** and a subscription under
   **Subscriptions**.

### 4. Set the webhook (after you deploy)

Paystack uses this to tell the site about monthly renewals and cancellations in the background.

In **Settings > API Keys & Webhooks**, set **Test Webhook URL** (and later **Live Webhook URL**) to:

```
https://YOUR-VERCEL-OR-DOMAIN/api/paystack/webhook
```

For now it records events in **Vercel > your project > Logs** (look for `[paystack]`). It is the spot to add
thank you emails or a donor list later.

### 5. Going live

When Paystack approves the account:

1. Switch the dashboard to **Live mode** and copy the **Live Secret Key** (`sk_live_`).
2. In **Vercel > Settings > Environment Variables**, replace `PAYSTACK_SECRET_KEY` with the live key.
3. Set the **Live Webhook URL** to the same address as above.
4. Redeploy (Vercel > Deployments > the three dots > Redeploy).
5. Make one small real donation yourself to confirm, then refund it from the dashboard if you like.

Never commit keys to GitHub. `.env.local` is already in `.gitignore`.

---

## Part 3: Vercel

In **Vercel > your project > Settings > Environment Variables**, add all three for **Production** and **Preview**:

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | your Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `PAYSTACK_SECRET_KEY` | `sk_test_...` for now, `sk_live_...` when live |

Then redeploy. Remember to add the Vercel address to Sanity's CORS origins (Part 1, step 3).

---

## Quick troubleshooting

| What you see | Fix |
|---|---|
| `/studio` says "The blog editor isn't connected yet" | `NEXT_PUBLIC_SANITY_PROJECT_ID` is missing. Add it and restart or redeploy. |
| Studio shows a CORS error | Add that exact address in Sanity CORS origins with **Allow credentials** ticked. |
| New post not showing | Wait a minute and refresh. Check the publish date isn't in the future and you pressed **Publish**. |
| Donate form says "Online giving isn't switched on yet" | `PAYSTACK_SECRET_KEY` is missing. Add it and restart or redeploy. |
| "We couldn't reach our payment partner" | Usually a wrong or mistyped key. Check for spaces and that test/live matches the dashboard mode. |
| Thank you page says "couldn't find that payment" | The key on the site and the mode the payment was made in don't match (test vs live). |
