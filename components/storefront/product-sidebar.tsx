"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Heading } from "../ui/heading";
import React from "react";
import { createSlug } from "@/lib/createSlug";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const ProductSidebar = (props: {
  uniqueStoresList: string[];
  selectedSellers: string[];
}) => {
  return (
    <div>
      <Heading size="h3">Filters</Heading>
      <div className="mt-4">
        <Heading size="h4">Sellers</Heading>
        {props.uniqueStoresList.map((store, i) => (
          <ProductSidebar.Checkbox
            key={i}
            label={store}
            id={createSlug(store)}
            selectedSellers={props.selectedSellers}
          />
        ))}
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
              `${pathname}?page=${page}&seller=${
                seller ? `${seller}_${props.id}` : props.id
              }`
            );
          } else {
            const filteredSellers = seller
              ?.split("_")
              .filter((seller) => seller !== props.id);
            router.push(
              `${pathname}?page=${page}${
                filteredSellers?.length
                  ? `&seller=${filteredSellers.join("_")}`
                  : ""
              }`
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
