import { db } from "@/db/db";
import { products, stores } from "@/db/schema";
import { PaginationRow } from "../pagination-row";
import { eq } from "drizzle-orm";

export const CollectionPagePagination = async (props: {
  productsPerPage: number;
  sellerParams: string;
}) => {
  // console.log(context.searchParams);
  const numberOfProducts = (
    await db
      .select({
        product: {
          id: products.id,
        },
        store: {
          slug: stores.slug,
        },
      })
      .from(products)
      .where(() => {
        if (props.sellerParams === undefined || props.sellerParams === "")
          return;
        return eq(stores.slug, props.sellerParams);
      })
      .leftJoin(stores, eq(products.storeId, stores.id))
  ).length;

  const numberOfPages =
    Math.floor(numberOfProducts / props.productsPerPage) + 1;

  return (
    <PaginationRow pagesArray={Array.from(Array(numberOfPages).fill(0))} />
  );
};
