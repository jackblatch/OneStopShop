import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/db/schema";
import { currencyFormatter } from "@/lib/currency";
import { routes } from "@/lib/routes";
import { CartItem, ProductImages } from "@/lib/types";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { ProductImage } from "../product-image";

export const CartLineItems = (props: {
  cartItems: CartItem[];
  products: (Omit<Product, "description" | "images"> & {
    storeName: string | null;
    images: ProductImages[];
  })[];
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
        {props.products.map((product) => (
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
            <TableCell>
              {props.cartItems.find((item) => item.id === product.id)?.qty}
            </TableCell>
            <TableCell>
              {currencyFormatter(
                Number(
                  props.cartItems.find((item) => item.id === product.id)?.qty
                ) * Number(product.price)
              )}
            </TableCell>
            <TableCell className="text-right">Edit</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
