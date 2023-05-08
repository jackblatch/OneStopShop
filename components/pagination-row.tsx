"use client";
import Link from "next/link";
import { PaginationButton } from "./pagination-button";
import { Button } from "./ui/button";
import { routes } from "@/lib/routes";
import { useSearchParams } from "next/navigation";

export const PaginationRow = (props: { pagesArray: number[] }) => {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");

  const okToApplyPageCommand =
    !isNaN(Number(pageParam)) &&
    Number(pageParam) - 1 >= 1 &&
    Number(pageParam) !== props.pagesArray.length &&
    Number(pageParam) !== props.pagesArray.length - 1;

  return (
    <div className="flex items-center justify-center gap-2">
      {!isNaN(Number(pageParam)) && Number(pageParam) - 1 >= 1 && (
        <Link href={`${routes.products}?page=${Number(pageParam) - 1}`}>
          <Button variant="secondary">Prev</Button>
        </Link>
      )}
      {[
        !!okToApplyPageCommand ? Number(pageParam) - 1 : 1,
        !!okToApplyPageCommand ? Number(pageParam) : 2,
        props.pagesArray.length - 1,
        props.pagesArray.length,
      ].map((item, i) => (
        <div className="flex items-center justify-between gap-2" key={i}>
          {item === props.pagesArray.length - 1 &&
            (!!okToApplyPageCommand ? Number(pageParam) : 2) !== item - 1 && (
              <div className="h-10 py-2 px-2">...</div>
            )}
          <Link href={`${routes.products}?page=${Number(item)}`} key={i}>
            <PaginationButton
              pageNumber={Number(item)}
              searchParamName="page"
            />
          </Link>
        </div>
      ))}
      {!isNaN(Number(pageParam)) &&
        Number(pageParam) + 1 <= props.pagesArray.length && (
          <Link
            href={`${routes.products}?page=${
              !isNaN(Number(pageParam)) && Number(pageParam) + 1 > 2
                ? Number(pageParam) + 1
                : 2
            }`}
          >
            <Button variant="secondary">Next</Button>
          </Link>
        )}
    </div>
  );
};
