import { createPaymentIntent } from "@/server-actions/stripe/payment";
import CheckoutWrapper from "../components/checkout-wrapper";
import { cookies } from "next/headers";
import { getCart } from "@/server-actions/get-cart-details";
import { db } from "@/db/db";
import { payments, products, stores } from "@/db/schema";
import { eq } from "drizzle-orm";
import { CheckoutItem } from "@/lib/types";
import { CartLineItems } from "@/components/storefront/cart-line-items";

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
      if (!product) return null;
      const priceAsNumber = Number(product?.price);
      return {
        id: item.id,
        price: isNaN(priceAsNumber) ? null : priceAsNumber,
        qty: item.qty,
      };
    })
    .filter((item) => !item || item.price !== null) as CheckoutItem[];

  if (
    !storeProducts.length ||
    isNaN(storeId) ||
    !storeStripeAccountId ||
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
