"use server";

import { db } from "@/db/db";
import { carts, payments, stores } from "@/db/schema";
import { platformFeeDecimal } from "@/lib/application-constants";
import { CheckoutItem } from "@/lib/types";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import Stripe from "stripe";
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
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2022-11-15",
    });

    const payment = await db
      .select()
      .from(payments)
      .where(eq(payments.storeId, storeId));

    const stripeAccountId = payment[0].stripeAccountId;

    if (!stripeAccountId) {
      throw new Error("Stripe Account Id not found");
    }

    const cartId = Number(cookies().get("cartId")?.value);

    const metadata = {
      cartId: isNaN(cartId) ? "" : cartId,
      items: JSON.stringify(items),
    };

    const { orderTotal, platformFee } = calculateOrderAmounts(items);

    // check if cartid has a paymentIntent already
    if (!isNaN(cartId)) {
      const paymentIntent = await db
        .select({
          paymentIntentId: carts.paymentIntentId,
          clientSecret: carts.clientSecret,
        })
        .from(carts)
        .where(eq(carts.id, cartId));

      if (paymentIntent[0].clientSecret && paymentIntent[0].paymentIntentId) {
        await stripe.paymentIntents.update(
          paymentIntent[0].paymentIntentId,
          {
            amount: orderTotal,
            application_fee_amount: platformFee,
            metadata,
          },
          {
            stripeAccount: stripeAccountId,
          }
        );
        return { clientSecret: paymentIntent[0].clientSecret };
      }
    }

    // If no existing paymentIntent connected to cart, create a new PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: orderTotal,
        currency: "usd",
        metadata,
        automatic_payment_methods: {
          enabled: true,
        },
        application_fee_amount: platformFee,
      },
      {
        stripeAccount: stripeAccountId,
      }
    );
    // save paymentIntent to cart in db
    await db
      .update(carts)
      .set({
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
      })
      .where(eq(carts.id, cartId));
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
    orderTotal: Number((total * 100).toFixed(0)), // converts to cents which stripe charges in
    platformFee: Number((fee * 100).toFixed(0)),
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
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2022-11-15",
    });

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
      paymentIntents: paymentIntents.data.map((item) => ({
        id: item.id,
        amount: item.amount / 100,
        created: item.created,
        cartId: Number(item.metadata.cartId),
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

export async function getPaymentIntentDetails({
  paymentIntentId,
  storeSlug,
  deliveryPostalCode,
}: {
  paymentIntentId: string;
  storeSlug: string;
  deliveryPostalCode?: string;
}) {
  try {
    const cartId = cookies().get("cartId")?.value;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2022-11-15",
    });

    const store = await db
      .select({
        stripeAccountId: payments.stripeAccountId,
      })
      .from(stores)
      .leftJoin(payments, eq(payments.storeId, stores.id))
      .where(eq(stores.slug, storeSlug));

    if (!store[0].stripeAccountId) throw Error("Store not found");

    const paymentDetails = await stripe.paymentIntents.retrieve(
      paymentIntentId,
      {
        stripeAccount: store[0].stripeAccountId,
      }
    );

    if (
      paymentDetails.metadata.cartId !== cartId &&
      deliveryPostalCode !==
        paymentDetails.shipping?.address?.postal_code?.split(" ").join("")
    ) {
      throw Error("Invalid cart id - further verification needed");
    }

    return { paymentDetails, isVerified: true };
  } catch (err) {
    console.log("ERROR", err);
    return { isVerified: false };
  }
}
