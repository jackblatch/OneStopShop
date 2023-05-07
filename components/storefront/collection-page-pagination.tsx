import { db } from "@/db/db";
import { products } from "@/db/schema";
import { PaginationRow } from "../pagination-row";

export const CollectionPagePagination = async (props: {
  productsPerPage: number;
}) => {
  const productIds = await db
    .select({
      id: products.id,
    })
    .from(products);

  const numberOfPages =
    Math.floor(productIds.length / props.productsPerPage) + 1;

  return (
    <PaginationRow pagesArray={Array.from(Array(numberOfPages).fill(0))} />
  );
};
