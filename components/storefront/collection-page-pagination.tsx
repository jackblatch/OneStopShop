import { db } from "@/db/db";
import { products, stores } from "@/db/schema";
import { PaginationRow } from "../pagination-row";
import { eq, inArray } from "drizzle-orm";

export const CollectionPagePagination = async (props: {
  productsPerPage: number;
  sellerParams: string;
}) => {
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
        return inArray(stores.slug, props.sellerParams.split("_"));
      })
      .leftJoin(stores, eq(products.storeId, stores.id))
  ).length;

  const unroundedNumberOfPages = numberOfProducts / props.productsPerPage;

  const numberOfPages =
    unroundedNumberOfPages === Math.floor(unroundedNumberOfPages)
      ? unroundedNumberOfPages
      : Math.floor(unroundedNumberOfPages) + 1;

  return (
    <PaginationRow pagesArray={Array.from(Array(numberOfPages).fill(0))} />
  );
};
