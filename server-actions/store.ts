"use server";

import { db } from "@/db/db";
import { stores } from "@/db/schema";
import { currentUser } from "@clerk/nextjs";
import { users } from "@clerk/nextjs/dist/api";
import { eq, or } from "drizzle-orm";
import { z } from "zod";
import { createSlug } from "@/lib/createSlug";

export async function createStore(storeName: string) {
  try {
    const existingStore = await db
      .select()
      .from(stores)
      .where(
        or(eq(stores.name, storeName), eq(stores.slug, createSlug(storeName)))
      );

    if (existingStore.length > 0) {
      const res = {
        error: true,
        message: "Sorry, a store with that name already exists.",
        action: "Please try again.",
      };
      return res;
    }

    const { insertId: storeId } = await db.insert(stores).values({
      name: storeName,
      slug: createSlug(storeName),
    });

    const user = await currentUser();
    if (!user) {
      const res = {
        error: false,
        message: "Unauthenticated",
        action: "User is not authenticated",
      };

      return res;
    }

    if (user?.privateMetadata.storeId) {
      const res = {
        error: false,
        message: "Store already exists",
        action: "You already have a store",
      };

      return res;
    }

    await users.updateUser(user.id, {
      privateMetadata: { ...user.privateMetadata, storeId },
    });

    const res = {
      error: false,
      message: "Store created",
      action: "Success, your store has been created",
    };

    return res;
  } catch (err) {
    console.log(err);
    const res = {
      error: true,
      message: "Sorry, an error occured creating your store. ",
      action: "Please try again.",
    };
    return res;
  }
}

export async function updateStore(args: {
  name: string | null;
  description: string | null;
  industry: string | null;
}) {
  const inputSchema = z.object({
    name: z.string(),
    description: z.string(),
    industry: z.string(),
  });

  try {
    const user = await currentUser();

    if (!inputSchema.parse(args)) {
      throw new Error("invalid input");
    }

    await db
      .update(stores)
      .set(args)
      .where(eq(stores.id, Number(user?.privateMetadata.storeId)));

    const res = {
      error: false,
      message: "Store details updated",
      action: "Success, your store's details have been updated",
    };

    return res;
  } catch (err) {
    console.log(err);
    const res = {
      error: true,
      message: "Sorry, an error occured updating your details.",
      action: "Please try again.",
    };
    return res;
  }
}
