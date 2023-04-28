"use client";
import { ProductAndStore } from "@/app/(storefront)/products/page";
import { ProductSidebar } from "./product-sidebar";
import { ProductCard } from "./product-card";
import { useState } from "react";

export const CollectionBody = (props: {
  storeAndProduct: ProductAndStore[];
}) => {
  const [selectedSellers, setSelectedSellers] = useState<string[]>([]);

  console.log(selectedSellers);

  return (
    <div className="grid grid-cols-12 mt-12 gap-12">
      <div className="col-span-3">
        <ProductSidebar
          storeAndProduct={props.storeAndProduct}
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
