import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currencyFormatter } from "@/lib/currency";
import { CheckoutItem, OrderItemDetails } from "@/lib/types";
import { ProductImage } from "@/components/product-image";
import { Button } from "@/components/ui/button";

export const OrderLineItems = (props: {
  checkoutItems: CheckoutItem[];
  products: OrderItemDetails[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.products.map((product) => {
          const currentProduct = props.checkoutItems.find(
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
                <Button
                  className="m-0 p-0 h-auto hover:no-underline hover:cursor-auto"
                  variant="link"
                >
                  {product.name}
                </Button>
              </TableCell>
              <TableCell>{currentProduct?.qty}</TableCell>
              <TableCell>
                {currencyFormatter(Number(currentProduct?.price))}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
