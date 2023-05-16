import { CartLineItems } from "@/components/storefront/cart-line-items";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { db } from "@/db/db";
import { carts, products, stores } from "@/db/schema";
import { routes } from "@/lib/routes";
import { CartItem, CartLineItemDetails } from "@/lib/types";
import { eq, inArray } from "drizzle-orm";
import { ChevronRight } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

async function getCartItemDetails(
  cartId: number | null,
  cartItems: CartItem[]
) {
  if (!cartId) return [];
  const productIds = cartItems.map((item) => Number(item.id));
  if (!productIds.length) return [];
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
  return vals as CartLineItemDetails[];
}

export default async function Cart() {
  const cartId = cookies().get("cartId")?.value;

  if (isNaN(Number(cartId))) {
    return (
      <div className="mt-4 gap-4 rounded-md border-2 border-dashed border-gray-200 p-6 text-center h-[200px] flex items-center justify-center flex-col">
        <Heading size="h3">Your cart is empty</Heading>
        <Link href={routes.products}>
          <Button>Start shopping</Button>
        </Link>
      </div>
    );
  }

  const dbCartItemsObj = await db
    .select()
    .from(carts)
    .where(eq(carts.id, Number(cartId)));
  const cartItems = dbCartItemsObj
    ? (JSON.parse(dbCartItemsObj[0].items as string) as CartItem[])
    : [];
  const cartItemDetails = !!cartItems
    ? await getCartItemDetails(cartId ? Number(cartId) : null, cartItems)
    : [];

  const uniqueStoreIds = [
    ...(new Set(cartItemDetails?.map((item) => item.storeId)) as any),
  ] as number[];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Heading size="h2">Cart</Heading>
        <Link href={routes.products}>
          <Button
            variant="link"
            className="flex items-end justify-center m-0 p-0 text-muted-foreground"
          >
            <p>Continue shopping</p>
            <ChevronRight size={16} />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-9 gap-24">
        <div className="col-span-6 flex flex-col gap-8">
          {uniqueStoreIds.map((storeId, i) => (
            <div key={i}>
              <Heading size="h4">
                {
                  cartItemDetails?.find((item) => item.storeId === storeId)
                    ?.storeName
                }
              </Heading>
              <CartLineItems
                cartItems={cartItems}
                products={
                  cartItemDetails?.filter((item) => item.storeId === storeId) ??
                  []
                }
              />
            </div>
          ))}
        </div>
        <div className="bg-secondary col-span-3 rounded-md border border-border p-6 h-fit">
          <Heading size="h3">Cart Summary</Heading>
        </div>
      </div>
    </div>
  );
}
