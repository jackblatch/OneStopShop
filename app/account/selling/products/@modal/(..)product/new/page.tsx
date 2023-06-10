"use client";

import { ProductEditor } from "@/components/admin/product-editor";
import { AlertDialogContent } from "@/components/ui/alert-dialog";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/server-actions/products";
import { AlertDialog } from "@radix-ui/react-alert-dialog";

export default function NewProductModal() {
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <ProductEditor
          displayType="modal"
          productStatus="new-product"
          productActions={{
            createProduct,
            updateProduct,
            deleteProduct,
          }}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}
