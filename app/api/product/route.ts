import { db } from "@/db/db";
import { products } from "@/db/schema";
import type { createProduct, UpdateProduct } from "@/lib/apiTypes";
import { currentUser } from "@clerk/nextjs/app-beta";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  const schema = z.object({
    name: z.string().nonempty(),
    description: z.string(),
    price: z.string().nullable(),
    inventory: z.string().nullable(),
  });

  try {
    const { productValues }: { productValues: createProduct["input"] } =
      await request.json();

    schema.parse(productValues);

    console.log({ productValues });

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
      images: productValues.images,
      storeId: Number(user?.privateMetadata.storeId),
    };

    const dbRes = await db.insert(products).values(values as any); // @TODO: TS error here complaining about 'name' being not included
    console.log({ dbRes });
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

export async function PUT(request: Request) {
  const schema = z.object({
    name: z.string().nonempty(),
    description: z.string(),
    price: z.string().nullable(),
    inventory: z.string().nullable(),
    id: z.number(),
  });

  try {
    const { productValues }: { productValues: UpdateProduct["input"] } =
      await request.json();

    schema.parse(productValues);

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
      images: productValues.images,
      storeId: Number(user?.privateMetadata.storeId),
    };

    const dbRes = await db
      .update(products)
      .set(values as any)
      .where(eq(products.id, productValues.id));
    console.log({ dbRes });
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
