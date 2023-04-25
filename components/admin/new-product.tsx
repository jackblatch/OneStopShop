"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { TextInputWithLabel } from "../text-input-with-label";
import { AccountHeading } from "./account-heading";
import { Product } from "@/db/schema";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  apiRoutes,
  secondLevelNestedRoutes,
  singleLevelNestedRoutes,
} from "@/lib/routes";
import { createProduct } from "@/lib/apiTypes";
import { toast } from "../ui/use-toast";

const defaultValues = {
  name: "",
  description: "",
  price: "",
  inventory: "",
  images: [],
};

export const NewProduct = (props: { displayType?: "page" | "modal" }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formValues, setFormValues] =
    useState<Omit<Product, "id" | "storeId">>(defaultValues);

  const dismissModal = useCallback(() => {
    if (props.displayType === "modal") {
      router.back();
    } else {
      router.push(singleLevelNestedRoutes.account.products);
    }
  }, [router]);

  const onKeyDown = useCallback(
    (e: any) => {
      if (e.key === "Escape") dismissModal();
    },
    [dismissModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const handleCreateProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch(apiRoutes.product, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productValues: {
          ...formValues,
          images: [
            {
              id: "1",
              alt: "descriptive alt tag",
              url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            },
          ],
        },
      }),
    });
    const data: createProduct["output"] = await res.json();
    setIsLoading(false);
    if (!data.error) {
      router.push(`${secondLevelNestedRoutes.product.base}/${data.productId}`);
      setFormValues(defaultValues);
    }
    toast({
      title: data.message,
      description: data.action,
    });
  };

  return (
    <>
      <AccountHeading
        heading="Create a new product"
        subheading="Enter the details of your new product below and click save."
      />
      <form onSubmit={handleCreateProduct}>
        <div className="flex flex-col gap-8 mt-2 mb-6">
          <TextInputWithLabel
            required
            id="name"
            label="Product Name"
            type="text"
            state={formValues}
            setState={setFormValues}
          />
          <TextInputWithLabel
            id="description"
            label="Description"
            type="text"
            inputType="textarea"
            state={formValues}
            setState={setFormValues}
          />
          <div className="grid grid-cols-2 gap-4">
            <TextInputWithLabel
              id="price"
              label="Price"
              type="number"
              state={formValues}
              setState={setFormValues}
            />
            <TextInputWithLabel
              id="inventory"
              label="Quantity In Stock"
              type="number"
              state={formValues}
              setState={setFormValues}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" onClick={dismissModal}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
