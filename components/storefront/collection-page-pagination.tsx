import { db } from "@/db/db";
import { products } from "@/db/schema";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { PaginationButton } from "../pagination-button";

export const CollectionPagePagination = async (props: {
  productsPerPage: number;
}) => {
  const productIds = await db
    .select({
      id: products.id,
    })
    .from(products);

  const numberOfPages = Math.round(productIds.length / props.productsPerPage);

  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from(Array(numberOfPages)).map((_, i) => (
        <Link href={`${routes.products}?page=${i + 1}`} key={i}>
          <PaginationButton pageNumber={i + 1} searchParamName="page" />
        </Link>
      ))}
    </div>
  );
};
