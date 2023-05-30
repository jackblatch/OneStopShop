import { CartItem } from "@/lib/types";
import stripeDetails from "stripe";

export async function createPaymentIntent({ items }: { items: CartItem[] }) {
  // This is your test secret API key.
  // @ts-ignore
  const stripe = stripeDetails(process.env.STRIPE_SECRET_KEY);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return { clientSecret: paymentIntent.client_secret };
}

// Helper Functions
const calculateOrderAmount = (items: CartItem[]) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};
