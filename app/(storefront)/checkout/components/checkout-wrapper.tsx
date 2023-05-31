"use client";

import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useMemo, useState } from "react";
import CheckoutForm from "./checkout-form";
import { ChevronRight } from "lucide-react";
import { StarSVG } from "@/components/icons/star";
import { routes } from "@/lib/routes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { OrderSummaryAccordion } from "./order-summary-accordion";
import { FeatureIcons } from "@/components/storefront/feature-icons";

export default function CheckoutWrapper(props: {
  paymentIntent: Promise<{ clientSecret: string } | undefined>;
  storeStripeAccountId: string;
  cartLineItems: React.ReactNode;
}) {
  const [clientSecret, setClientSecret] = useState("");
  const stripePromise = useMemo(
    () =>
      loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!, {
        stripeAccount: props.storeStripeAccountId,
      }),
    [props.storeStripeAccountId]
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
  }, [props.paymentIntent]);

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
        <div>
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 mt-4 flex flex-col-reverse gap-6">
            <div className="col-span-7">
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </div>
            <div className="col-span-5">
              <div className="bg-secondary rounded-lg lg:p-6 h-fit border-border border p-1 px-4 lg:mb-8">
                <div className="hidden lg:flex flex-col gap-2">
                  <Heading size="h4">Order Summary</Heading>
                  {props.cartLineItems}
                </div>
                <OrderSummaryAccordion
                  title="Order Summary"
                  className="lg:hidden"
                >
                  {props.cartLineItems}
                </OrderSummaryAccordion>
              </div>
              <div className="lg:hidden bg-secondary border border-border p-5 pt-8 mt-8 rounded-md">
                <TrustBadges />
              </div>
              <div className="hidden lg:block">
                <TrustBadges />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const TrustBadges = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-6">
      <div className="flex flex-col gap-2 items-center justify-center">
        <p className="text-lg font-semibold text-center">
          Hundreds of happy customers worldwide
        </p>
        <div className="flex items-center justify-center gap-1">
          {Array.from(Array(5)).map((_, i) => (
            <div className="max-w-2" key={i}>
              <StarSVG />
            </div>
          ))}
        </div>
      </div>
      <FeatureIcons />
    </div>
  );
};
