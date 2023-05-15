"use server";

import { CartItem } from "@/lib/types";
import { cookies } from "next/headers";

export async function updateCart(updateCartItem: CartItem) {
  const cookieStore = cookies();
  let cartItemsExcludingUpdateItem;
  const storedCookies = cookieStore.get("cartItems");

  if (storedCookies) {
    const parsedItems: CartItem[] = JSON.parse(storedCookies.value);
    cartItemsExcludingUpdateItem =
      Array.isArray(parsedItems) && parsedItems.length > 0
        ? parsedItems.filter((item) => item.id !== updateCartItem.id)
        : [];
  }

  if (updateCartItem.qty > 0) {
    // @ts-ignore
    cookieStore.set(
      "cartItems",
      cartItemsExcludingUpdateItem && cartItemsExcludingUpdateItem.length
        ? JSON.stringify([...cartItemsExcludingUpdateItem, updateCartItem])
        : JSON.stringify([updateCartItem])
    );
  } else {
    // @ts-ignore
    cookieStore.set(
      "cartItems",
      cartItemsExcludingUpdateItem && cartItemsExcludingUpdateItem.length
        ? JSON.stringify(cartItemsExcludingUpdateItem)
        : JSON.stringify([])
    );
  }
  console.log("UPDATE CART--------", cookieStore.get("cartItems")?.value);
  return true;
}
