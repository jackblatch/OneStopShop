import { db } from "@/db/db";
import { payments } from "@/db/schema";
import { platformFeeDecimal } from "@/lib/application-constants";
import { CheckoutItem } from "@/lib/types";
import { eq } from "drizzle-orm";
import stripeDetails from "stripe";

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

    console.log({ stripeAccountId });

    if (!stripeAccountId) {
      console.log("erro");
      throw new Error("Stripe Account Id not found");
    }

    // Create a PaymentIntent with the order amount and currency
    const { orderTotal, platformFee } = calculateOrderAmounts(items);
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: orderTotal,
        currency: "usd",
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
