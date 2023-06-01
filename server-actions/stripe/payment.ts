"use server";

import { db } from "@/db/db";
import { payments } from "@/db/schema";
import { platformFeeDecimal } from "@/lib/application-constants";
import { CheckoutItem, StripePaymentIntent } from "@/lib/types";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import stripeDetails from "stripe";
import { getStoreId } from "../store-details";

export async function createPaymentIntent({
  items,
  storeId,
}: {
  items: CheckoutItem[];
  storeId: number;
}) {
  try {
    // This is your test secret API key.
    // @ts-ignore
    const stripe = stripeDetails(process.env.STRIPE_SECRET_KEY);

    const payment = await db
      .select()
      .from(payments)
      .where(eq(payments.storeId, storeId));

    const stripeAccountId = payment[0].stripeAccountId;

    if (!stripeAccountId) {
      throw new Error("Stripe Account Id not found");
    }

    const cartId = Number(cookies().get("cartId")?.value);

    // Create a PaymentIntent with the order amount and currency
    const { orderTotal, platformFee } = calculateOrderAmounts(items);
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: orderTotal,
        currency: "usd",
        metadata: {
          cartId: isNaN(cartId) ? undefined : cartId,
        },
        automatic_payment_methods: {
          enabled: true,
        },
        application_fee_amount: platformFee,
      },
      {
        stripeAccount: stripeAccountId,
      }
    );

    return { clientSecret: paymentIntent.client_secret };
  } catch (err) {
    console.log(err);
  }
}

// Helper Functions
const calculateOrderAmounts = (items: CheckoutItem[]) => {
  const total = items.reduce((acc, item) => {
    return acc + item.price * item.qty;
  }, 0);
  const fee = total * platformFeeDecimal;
  return {
    orderTotal: (total * 100).toFixed(0), // converts to cents which stripe charges in
    platformFee: (fee * 100).toFixed(0),
  };
};

export async function getPaymentIntents({
  startingAfterPaymentId,
  beforePaymentId,
}: {
  startingAfterPaymentId?: string;
  beforePaymentId?: string;
}) {
  try {
    // @ts-ignore
    const stripe = stripeDetails(process.env.STRIPE_SECRET_KEY);

    const storeId = Number(await getStoreId());

    if (isNaN(storeId)) throw Error("Invalid store id");

    const payment = await db
      .select({
        stripeAccountId: payments.stripeAccountId,
      })
      .from(payments)
      .where(eq(payments.storeId, storeId));

    if (!payment[0].stripeAccountId) throw Error("Stripe Account Id not found");

    const paymentIntentOptions = {
      limit: 5,
    } as {
      limit: number;
      starting_after?: string;
      ending_before?: string;
    };

    if (startingAfterPaymentId) {
      paymentIntentOptions["starting_after"] = startingAfterPaymentId;
    } else if (beforePaymentId) {
      paymentIntentOptions["ending_before"] = beforePaymentId;
    }

    const paymentIntents = await stripe.paymentIntents.list(
      paymentIntentOptions,
      {
        stripeAccount: payment[0].stripeAccountId,
      }
    );

    return {
      paymentIntents: paymentIntents.data.map((item: StripePaymentIntent) => ({
        id: item.id,
        amount: item.amount / 100,
        created: item.created,
        cartId: item.metadata.cartId,
      })),
      hasMore: paymentIntents.has_more,
    };
    /*
    .filter(
      (item: StripePaymentIntent) =>
        !!item.metadata.cartId && item.status === "requires_payment_method"
    );
    */
  } catch (err) {
    console.log("error", err);
    return {
      paymentIntents: [],
      hasMore: false,
    };
  }
}
