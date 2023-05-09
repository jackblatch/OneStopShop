"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Heading } from "../ui/heading";
import React, { useState } from "react";
import { createSlug } from "@/lib/createSlug";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { anchorTags } from "@/lib/routes";

export const ProductSidebar = (props: {
  uniqueStoresList: string[];
  selectedSellers: string[];
}) => {
  const [isSellerListExpanded, setIsSellerListExpanded] = useState(false);
  const searchParams = useSearchParams();
  const seller = searchParams.get("seller");
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between gap-2 w-full">
        <Heading size="h3">Filters</Heading>
        {seller && (
          <Button
            size="sm"
            variant="link"
            className="text-muted-foreground"
            onClick={() => {
              router.push(`${pathname}`);
            }}
          >
            Clear filters
          </Button>
        )}
      </div>
      <div className="mt-4">
        <Heading size="h4">Sellers</Heading>
        {props.uniqueStoresList.slice(0, 5).map((store, i) => (
          <ProductSidebar.Checkbox
            key={i}
            label={store}
            id={createSlug(store)}
            selectedSellers={props.selectedSellers}
          />
        ))}
        {isSellerListExpanded &&
          props.uniqueStoresList
            .slice(5)
            .map((store, i) => (
              <ProductSidebar.Checkbox
                key={i}
                label={store}
                id={createSlug(store)}
                selectedSellers={props.selectedSellers}
              />
            ))}
        <Button
          variant="secondary"
          size="sm"
          className="w-full mt-2"
          onClick={() => setIsSellerListExpanded((prev) => !prev)}
        >
          {isSellerListExpanded ? (
            <div className="flex items-center justify-center gap-2">
              Collapse sellers <ChevronUp size={18} className="mt-[2px]" />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              Show more sellers <ChevronDown size={18} className="mt-[2px]" />
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

const FilterGroup = (props: { heading: string }) => {
  return (
    <div className="mt-4">
      <Heading size="h4">{props.heading}</Heading>
    </div>
  );
};

const FilterCheckbox = (props: {
  label: string;
  id: string;
  selectedSellers: string[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const seller = searchParams.get("seller");
  const pathname = usePathname();

  return (
    <div className="flex items-center space-x-2 my-2 py-1">
      <Checkbox
        id={props.id}
        checked={props.selectedSellers.includes(props.id)}
        onCheckedChange={(checked) => {
          if (checked) {
            router.push(
              `${pathname}?page=1&seller=${
                seller ? `${seller}_${props.id}` : props.id
              }#${anchorTags.collectionHeader}`
            );
          } else {
            const filteredSellers = seller
              ?.split("_")
              .filter((seller) => seller !== props.id);
            router.push(
              `${pathname}?page=1${
                filteredSellers?.length
                  ? `&seller=${filteredSellers.join("_")}`
                  : ""
              }#${anchorTags.collectionHeader}`
            );
          }
        }}
      />
      <label
        htmlFor={props.id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {props.label}
      </label>
    </div>
  );
};

ProductSidebar.Group = FilterGroup;
ProductSidebar.Checkbox = FilterCheckbox;
