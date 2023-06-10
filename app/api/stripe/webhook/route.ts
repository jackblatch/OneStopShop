import { addresses, products } from "./../../../../db/schema";
import { db } from "@/db/db";
import { carts, orders, payments } from "@/db/schema";
import { CheckoutItem } from "@/lib/types";
import { SQL, eq, inArray, sql } from "drizzle-orm";
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

      const stripeObject = event?.data?.object as {
        id: string;
        amount: string;
        metadata: {
          cartId: string;
          items: string;
        };
        shipping: {
          name: string;
          address: {
            line1: string;
            line2: string;
            city: string;
            state: string;
            postal_code: string;
            country: string;
          };
        };
        receipt_email: string;
        status: string;
      };

      const paymentIntentId = stripeObject?.id;
      const orderTotal = stripeObject?.amount;

      try {
        if (!event.account) throw new Error("No account on event");
        const store = await db
          .select({
            storeId: payments.storeId,
          })
          .from(payments)
          .where(eq(payments.stripeAccountId, event.account));

        const storeId = store[0].storeId as number;

        // create new address in DB
        const stripeAddress = stripeObject?.shipping?.address;

        const newAddress = await db.insert(addresses).values({
          line1: stripeAddress?.line1,
          line2: stripeAddress?.line2,
          city: stripeAddress?.city,
          state: stripeAddress?.state,
          postal_code: stripeAddress?.postal_code,
          country: stripeAddress?.country,
        });

        if (!newAddress.insertId) throw new Error("No address created");

        // get current order count in DB
        const storeOrderCount = await db
          .select({ count: sql<number>`count(*)` })
          .from(orders)
          .where(eq(orders.storeId, storeId));

        // create new order in DB
        const newOrder = await db.insert(orders).values({
          prettyOrderId: Number(storeOrderCount[0].count) + 1,
          storeId: storeId,
          items: stripeObject.metadata?.items,
          total: String(Number(orderTotal) / 100),
          stripePaymentIntentId: paymentIntentId,
          stripePaymentIntentStatus: stripeObject?.status,
          name: stripeObject?.shipping?.name,
          email: stripeObject?.receipt_email,
          createdAt: event.created,
          addressId: Number(newAddress.insertId),
        });
        console.log("ORDER CREATED", newOrder);
      } catch (err) {
        console.log("ORDER CREATION WEBHOOK ERROR", err);
      }

      // update inventory from DB
      // try {
      //   const orderedItems = JSON.parse(
      //     stripeObject.metadata?.items
      //   ) as CheckoutItem[];

      //   for (let index in orderedItems) {
      //     orderedItems[index].id;
      //   }

      //   orderedItems.forEach((item) => item.id);

      //   // UPDATE products SET inventory = inventory - 1 WHERE id = $1 or id = $2 or id = $3 or id = $4 or id = $5; --> [0, 1, 2, 3, 4]
      // } catch (err) {
      //   console.log("INVENTORY UPDATE WEBHOOK ERROR", err);
      // }

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
