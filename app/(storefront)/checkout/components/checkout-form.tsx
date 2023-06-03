"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { routes } from "@/lib/routes";
import { StripeCheckoutFormDetails } from "@/lib/types";
// https://stripe.com/docs/payments/quickstart

import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
  AddressElement,
} from "@stripe/react-stripe-js";
import {
  StripeAddressElementChangeEvent,
  StripeLinkAuthenticationElementChangeEvent,
  StripePaymentElementOptions,
} from "@stripe/stripe-js";
import { AlertCircle, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function CheckoutForm() {
  const { storeSlug } = useParams();
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/${routes.checkout}/${storeSlug}/${routes.orderConfirmation}`,
        receipt_email: email,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message ?? "An unexpected error occurred.");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  } as StripePaymentElementOptions;

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
    >
      {/* Show any error or success messages */}
      {message && (
        <div
          id="payment-message"
          className="bg-red-100 border border-red-600 text-red-800 rounded-md p-2 flex items-center justify-start gap-2"
        >
          <AlertCircle />
          <p> {message}</p>
        </div>
      )}
      <div className="flex flex-col gap-2 bg-secondary border-border border rounded-md md:p-6 p-4 md:pb-7 pb-5">
        <Heading size="h4">Contact Info</Heading>
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(e: StripeLinkAuthenticationElementChangeEvent) =>
            setEmail(e.value.email)
          }
        />
      </div>
      <div className="flex flex-col gap-2 bg-secondary border-border border rounded-md md:p-6 p-4 md:pb-7 pb-5">
        <Heading size="h4">Shipping</Heading>
        <AddressElement options={{ mode: "shipping" }} />
      </div>
      <div className="flex flex-col gap-2 bg-secondary border-border border rounded-md md:p-6 p-4 md:pb-7 pb-5">
        <Heading size="h4">Payment</Heading>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
      </div>
      <Button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-fit"
      >
        <div className="flex items-center justify-center gap-2">
          {!!isLoading && <Loader2 size={18} className="animate-spin" />}
          <p>Pay Now</p>
        </div>
      </Button>
    </form>
  );
}
