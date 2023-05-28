"use server";
import { currentUser } from "@clerk/nextjs";

export async function getStoreId() {
  const user = await currentUser();
  return user?.privateMetadata.storeId;
}
