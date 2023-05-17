import { db } from "@/db/db";
import { Cart, carts } from "@/db/schema";
import { routes } from "@/lib/routes";
import { CartItem } from "@/lib/types";
import { eq } from "drizzle-orm";
import { ShoppingCart } from "lucide-react";
import { cookies } from "next/headers";

export const ShoppingCartHeader = async () => {
  const cartId = cookies().get("cartId")?.value;
  let cartItems;
  if (cartId) {
    const databaseValues = await db
      .select()
      .from(carts)
      .where(eq(carts.id, Number(cartId)));
    cartItems = JSON.parse(databaseValues[0].items as string) as CartItem[];
  }
  const numberOfCartItems =
    !!cartItems &&
    cartItems.reduce((acc, item) => (acc += Number(item.qty)), 0);
  return (
    <a
      href={routes.cart}
      className="flex items-center justify-center relative -left-2"
    >
      <ShoppingCart size={26} />
      {numberOfCartItems && numberOfCartItems > 0 && (
        <span className="bg-primary rounded-full w-6 h-6 text-white flex items-center justify-center text-sm absolute -top-2 -right-3">
          {numberOfCartItems}
        </span>
      )}
    </a>
  );
};
