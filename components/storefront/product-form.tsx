"use client";

import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { type addToCart } from "@/server-actions/add-to-cart";
import { toast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { routes } from "@/lib/routes";
import { cn, handleInputQuantity } from "@/lib/utils";
import Link from "next/link";

export const ProductForm = (props: {
  addToCartAction: typeof addToCart;
  availableInventory: string | null;
  productId: number;
  productName: string | null;
  disableQuantitySelector?: boolean;
  buttonSize?: "default" | "sm";
}) => {
  const [quantity, setQuantity] = useState<string | number>(1);
  let [isPending, startTransition] = useTransition();

  return (
    <div
      className={cn(
        "flex items-end justify-start gap-4",
        props.disableQuantitySelector && "w-full"
      )}
    >
      {props.availableInventory &&
        Number(props.availableInventory) > 0 &&
        !props.disableQuantitySelector && (
          <div className="flex flex-col gap-1 items-start">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              className="w-24"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              onBlur={(e) => handleInputQuantity(e, setQuantity)}
              type="number"
            />
          </div>
        )}
      {props.availableInventory && Number(props.availableInventory) > 0 ? (
        <Button
          size={props.buttonSize ?? "default"}
          className={cn(props.disableQuantitySelector ? "w-full" : "w-36")}
          onClick={() => {
            startTransition(
              () =>
                void props.addToCartAction({
                  id: props.productId,
                  qty: Number(quantity),
                })
            );
            toast({
              title: "Added to cart",
              description: `${quantity}x ${props.productName} has been added to your cart.`,
              action: (
                <Link href={routes.cart}>
                  <ToastAction altText="View cart">View</ToastAction>
                </Link>
              ),
            });
          }}
        >
          Add to Cart
        </Button>
      ) : (
        <Button
          variant="secondary"
          disabled={true}
          className={cn(props.disableQuantitySelector ? "w-full" : "w-36")}
        >
          Sold Out
        </Button>
      )}
    </div>
  );
};
