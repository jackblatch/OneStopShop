import { ShoppingCart } from "lucide-react";
import { cookies } from "next/headers";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getCart } from "@/server-actions/get-cart-details";
import { CartLineItems } from "./storefront/cart-line-items";
import { Heading } from "./ui/heading";
import { Button } from "./ui/button";
import { routes } from "@/lib/routes";
import { SheetWrapper } from "./storefront/sheet-wrapper";
import { EmptyStateWrapper } from "./ui/empty-state-wrapper";

export const ShoppingCartHeader = async () => {
  const cartId = cookies().get("cartId")?.value;
  const { cartItems, uniqueStoreIds, cartItemDetails } = await getCart(
    Number(cartId)
  );

  const numberOfCartItems =
    !!cartItems &&
    cartItems.reduce((acc, item) => (acc += Number(item.qty)), 0);

  return (
    <SheetWrapper
      trigger={
        <SheetTrigger className="flex items-center justify-center relative -left-2">
          <ShoppingCart size={26} />
          {numberOfCartItems && numberOfCartItems > 0 ? (
            <span className="bg-primary rounded-full w-6 h-6 text-white flex items-center justify-center text-sm absolute -top-2 -right-3">
              {numberOfCartItems}
            </span>
          ) : null}
        </SheetTrigger>
      }
      buttonRoute={
        numberOfCartItems && numberOfCartItems > 0
          ? routes.cart
          : routes.products
      }
      insideButton={
        <Button className="w-full">
          {numberOfCartItems && numberOfCartItems > 0
            ? "View full cart"
            : "Start shopping"}
        </Button>
      }
    >
      <SheetHeader>
        <SheetTitle>
          Cart{" "}
          {numberOfCartItems && numberOfCartItems > 0
            ? `(${numberOfCartItems})`
            : ""}
        </SheetTitle>
        <SheetDescription className="border border-border bg-secondary p-2 rounded-md flex items-center justify-center text-center py-3">
          Free shipping on all orders over $50
        </SheetDescription>
      </SheetHeader>
      {numberOfCartItems && numberOfCartItems > 0 ? (
        <div className="flex flex-col gap-6 mt-6">
          {uniqueStoreIds.map((storeId, i) => (
            <div key={i}>
              <Heading size="h4">
                {
                  cartItemDetails?.find((item) => item.storeId === storeId)
                    ?.storeName
                }
              </Heading>
              <CartLineItems
                variant="cart"
                cartItems={cartItems}
                products={
                  cartItemDetails?.filter((item) => item.storeId === storeId) ??
                  []
                }
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyStateWrapper height="h-[150px]">
          <Heading size="h4">Your cart is empty</Heading>
        </EmptyStateWrapper>
      )}
    </SheetWrapper>
  );
};
