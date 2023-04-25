import { db } from "@/db/db";
import { products } from "@/db/schema";
import { createProduct } from "@/lib/apiTypes";
import { currentUser } from "@clerk/nextjs/app-beta";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  const schema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.string().nullable(),
    inventory: z.string().nullable(),
  });

  try {
    const { productValues }: { productValues: createProduct["input"] } =
      await request.json();

    if (!schema.parse(productValues)) {
      throw new Error("invalid input");
    }

    const user = await currentUser();

    const values = {
      name: productValues.name,
      description: productValues.description,
      price: isNaN(Number(productValues.price))
        ? 0
        : Number(productValues.price),
      inventory: isNaN(Number(productValues.inventory))
        ? 0
        : Number(productValues.inventory),
      storeId: Number(user?.privateMetadata.storeId),
    };

    const dbRes = await db.insert(products).values(values as any); // @TODO: TS error here complaining about 'name' being not included

    const res: createProduct["output"] = {
      error: false,
      message: "Product created",
      action: "Success, your new product has been created",
      productId: dbRes.insertId,
    };

    return NextResponse.json(res);
  } catch (err) {
    console.log(err);
    const res: createProduct["output"] = {
      error: true,
      message: "Sorry, an error occured creating your product.",
      action: "Please try again.",
    };
    return NextResponse.json(res);
  }
}
