"use client";

import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useMemo, useState } from "react";
import CheckoutForm from "./checkout-form";
import { ChevronRight } from "lucide-react";
import { routes } from "@/lib/routes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { OrderSummaryAccordion } from "./order-summary-accordion";

export default function CheckoutWrapper(props: {
  paymentIntent: Promise<{ clientSecret: string } | undefined>;
  storeStripeAccountId: string;
}) {
  const [clientSecret, setClientSecret] = useState("");
  const stripePromise = useMemo(
    () =>
      loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!, {
        stripeAccount: props.storeStripeAccountId,
      }),
    []
  );

  useEffect(() => {
    let error;
    props.paymentIntent.then((data) => {
      if (!data || !data.clientSecret) {
        error = true;
        return;
      }
      setClientSecret(data.clientSecret);
    });
    if (error) throw new Error("Payment intent not found");
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
        <div className="md:grid md:grid-cols-12 md:gap-8 mt-4 flex flex-col-reverse gap-6">
          <div className="col-span-8">
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
          <div className="col-span-4 bg-secondary rounded-md md:p-6 h-fit border-border border p-1 px-4">
            <div className="hidden md:block">
              <Heading size="h4">Order Summary</Heading>
            </div>
            <OrderSummaryAccordion title="Order Summary" className="md:hidden">
              Summary
            </OrderSummaryAccordion>
          </div>
        </div>
      )}
    </div>
  );
}
