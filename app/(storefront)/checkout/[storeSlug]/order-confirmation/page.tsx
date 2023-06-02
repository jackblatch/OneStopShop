import { Heading } from "@/components/ui/heading";
import { getPaymentIntentDetails } from "@/server-actions/stripe/payment";
import { Verification } from "./components/verification";

export default async function OrderConfirmation({
  params,
  searchParams,
}: {
  params: {
    storeSlug: string;
  };
  searchParams: {
    payment_intent: string;
    payment_intent_client_secret: string;
    redirect_status: "success";
    delivery_postal_code: string;
  };
}) {
  const { paymentDetails, isVerified } = await getPaymentIntentDetails({
    paymentIntentId: searchParams.payment_intent,
    storeSlug: params.storeSlug,
    deliveryPostalCode: searchParams.delivery_postal_code,
  });

  return (
    <div>
      {isVerified ? (
        <div>
          <Heading size="h2">
            Thanks for your order,{" "}
            <span className="capitalize">
              {paymentDetails?.shipping?.name?.split(" ")[0]}
            </span>
            !
          </Heading>
          <p className="text-muted-foreground">
            Your payment confirmation ID is #
            {searchParams.payment_intent.slice(3)}
          </p>
          <div className="p-4 bg-secondary border border-border rounded-md mt-8">
            <Heading size="h4">Shipping Address</Heading>
            <p>{paymentDetails?.shipping?.name}</p>
            <p className="mb-3">{paymentDetails?.receipt_email}</p>
            <p>{paymentDetails?.shipping?.address?.line1}</p>
            <p>{paymentDetails?.shipping?.address?.line2}</p>
            <p>
              {paymentDetails?.shipping?.address?.city},{" "}
              {paymentDetails?.shipping?.address?.postal_code}
            </p>
            <p>
              {paymentDetails?.shipping?.address?.state},{" "}
              {paymentDetails?.shipping?.address?.country}
            </p>
          </div>
        </div>
      ) : (
        <div>
          <Heading size="h2">Thanks for your order!</Heading>
          <p className="mb-4">
            Please enter your delivery postcode below to view your order
            details.
          </p>
          <Verification />
        </div>
      )}
    </div>
  );
}
