import { Product } from "@/db/schema";
import Image from "next/image";
import { Text } from "../ui/text";
import { ImageOff, ShoppingCart, ViewIcon } from "lucide-react";
import { routes } from "@/lib/routes";
import Link from "next/link";
import { currencyFormatter } from "@/lib/currency";
import { Button } from "../ui/button";

export const ProductCard = (props: {
  product: Omit<Product, "images"> & {
    images: { id: string; url: string; alt: string }[];
  };
}) => {
  const productPageLink = `${routes.product}/${props.product.id}`;

  return (
    <div key={props.product.id}>
      <Link href={productPageLink}>
        {props.product.images.length > 0 ? (
          <div className="relative w-full h-48">
            <Image
              src={props.product.images[0].url}
              alt={props.product.images[0].alt}
              fill
              className="object-cover w-full h-48"
            />
          </div>
        ) : (
          <div className="w-full h-48 bg-secondary flex justify-center items-center">
            <ImageOff />
          </div>
        )}
      </Link>
      <Link href={productPageLink}>
        <Text className="line-clamp-1 w-full mt-2">{props.product.name}</Text>
        <Text>{currencyFormatter(Number(props.product.price))}</Text>
      </Link>
      <div className="flex gap-2 items-center justify-between mt-4 mb-8">
        <Link
          href={`${routes.productQuickView}/${[props.product.id]}`}
          className="w-full"
        >
          <Button variant="outline" size="sm" className="flex gap-2 w-full">
            <span>Quick View</span>
          </Button>
        </Link>
        <Button className="flex gap-2 w-full" size="sm">
          <span>Add to Cart</span>
        </Button>
      </div>
    </div>
  );
};
