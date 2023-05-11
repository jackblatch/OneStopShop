"use server";

import { db } from "@/db/db";
import { products } from "@/db/schema";
import { like } from "drizzle-orm";

export async function getProductsBySearchTerm(searchTerm: string) {
  return await db
    .select({
      id: products.id,
      name: products.name,
      images: products.images,
      price: products.price,
    })
    .from(products)
    .where(like(products.name, `%${searchTerm}%`));
}
