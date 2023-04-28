import { Checkbox } from "@/components/ui/checkbox";
import { Heading } from "../ui/heading";
import { ProductAndStore } from "@/app/(storefront)/products/page";

export const ProductSidebar = (props: {
  storeAndProduct: ProductAndStore[];
}) => {
  return (
    <div>
      <Heading size="h3">Filters</Heading>
      <ProductSidebar.Group heading="Sellers" />
    </div>
  );
};

const FilterGroup = (props: { heading: string }) => {
  return (
    <div className="mt-4">
      <Heading size="h4">{props.heading}</Heading>
      <ProductSidebar.Checkbox />
    </div>
  );
};

const FilterCheckbox = () => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  );
};

ProductSidebar.Group = FilterGroup;
ProductSidebar.Checkbox = FilterCheckbox;
