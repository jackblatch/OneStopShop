"use client";
import { ProductAndStore } from "@/app/(storefront)/products/page";
import { ProductSidebar } from "./product-sidebar";
import { ProductCard } from "./product-card";
import { PropsWithChildren } from "react";
import { useSearchParams } from "next/navigation";
import { Heading } from "../ui/heading";

export const CollectionBody = (
  props: PropsWithChildren<{
    storeAndProduct: ProductAndStore[];
    activeSellers: {
      id: number;
      name: string | null;
      slug: string | null;
    }[];
  }>
) => {
  const searchParams = useSearchParams();
  const seller = searchParams.get("seller");
  const selectedSellers = seller ? [...seller?.split("_")] : [];

  return (
    <div className="md:grid md:grid-cols-12 mt-12 md:gap-12">
      <div className="hidden md:block sm:col-span-3">
        <ProductSidebar
          uniqueStoresList={props.activeSellers
            .map((item) => item.name ?? "")
            .filter((item) => item !== "")}
          selectedSellers={selectedSellers}
        />
      </div>
      {props.storeAndProduct.length > 0 ? (
        <div className="grid col-span-9 grid-cols-12 gap-6">
          {props.storeAndProduct.map(
            (product, i) =>
              (selectedSellers.includes(product.store.slug ?? "") ||
                selectedSellers.length === 0) && (
                <div
                  className="sm:col-span-6 md:col-span-6 lg:col-span-4 col-span-12"
                  key={i}
                >
                  <ProductCard storeAndProduct={product} />
                </div>
              )
          )}
          <div className="col-span-12">{props.children}</div>
        </div>
      ) : (
        <div className="col-span-9 mt-4 gap-2 rounded-md border-2 border-dashed border-gray-200 p-6 text-center h-[200px] flex items-center justify-center flex-col">
          <Heading size="h4">No products match your filters</Heading>
          <p>Change your filters or try again later</p>
        </div>
      )}
    </div>
  );
};
