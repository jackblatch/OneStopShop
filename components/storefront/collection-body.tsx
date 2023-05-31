"use client";
import { ProductAndStore } from "@/app/(storefront)/(main)/products/page";
import { ProductSidebar } from "./product-sidebar";
import { ProductCard } from "./product-card";
import { PropsWithChildren } from "react";
import { useSearchParams } from "next/navigation";
import { Heading } from "../ui/heading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SlidersHorizontal } from "lucide-react";
import { EmptyStateWrapper } from "../ui/empty-state-wrapper";

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

  const Sidebar = (
    <ProductSidebar
      uniqueStoresList={props.activeSellers
        .map((item) => item.name ?? "")
        .filter((item) => item !== "")}
      selectedSellers={selectedSellers}
    />
  );

  return (
    <div className="md:grid md:grid-cols-12 md:mt-0 lg:mt-12 mt-12 md:gap-12">
      <div className="hidden p-6 rounded-md border-border border lg:block md:col-span-3">
        {Sidebar}
      </div>
      <div className="lg:hidden">
        <AlertDialog>
          <AlertDialogTrigger className="bg-white py-4 px-6 w-full fixed left-0 bottom-0 z-10 flex items-center justify-end gap-2">
            <p>Filters</p>
            <SlidersHorizontal size={18} />
          </AlertDialogTrigger>
          <AlertDialogContent className="max-h-[90vh] overflow-auto">
            {Sidebar}
            <AlertDialogFooter className="sticky bottom-0">
              <AlertDialogAction>Close</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {props.storeAndProduct.length > 0 ? (
        <div className="grid col-span-12 lg:col-span-9 grid-cols-12 gap-6 h-fit">
          {props.storeAndProduct.map(
            (product, i) =>
              (selectedSellers.includes(product.store.slug ?? "") ||
                selectedSellers.length === 0) && (
                <div
                  className="sm:col-span-6 md:col-span-4 col-span-12"
                  key={i}
                >
                  <ProductCard storeAndProduct={product} />
                </div>
              )
          )}
          <div className="col-span-12">{props.children}</div>
        </div>
      ) : (
        <EmptyStateWrapper height="h-[200px]">
          <Heading size="h4">No products match your filters</Heading>
          <p>Change your filters or try again later</p>
        </EmptyStateWrapper>
      )}
    </div>
  );
};
