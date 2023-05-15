import { routes } from "@/lib/routes";
import { ShoppingCart } from "lucide-react";

export const ShoppingCartHeader = () => {
  return (
    <a href={routes.cart}>
      <ShoppingCart size={26} />
    </a>
  );
};
