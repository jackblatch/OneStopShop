"use client";

import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { ChevronRight } from "lucide-react";
import { routes } from "@/lib/routes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

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
    <div>
      <Heading size="h2">Checkout</Heading>
      <div className="text-muted-foreground flex items-center justify-start gap-1">
        <Link href={routes.cart}>
          <Button variant="link" className="p-0 text-muted-foreground">
            Cart
          </Button>
        </Link>
        <ChevronRight size={16} />
        <Button
          variant="link"
          className="p-0 text-muted-foreground hover:no-underline hover:cursor-auto"
        >
          Checkout
        </Button>
      </div>
      {clientSecret && (
        <div className="grid grid-cols-12 gap-8 mt-4">
          <div className="col-span-8 bg-secondary rounded-md p-6 border-border border">
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
          <div className="col-span-4 bg-secondary rounded-md p-6 h-fit border-border border">
            <p>test</p>
          </div>
        </div>
      )}
    </div>
  );
}
