import { Checkbox } from "@/components/ui/checkbox";
import { Heading } from "../ui/heading";
import { ProductAndStore } from "@/app/(storefront)/products/page";
import React from "react";
import { createSlug } from "@/lib/createSlug";

export const ProductSidebar = (props: {
  uniqueStoresList: string[];
  setSelectedSellers: React.Dispatch<React.SetStateAction<string[]>>;
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
            setSelectedSellers={props.setSelectedSellers}
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
  setSelectedSellers: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSellers: string[];
}) => {
  return (
    <div className="flex items-center space-x-2 my-2 py-1">
      <Checkbox
        id={props.id}
        checked={props.selectedSellers.includes(props.id)}
        onCheckedChange={(checked) => {
          if (checked) {
            props.setSelectedSellers((prev) => [...prev, props.id]);
          } else {
            props.setSelectedSellers((prev) =>
              prev.filter((item) => item !== props.id)
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
