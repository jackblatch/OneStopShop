"use client";

import {
  StripeElement,
  StripeElementsOptions,
  loadStripe,
} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { createPaymentIntent } from "@/server-actions/stripe/payment";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutWrapper(props: {
  paymentIntent: Promise<{ clientSecret: string }>;
}) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    props.paymentIntent.then((data) => setClientSecret(data.clientSecret));
  }, []);

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  } as StripeElementsOptions;

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
