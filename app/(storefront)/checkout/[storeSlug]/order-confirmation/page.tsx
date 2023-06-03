import { Heading } from "@/components/ui/heading";
import { getPaymentIntentDetails } from "@/server-actions/stripe/payment";
import { Verification } from "./components/verification";
import { OrderConfirmationLineItems } from "./components/order-confirmation-line-items";
import { db } from "@/db/db";
import { products, stores } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { CheckoutItem, OrderConfirmationDetails } from "@/lib/types";
import { Check } from "lucide-react";

const getProducts = async (checkoutItems: CheckoutItem[]) => {
  return (await db
    .select({
      id: products.id,
      name: products.name,
      images: products.images,
      storeId: products.storeId,
    })
    .from(products)
    .where(
      inArray(
        products.id,
        checkoutItems.map((item) => item.id)
      )
    )) as OrderConfirmationDetails[];
};

const getSellerName = async (storeSlug: string) => {
  return await db
    .select({
      name: stores.name,
    })
    .from(stores)
    .where(eq(stores.slug, storeSlug));
};

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

  const checkoutItems = JSON.parse(paymentDetails?.metadata?.items ?? "[]");

  let products: OrderConfirmationDetails[] = [];
  let sellerDetails;
  if (isVerified) {
    sellerDetails = (await getSellerName(params.storeSlug))[0];
    products = await getProducts(checkoutItems);
  }

  return (
    <div className="mt-8">
      {isVerified ? (
        <div>
          <Heading size="h2">
            <div className="flex md:flex-row flex-col items-start md:items-center justify-start gap-4 md:gap-2">
              <div className="border-2 border-green-600 text-green-600 bg-transparent rounded-full h-10 w-10 flex items-center justify-center">
                <Check className="text-green-600" size={26} />
              </div>
              <span>
                Thanks for your order,{" "}
                <span className="capitalize">
                  {paymentDetails?.shipping?.name?.split(" ")[0]}
                </span>
                !
              </span>
            </div>
          </Heading>
          <p className="text-muted-foreground mt-4">
            Your payment confirmation ID is #
            {searchParams.payment_intent.slice(3)}
          </p>
          <div className="flex flex-col gap-4 mt-8">
            <div className="p-6 bg-secondary border border-border rounded-md">
              <Heading size="h3">What&apos;s next?</Heading>
              <p>
                Our warehouse team is busy preparing your order. You'll receive
                an email once your order ships.
              </p>
            </div>
            <div className="lg:grid grid-cols-2 gap-4 flex flex-col">
              <div className="p-6 bg-secondary border border-border rounded-md sm:grid grid-cols-3 flex flex-col gap-4">
                <div className="sm:col-span-2">
                  <div className="mb-2">
                    <Heading size="h4">Shipping Address</Heading>
                  </div>
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
                <div>
                  <div className="mb-2">
                    <Heading size="h4">Seller Details</Heading>
                  </div>
                  <p>{sellerDetails?.name}</p>
                </div>
              </div>
              <div className="p-6 border border-border bg-secondary rounded-md">
                <div className="mb-2">
                  <Heading size="h4">Order Details</Heading>
                </div>
                <OrderConfirmationLineItems
                  checkoutItems={checkoutItems}
                  products={products}
                />
              </div>
            </div>
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
