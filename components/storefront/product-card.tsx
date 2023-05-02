import Image from "next/image";
import { Text } from "../ui/text";
import { ImageOff } from "lucide-react";
import { routes } from "@/lib/routes";
import Link from "next/link";
import { currencyFormatter } from "@/lib/currency";
import { Button } from "../ui/button";
import { ProductAndStore } from "@/app/(storefront)/products/page";

export const ProductCard = (props: {
  storeAndProduct: ProductAndStore;
  hideButtonActions?: boolean;
}) => {
  const productPageLink = `${routes.product}/${props.storeAndProduct.product.id}`;

  return (
    <div key={props.storeAndProduct.product.id}>
      <Link href={productPageLink}>
        {props.storeAndProduct.product.images.length > 0 ? (
          <div className="relative w-full h-48">
            <Image
              src={props.storeAndProduct.product.images[0].url}
              alt={props.storeAndProduct.product.images[0].alt}
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
        <Text className="line-clamp-1 w-full mt-2">
          {props.storeAndProduct.product.name}
        </Text>
        <Text>
          {currencyFormatter(Number(props.storeAndProduct.product.price))}
        </Text>
      </Link>
      {!props.hideButtonActions && (
        <div className="flex gap-2 items-center justify-between mt-4 mb-8">
          <Link
            href={`${routes.productQuickView}/${[
              props.storeAndProduct.product.id,
            ]}`}
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
      )}
    </div>
  );
};
