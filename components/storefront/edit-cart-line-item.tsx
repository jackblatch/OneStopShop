"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { CartLineItemDetails } from "@/lib/types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const EditCartLineItem = (props: { product: CartLineItemDetails }) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Edit</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit {props.product.name}</AlertDialogTitle>
            <AlertDialogDescription>
              Change the quantity or remove this item from your cart.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div>
            <Label className="my-2 block">Quantity</Label>
            <Input type="number" />
            <Button variant="link" className="m-0 p-0 text-muted-foreground">
              Remove from cart
            </Button>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Save</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
