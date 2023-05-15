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
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { CartItem, CartLineItemDetails } from "@/lib/types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { updateCart } from "@/server-actions/update-cart";
import { useState } from "react";
import { handleInputQuantity } from "@/lib/utils";
import { toast } from "../ui/use-toast";

export const EditCartLineItem = (props: {
  productInCart: CartItem | undefined;
  product: CartLineItemDetails;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState<string | number>(
    props.productInCart?.qty ?? 1
  );

  return (
    <>
      <AlertDialog open={isOpen}>
        <Button onClick={() => setIsOpen((prev) => !prev)} variant="outline">
          Edit
        </Button>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit {props.product.name}</AlertDialogTitle>
            <AlertDialogDescription>
              Change the quantity or remove this item from your cart.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="mb-6">
            <Label className="my-2 block">Quantity</Label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              onBlur={(e) => handleInputQuantity(e, setQuantity, 0)}
            />
          </div>
          <AlertDialogFooter className="flex items-center justify-between">
            <Button
              variant="destructiveOutline"
              className="mr-auto"
              onClick={() => {
                setIsOpen((prev) => !prev);
                if (props.productInCart) {
                  void updateCart({
                    ...props.productInCart,
                    qty: 0,
                  });
                  toast({
                    title: "Cart updated",
                    description: `${props.product.name} has been removed from your cart.`,
                  });
                }
              }}
            >
              Remove from cart
            </Button>
            <AlertDialogCancel onClick={() => setIsOpen((prev) => !prev)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={!props.productInCart}
              onClick={() => {
                setIsOpen((prev) => !prev);
                if (props.productInCart) {
                  void updateCart({
                    ...props.productInCart,
                    qty: Number(quantity),
                  });
                  toast({
                    title: "Cart updated",
                    description: `${props.product.name} has been updated in your cart.`,
                  });
                }
              }}
            >
              Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
