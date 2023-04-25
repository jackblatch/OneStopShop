"use client";

import { NewProduct } from "@/components/admin/new-product";
import { AlertDialogContent } from "@/components/ui/alert-dialog";
import { AlertDialog } from "@radix-ui/react-alert-dialog";

export default function NewProductModal() {
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <NewProduct displayType="modal" />
      </AlertDialogContent>
    </AlertDialog>
  );
}
