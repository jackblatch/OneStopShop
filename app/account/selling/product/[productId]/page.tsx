import { AccountHeading } from "@/components/admin/account-heading";
import { ProductEditor } from "@/components/admin/product-editor";
import { db } from "@/db/db";
import { products } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/app-beta";
import { and, eq } from "drizzle-orm";

export default async function ProductDetailPage(props: {
  params: { productId: string };
}) {
  const user = await currentUser();

  const productDetails = await db
    .select()
    .from(products)
    .where(
      and(
        eq(products.storeId, Number(user?.privateMetadata.storeId)),
        eq(products.id, Number(props.params.productId))
      )
    )
    .then((res) => {
      if (res.length === 0) {
        throw new Error("Product not found or user not authorised");
      }
      return res[0];
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });

  console.log({ productDetails });

  return (
    <>
      <ProductEditor
        productStatus="existing-product"
        initialValues={productDetails}
      />
    </>
  );
}
