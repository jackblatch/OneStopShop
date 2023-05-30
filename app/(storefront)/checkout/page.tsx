import { createPaymentIntent } from "@/server-actions/stripe/payment";
import CheckoutWrapper from "./components/CheckoutWrapper";

export default function Page() {
  const paymentIntent = createPaymentIntent({ items: [{ id: 1, qty: 4 }] });

  // providing the paymntIntent to the CheckoutWrapper to work around Nextjs bug with authentication not passed to server actions when called in client component
  return <CheckoutWrapper paymentIntent={paymentIntent} />;
}
