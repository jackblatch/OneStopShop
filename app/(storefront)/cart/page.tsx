import { CartLineItems } from "@/components/storefront/cart-line-items";
import { Heading } from "@/components/ui/heading";
import { db } from "@/db/db";
import { Product, products, stores } from "@/db/schema";
import { CartItem, ProductImages } from "@/lib/types";
import { eq, inArray } from "drizzle-orm";
import { cookies } from "next/headers";

async function getCartItemDetails(productIds: number[]) {
  const vals = await db
    .select({
      id: products.id,
      name: products.name,
      price: products.price,
      inventory: products.inventory,
      storeId: products.storeId,
      images: products.images,
      storeName: stores.name,
    })
    .from(products)
    .leftJoin(stores, eq(products.storeId, stores.id))
    .where(inArray(products.id, productIds));
  console.log(vals);
  return vals as (Omit<Product, "description" | "images"> & {
    storeName: string | null;
    images: ProductImages[];
  })[];
}

export default async function Cart() {
  const cartItems = cookies().get("cartItems");
  const cartItemDetails =
    cartItems &&
    (await getCartItemDetails(
      JSON.parse(cartItems.value).map((item: CartItem) => Number(item.id))
    ));

  const uniqueStoreIds = [
    ...(new Set(cartItemDetails?.map((item) => item.storeId)) as any),
  ] as number[];

  console.log(cartItemDetails);

  // account for empty cart as well

  return (
    <div className="flex flex-col gap-6">
      <Heading size="h2">Cart</Heading>
      <div className="grid grid-cols-9 gap-24">
        <div className="col-span-6 flex flex-col gap-8">
          {uniqueStoreIds.map((storeId) => (
            <div>
              <Heading size="h4">
                {
                  cartItemDetails?.find((item) => item.storeId === storeId)
                    ?.storeName
                }
              </Heading>
              <CartLineItems
                cartItems={cartItems && JSON.parse(cartItems.value)}
                products={
                  cartItemDetails?.filter((item) => item.storeId === storeId) ??
                  []
                }
              />
            </div>
          ))}
        </div>
        <div className="bg-secondary col-span-3 rounded-md border border-border p-6">
          <Heading size="h3">Order Summary</Heading>
        </div>
      </div>
    </div>
  );
}
