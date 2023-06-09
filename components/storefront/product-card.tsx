import Image from "next/image";
import { Text } from "../ui/text";
import { ImageOff } from "lucide-react";
import { routes } from "@/lib/routes";
import Link from "next/link";
import { currencyFormatter } from "@/lib/currency";
import { Button } from "../ui/button";
import { ProductAndStore } from "@/app/(storefront)/(main)/products/page";
import { ProductImage } from "../product-image";
import { ProductForm } from "./product-form";
import { addToCart } from "@/server-actions/add-to-cart";

export const ProductCard = (props: {
  storeAndProduct: ProductAndStore;
  hideButtonActions?: boolean;
}) => {
  const productPageLink = `${routes.product}/${props.storeAndProduct.product.id}`;

  return (
    <div key={props.storeAndProduct.product.id}>
      <Link href={productPageLink}>
        <ProductImage
          src={props.storeAndProduct.product.images[0]?.url}
          alt={props.storeAndProduct.product.images[0]?.alt}
          height="h-48"
          width="w-full"
        />
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
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-between mt-4 mb-8">
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
          <ProductForm
            addToCartAction={addToCart}
            disableQuantitySelector={true}
            availableInventory={props.storeAndProduct.product.inventory}
            productId={props.storeAndProduct.product.id}
            productName={props.storeAndProduct.product.name}
            buttonSize="sm"
          />
        </div>
      )}
    </div>
  );
};
