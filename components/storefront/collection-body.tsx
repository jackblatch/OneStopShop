"use client";
import { ProductAndStore } from "@/app/(storefront)/products/page";
import { ProductSidebar } from "./product-sidebar";
import { ProductCard } from "./product-card";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export const CollectionBody = (props: {
  storeAndProduct: ProductAndStore[];
}) => {
  const searchParams = useSearchParams();
  const seller = searchParams.get("seller");
  const [selectedSellers, setSelectedSellers] = useState<string[]>(
    seller ? [...seller?.split("_")] : []
  );

  const uniqueStoresList = useMemo(() => {
    return Array.from(
      new Set(props.storeAndProduct.map((product) => product.store.name))
    ).filter(Boolean) as string[];
  }, [props.storeAndProduct]);

  return (
    <div className="grid grid-cols-12 mt-12 gap-12">
      <div className="col-span-3">
        <ProductSidebar
          uniqueStoresList={uniqueStoresList}
          setSelectedSellers={setSelectedSellers}
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
      </div>
    </div>
  );
};
