import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currencyFormatter } from "@/lib/currency";
import { routes } from "@/lib/routes";
import { CartItem, CartLineItemDetails, ProductImages } from "@/lib/types";
import Link from "next/link";
import { Button } from "../ui/button";
import { ProductImage } from "../product-image";
import { EditCartLineItem } from "./edit-cart-line-item";

export const CartLineItems = (props: {
  cartItems: CartItem[];
  products: CartLineItemDetails[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.products.map((product) => {
          const currentProductInCart = props.cartItems.find(
            (item) => item.id === product.id
          );
          return (
            <TableRow key={product.id}>
              <TableCell className="font-medium">
                <ProductImage
                  src={product.images[0]?.url}
                  alt={product.images[0]?.alt}
                  sizes="50px"
                  height="h-[50px]"
                  width="w-[50px]"
                />
              </TableCell>
              <TableCell className="max-w-[200px] w-[200px] truncate">
                <Link href={`${routes.product}/${product.id}`}>
                  <Button className="m-0 p-0 h-auto" variant="link">
                    {product.name}
                  </Button>
                </Link>
              </TableCell>
              <TableCell>{currencyFormatter(Number(product.price))}</TableCell>
              <TableCell>{currentProductInCart?.qty}</TableCell>
              <TableCell>
                {currencyFormatter(
                  Number(currentProductInCart?.qty) * Number(product.price)
                )}
              </TableCell>
              <TableCell className="text-right">
                <EditCartLineItem
                  productInCart={currentProductInCart}
                  product={product}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
