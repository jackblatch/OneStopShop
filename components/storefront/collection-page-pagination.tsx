import { db } from "@/db/db";
import { products } from "@/db/schema";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { PaginationButton } from "../pagination-button";
import { Button } from "../ui/button";
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
