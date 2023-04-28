import type { updateStoreDetails } from "@/lib/apiTypes";
import { db } from "@/db/db";
import { stores } from "@/db/schema";
import { createStore } from "@/lib/apiTypes";
import { currentUser } from "@clerk/nextjs/app-beta";
import { users } from "@clerk/nextjs/dist/api";
import { eq, or } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { createSlug } from "@/lib/createSlug";

export async function POST(request: Request) {
  const inputSchema = z.object({
    storeName: z.string(),
  });

  try {
    const { storeName }: createStore["input"] = await request.json();

    inputSchema.parse(storeName);

    const existingStore = await db
      .select()
      .from(stores)
      .where(
        or(eq(stores.name, storeName), eq(stores.slug, createSlug(storeName)))
      );

    if (existingStore.length > 0) {
      const res: createStore["output"] = {
        error: true,
        message: "Sorry, a store with that name already exists.",
        action: "Please try again.",
      };
      return NextResponse.json(res);
    }

    const { insertId: storeId } = await db
      .insert(stores)
      .values({ name: storeName, slug: createSlug(storeName) });

    const user = await currentUser();
    if (user && !user.privateMetadata.storeId) {
      await users.updateUser(user.id, {
        privateMetadata: { ...user.privateMetadata, storeId },
      });
    }

    const res: createStore["output"] = {
      error: false,
      message: "Store created",
      action: "Success, your store has been created",
    };

    return NextResponse.json(res);
  } catch (err) {
    const res: createStore["output"] = {
      error: true,
      message: "Sorry, an error occured creating your store. ",
      action: "Please try again.",
    };
    return NextResponse.json(res);
  }
}

export async function PUT(request: Request) {
  const inputSchema = z.object({
    newStoreValues: z.object({
      name: z.string(),
      description: z.string(),
      industry: z.string(),
    }),
  });

  try {
    const { newStoreValues }: updateStoreDetails["input"] =
      await request.json();
    const user = await currentUser();

    if (!inputSchema.parse(newStoreValues)) {
      throw new Error("invalid input");
    }

    await db
      .update(stores)
      .set(newStoreValues)
      .where(eq(stores.id, Number(user?.privateMetadata.storeId)));

    const res: updateStoreDetails["output"] = {
      error: false,
      message: "Store details updated",
      action: "Success, your store's details have been updated",
    };

    return NextResponse.json(res);
  } catch (err) {
    const res: updateStoreDetails["output"] = {
      error: true,
      message: "Sorry, an error occured updating your details.",
      action: "Please try again.",
    };
    return NextResponse.json(res);
  }
}
