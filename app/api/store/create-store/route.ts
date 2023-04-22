import { db } from "@/db/db";
import { stores } from "@/db/schema";
import { createStore } from "@/lib/apiTypes";
import { currentUser } from "@clerk/nextjs/app-beta";
import { users } from "@clerk/nextjs/dist/api";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { storeName }: createStore["input"] = await request.json();
    const existingStore = await db
      .select()
      .from(stores)
      .where(eq(stores.name, storeName));

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
      .values({ name: storeName });

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
