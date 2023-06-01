"use server";

import { db } from "@/db/db";
import { carts } from "@/db/schema";
import { CartItem } from "@/lib/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addToCart(newCartItem: CartItem) {
  const cookieStore = cookies();

  const cartId = cookieStore.get("cartId")?.value;
  const cartDetails =
    cartId &&
    (await db
      .select()
      .from(carts)
      .where(eq(carts.id, Number(cartId))));
  const cartAvailableAndOpen = cartDetails && !cartDetails[0].isClosed;

  if (cartAvailableAndOpen) {
    const dbItems = await db
      .select()
      .from(carts)
      .where(eq(carts.id, Number(cartId)));

    const allItemsInCart = JSON.parse(dbItems[0].items as string) as CartItem[];

    const newCartItemInCart = allItemsInCart.find(
      (item) => item.id === newCartItem.id
    ) as CartItem | undefined;

    const cartItemsWithOutCurrentItem = allItemsInCart.filter(
      (item) => item.id !== newCartItem.id
    );

    await db
      .update(carts)
      .set({
        items: allItemsInCart
          ? JSON.stringify([
              ...cartItemsWithOutCurrentItem,
              {
                ...newCartItem,
                qty: newCartItemInCart
                  ? newCartItem.qty + newCartItemInCart.qty
                  : newCartItem.qty,
              },
            ])
          : JSON.stringify([newCartItem]),
      })
      .where(eq(carts.id, Number(cartId)));
    revalidatePath("/");
    return;
  } else {
    const newCart = await db
      .insert(carts)
      .values({ items: JSON.stringify([newCartItem]) });
    // @ts-ignore
    cookieStore.set("cartId", String(newCart.insertId));
    revalidatePath("/");
    return;
  }
}
