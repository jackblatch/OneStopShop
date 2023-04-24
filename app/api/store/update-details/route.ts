import { db } from "@/db/db";
import { stores } from "@/db/schema";
import type { updateStoreDetails } from "@/lib/apiTypes";
import { currentUser } from "@clerk/nextjs/app-beta";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { newStoreValues }: updateStoreDetails["input"] =
      await request.json();
    const user = await currentUser();

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
