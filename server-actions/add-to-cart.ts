"use server";

import { CartItem } from "@/lib/types";
import { cookies } from "next/headers";

export async function addToCart(newCartItem: CartItem) {
  console.log("adding to cart");
  const cookieStore = cookies();
  let existingCartItems;
  let itemAlreadyExists;
  const storedCookies = cookieStore.get("cartItems");

  if (storedCookies) {
    const parsedItems: CartItem[] = JSON.parse(storedCookies.value);
    console.log({ parsedItems });
    itemAlreadyExists = parsedItems.find(
      (item) => item.id === newCartItem.id
    ) as CartItem | undefined;
    existingCartItems =
      Array.isArray(parsedItems) && parsedItems.length > 0
        ? parsedItems.filter((item) => item.id !== newCartItem.id)
        : null;
  }

  // @ts-ignore
  cookieStore.set(
    "cartItems",
    existingCartItems
      ? JSON.stringify([
          ...existingCartItems,
          {
            ...newCartItem,
            qty: itemAlreadyExists
              ? newCartItem.qty + itemAlreadyExists.qty
              : newCartItem.qty,
          },
        ])
      : JSON.stringify([newCartItem])
  );
  return true;
}
