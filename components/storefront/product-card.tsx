import { Product } from "@/db/schema";
import Image from "next/image";
import { Text } from "../ui/text";
import { ImageOff } from "lucide-react";
import { routes } from "@/lib/routes";
import Link from "next/link";
import { currencyFormatter } from "@/lib/currency";

export const ProductCard = (props: {
  product: Omit<Product, "images"> & {
    images: { id: string; url: string; alt: string }[];
  };
}) => {
  const productPageLink = `${routes.product}/${props.product.id}`;

  return (
    <>
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
            <div className="w-full h-48 bg-gray-200 flex justify-center items-center">
              <ImageOff />
            </div>
          )}
        </Link>
        <Link href={productPageLink}>
          <Text className="line-clamp-1 w-full mt-2">{props.product.name}</Text>
          <Text>{currencyFormatter(Number(props.product.price))}</Text>
        </Link>
      </div>
    </>
  );
};
