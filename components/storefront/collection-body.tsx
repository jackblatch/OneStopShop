"use client";
import { ProductAndStore } from "@/app/(storefront)/products/page";
import { ProductSidebar } from "./product-sidebar";
import { ProductCard } from "./product-card";
import { PropsWithChildren } from "react";
import { useSearchParams } from "next/navigation";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-between col-span-9">
        {props.storeAndProduct.map(
          (product, i) =>
            (selectedSellers.includes(product.store.slug ?? "") ||
              selectedSellers.length === 0) && (
              <ProductCard storeAndProduct={product} key={i} />
            )
        )}
        <div className="col-span-3">{props.children}</div>
      </div>
    </div>
  );
};
