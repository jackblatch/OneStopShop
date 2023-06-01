// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.
import { db } from "@/db/db";
import { carts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import stripeDetails from "stripe";

export const bodyParser = false; // ensures webhook can be verified

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  // @ts-ignore
  const stripe = stripeDetails(process.env.STRIPE_SECRET_KEY);

  const headersList = headers();
  const sig = headersList.get("stripe-signature");
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.payment_failed":
      const paymentIntentPaymentFailed = event.data.object;
      // Then define and call a function to handle the event payment_intent.payment_failed
      break;
    case "payment_intent.processing":
      const paymentIntentProcessing = event.data.object;
      // Then define and call a function to handle the event payment_intent.processing
      break;
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded

      // Mark cart as closed in DB
      await db
        .update(carts)
        .set({
          isClosed: true,
        })
        .where(eq(carts.paymentIntentId, paymentIntentSucceeded.id));

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ status: 200 });
}
