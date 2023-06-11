"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { TextInputWithLabel } from "../text-input-with-label";
import { Product } from "@/db/schema";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { secondLevelNestedRoutes, singleLevelNestedRoutes } from "@/lib/routes";
import { toast } from "../ui/use-toast";
import { HeadingAndSubheading } from "./heading-and-subheading";
import { ProductImages } from "@/lib/types";
import { ProductImageUploader } from "./product-image-uploader";
import type { deleteProduct, updateProduct } from "@/server-actions/products";
import { Loader2 } from "lucide-react";

const defaultValues = {
  name: "",
  description: "",
  price: "",
  inventory: "",
  images: [],
};

export const ProductEditorElements = (props: {
  displayType?: "page" | "modal";
  productStatus: "new-product" | "existing-product";
  productActions: {
    updateProduct: typeof updateProduct;
    deleteProduct: typeof deleteProduct;
  };
  initialValues?: Product;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imagesToDelete, setImagesToDelete] = useState([] as ProductImages[]);
  const [newImages, setNewImages] = useState([] as ProductImages[]);

  const [formValues, setFormValues] = useState<Omit<Product, "id" | "storeId">>(
    props.initialValues ?? defaultValues
  );

  const dismissModal = useCallback(() => {
    if (props.displayType === "modal") {
      router.back();
    } else {
      router.push(singleLevelNestedRoutes.account.products);
    }
  }, [router, props.displayType]);

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

  const handleProductUpdate = async (
    e:
      | FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    buttonAction?: "delete"
  ) => {
    e.preventDefault();
    setIsLoading(true);

    let data;
    if (buttonAction === "delete") {
      // delete product
      data = await props.productActions.deleteProduct(props.initialValues?.id);
      if (!data.error) {
        router.refresh();
        router.push(singleLevelNestedRoutes.account.products);
      }
    } else if (props.initialValues) {
      // update product
      const updatedValues = {
        ...formValues,
        images: [
          ...(props.initialValues?.images as []),
          ...(newImages ?? []),
        ].filter((item) => imagesToDelete && !imagesToDelete.includes(item)),
      } as Omit<Product, "storeId">;
      data = await props.productActions.updateProduct(updatedValues);
      if (!data.error) {
        router.refresh();
        router.push(singleLevelNestedRoutes.account.products);
      }
    } else {
      // create new product
      const res = await fetch("/api/product", {
        method: "POST",
        body: JSON.stringify(formValues),
      });
      data = (await res.json()) as unknown as {
        error: boolean;
        message: string;
        action: string;
        productId?: string;
      };
      console.log(data);
      if (data.productId) {
        router.push(
          `${secondLevelNestedRoutes.product.base}/${data.productId}`
        );
      }
      setFormValues(defaultValues);
    }
    setIsLoading(false);
    toast({
      title: data.message,
      description: data.action,
    });
  };

  return (
    <>
      <HeadingAndSubheading
        heading={
          props.productStatus === "new-product"
            ? "Create a new product"
            : "Edit product"
        }
        subheading={
          props.productStatus === "new-product"
            ? "Enter the details of your new product below and click save."
            : "Edit the details of your product below and click save."
        }
      />

      <form onSubmit={handleProductUpdate}>
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
            rows={8}
            state={formValues}
            setState={setFormValues}
          />
          {props.productStatus === "existing-product" && (
            <ProductImageUploader
              product={
                props.initialValues as Omit<Product, "images"> & {
                  images: ProductImages[];
                }
              }
              newImages={newImages}
              setNewImages={setNewImages}
              imagesToDelete={imagesToDelete}
              setImagesToDelete={setImagesToDelete}
            />
          )}
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
        <div className="flex justify-between items-center">
          {!!props.initialValues && (
            <Button
              type="button"
              variant="destructiveOutline"
              onClick={(e) => handleProductUpdate(e, "delete")}
            >
              Delete
            </Button>
          )}
          <div className="flex items-center gap-2 ml-auto">
            <Button type="button" variant="outline" onClick={dismissModal}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex gap-2 items-center justify-center"
            >
              {!!isLoading && <Loader2 size={18} className="animate-spin" />}
              {props.initialValues ? "Save" : "Create"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
