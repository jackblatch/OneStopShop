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
import Link from "next/link";
import { SheetWrapper } from "./storefront/sheet-wrapper";

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
          {numberOfCartItems && numberOfCartItems > 0 && (
            <span className="bg-primary rounded-full w-6 h-6 text-white flex items-center justify-center text-sm absolute -top-2 -right-3">
              {numberOfCartItems}
            </span>
          )}
        </SheetTrigger>
      }
      buttonRoute={routes.cart}
      insideButton={
        <Link href={routes.cart}>
          <Button className="w-full">View full cart</Button>
        </Link>
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
              cartItems={cartItems}
              products={
                cartItemDetails?.filter((item) => item.storeId === storeId) ??
                []
              }
            />
          </div>
        ))}
      </div>
    </SheetWrapper>
  );
};
