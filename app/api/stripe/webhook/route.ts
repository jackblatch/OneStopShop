import { addresses } from "./../../../../db/schema";
import { db } from "@/db/db";
import { carts, orders, payments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Readable } from "stream";
import Stripe from "stripe";

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

  let dbUpdateCartResponse;
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

      // @ts-ignore
      const paymentIntentId = event?.data?.object?.id as string;
      // @ts-ignore
      const orderTotal = event?.data?.object?.amount as string;
      // @ts-ignore
      const name = event?.data?.shipping?.name as string;
      // @ts-ignore
      const email = event?.data?.receipt_email as string;
      // @ts-ignore
      const status = event?.data?.status as string;

      try {
        // check if order with paymentId already exists
        const existingOrder = await db
          .select()
          .from(orders)
          .where(eq(orders.stripePaymentIntentId, paymentIntentId));

        if (!existingOrder.length) {
          if (!event.account) throw new Error("No account on event");
          const store = await db
            .select({
              storeId: payments.storeId,
            })
            .from(payments)
            .where(eq(payments.stripeAccountId, event.account));

          const storeId = store[0].storeId;

          const cart = await db
            .select()
            .from(carts)
            .where(eq(carts.paymentIntentId, paymentIntentId));
          const items = cart[0].items;

          // create new address in DB
          // @ts-ignore
          const stripeAddress = event?.data?.shipping?.address as {
            line1: string;
            line2: string;
            city: string;
            state: string;
            postal_code: string;
            country: string;
          };
          console.log({ stripeAddress });
          const newAddress = await db.insert(addresses).values({
            line1: stripeAddress.line1,
            line2: stripeAddress.line2,
            city: stripeAddress.city,
            state: stripeAddress.state,
            postal_code: stripeAddress.postal_code,
            country: stripeAddress.country,
          });

          if (!newAddress.insertId) throw new Error("No address created");

          // create new order in DB
          await db.insert(orders).values({
            storeId: storeId,
            items: items,
            total: String(Number(orderTotal) / 100),
            stripePaymentIntentId: paymentIntentId,
            stripePaymentIntentStatus: status,
            name: name,
            email: email,
            addressId: Number(newAddress.insertId),
          });
        }
      } catch (err) {
        console.log("ORDER CREATION WEBHOOK ERROR", err);
      }

      try {
        // Close cart and clear items
        dbUpdateCartResponse = await db
          .update(carts)
          .set({
            isClosed: true,
            items: JSON.stringify([]),
          })
          .where(eq(carts.paymentIntentId, paymentIntentId));
      } catch (err) {
        console.log("WEBHOOK ERROR", err);
        return NextResponse.json(
          { response: dbUpdateCartResponse, error: err },
          { status: 500 }
        );
      }

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return NextResponse.json({ status: 200 });
}
