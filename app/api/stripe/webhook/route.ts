import { db } from "@/db/db";
import { carts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Readable } from "stream";
import Stripe from "stripe";
import ts from "typescript";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

async function getRawBody(readable: Readable): Promise<Buffer> {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  const rawBody = await getRawBody(request.body as unknown as Readable);

  const headersList = headers();
  const sig = headersList.get("stripe-signature");
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig as string,
      endpointSecret as string
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  let dbResponse;
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

      dbResponse = await db
        .update(carts)
        .set({
          isClosed: true,
        })
        // @ts-ignore
        .where(eq(carts.clientSecret, event.client_secret));

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return NextResponse.json({ response: dbResponse }, { status: 200 });
}
