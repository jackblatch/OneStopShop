"use server";

import { db } from "@/db/db";
import { products } from "@/db/schema";
import { CheckoutItem, OrderItemDetails } from "@/lib/types";
import { inArray } from "drizzle-orm";

export const getDetailsOfProductsOrdered = async (
  checkoutItems: CheckoutItem[]
) => {
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
    )) as OrderItemDetails[];
};
