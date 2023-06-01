import { createPaymentIntent } from "@/server-actions/stripe/payment";
import CheckoutWrapper from "../components/checkout-wrapper";
import { cookies } from "next/headers";
import { getCart } from "@/server-actions/get-cart-details";
import { db } from "@/db/db";
import { payments, products, stores } from "@/db/schema";
import { eq } from "drizzle-orm";
import { CheckoutItem } from "@/lib/types";
import { CartLineItems } from "@/components/storefront/cart-line-items";
import { InfoCard } from "@/components/admin/info-card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import Link from "next/link";
import { hasConnectedStripeAccount } from "@/server-actions/stripe/account";

export default async function Page({
  params,
}: {
  params: { storeSlug: string };
}) {
  const cartId = cookies().get("cartId")?.value;
  const { cartItems, cartItemDetails } = await getCart(Number(cartId));

  const store = await db
    .select({
      storeId: stores.id,
      stripeAccountId: payments.stripeAccountId,
    })
    .from(stores)
    .leftJoin(payments, eq(payments.storeId, stores.id))
    .where(eq(stores.slug, params.storeSlug));

  const storeId = Number(store[0].storeId);
  const storeStripeAccountId = store[0].stripeAccountId;

  const storeProducts = await db
    .select({
      id: products.id,
      price: products.price,
    })
    .from(products)
    .leftJoin(stores, eq(products.storeId, stores.id))
    .where(eq(stores.id, storeId));

  // @TODO: check if items from this store are in the cart

  const detailsOfProductsInCart = cartItems
    .map((item) => {
      const product = storeProducts.find((p) => p.id === item.id);
      const priceAsNumber = Number(product?.price);
      if (!product || isNaN(priceAsNumber)) return undefined;
      return {
        id: item.id,
        price: priceAsNumber,
        qty: item.qty,
      };
    })
    .filter(Boolean) as CheckoutItem[];

  if (
    !storeStripeAccountId ||
    !(await hasConnectedStripeAccount(storeId, true))
  ) {
    return (
      <InfoCard
        heading="Online payments not setup"
        subheading="This seller does not have online payments setup yet. Please contact the seller directly to submit your order."
        icon={<AlertCircle size={24} />}
        button={
          <Link href={routes.cart}>
            <Button>Return to cart</Button>
          </Link>
        }
      />
    );
  }

  if (
    !storeProducts.length ||
    isNaN(storeId) ||
    !detailsOfProductsInCart.length
  )
    throw new Error("Store not found");

  const paymentIntent = createPaymentIntent({
    items: detailsOfProductsInCart,
    storeId,
  });

  // providing the paymntIntent to the CheckoutWrapper to work around Nextjs bug with authentication not passed to server actions when called in client component
  return (
    <CheckoutWrapper
      detailsOfProductsInCart={detailsOfProductsInCart}
      paymentIntent={paymentIntent}
      storeStripeAccountId={storeStripeAccountId}
      cartLineItems={
        <CartLineItems
          variant="checkout"
          cartItems={cartItems}
          products={
            cartItemDetails?.filter((item) => item.storeId === storeId) ?? []
          }
        />
      }
    />
  );
}
