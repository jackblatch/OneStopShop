import { ContentWrapper } from "@/components/content-wrapper";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { db } from "@/db/db";
import { Product, products } from "@/db/schema";
import { currencyFormatter } from "@/lib/currency";
import { eq } from "drizzle-orm";
import { ImageOff } from "lucide-react";
import Image from "next/image";

export default async function StorefrontProductPage(props: {
  params: { productId: string };
}) {
  const product = (await db
    .select()
    .from(products)
    .where(eq(products.id, Number(props.params.productId)))
    .then((res) => {
      if (res.length === 0) throw new Error("Product not found");
      return res[0];
    })
    .catch(() => {
      throw new Error("Product not found");
    })) as Omit<Product, "images"> & {
    images: { id: string; url: string; alt: string }[];
  };

  console.log(product.description?.split("\n"));

  return (
    <ContentWrapper>
      <div className="flex flex-col items-center md:items-start justify-start md:grid md:grid-cols-9 gap-8">
        <div className="col-span-4">
          {product.images.length > 0 ? (
            <div className="relative w-full h-48">
              <Image
                src={product.images[0].url}
                alt={product.images[0].alt}
                fill
                className="object-cover w-full h-48"
              />
            </div>
          ) : (
            <div className="w-full h-48 bg-secondary flex justify-center items-center">
              <ImageOff />
            </div>
          )}
        </div>
        <div className="col-span-5">
          <Heading size="h2">{product.name}</Heading>
          <Text className="text-xl">
            {currencyFormatter(Number(product.price))}
          </Text>
          <div className="flex flex-col gap-2">
            {product.description?.split("\n").map((item, i) => (
              <Text key={i}>{item}</Text>
            ))}
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}
