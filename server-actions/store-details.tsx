"use server";
import { db } from "@/db/db";
import { stores } from "@/db/schema";
import { currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

export async function getStoreId() {
  const user = await currentUser();
  return user?.privateMetadata.storeId;
}

export async function getStoreSlug(storeId: number) {
  const slugs = await db
    .select({
      slug: stores.slug,
    })
    .from(stores)
    .where(eq(stores.id, storeId));
  return slugs[0].slug;
}
