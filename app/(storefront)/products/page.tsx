import { ContentWrapper } from "@/components/content-wrapper";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { db } from "@/db/db";
import { Product } from "@/db/schema";
import { products } from "@/db/schema";
import { ImageOff } from "lucide-react";
import Image from "next/image";

export default async function StorefrontProductsPage() {
  const productList = (await db.select().from(products)) as (Omit<
    Product,
    "images"
  > & { images: { id: string; url: string; alt: string }[] })[];

  return (
    <>
      <ContentWrapper>
        <Heading size="h2">Products</Heading>
        <div className="grid grid-cols-12">
          <div className="col-span-3">Sidebar</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-between col-span-9">
            {productList.map((product) => (
              <div key={product.id}>
                {product.images.length > 0 ? (
                  <div className="relative w-48 h-48">
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].alt}
                      fill
                      className="object-cover w-48 h-48"
                    />
                  </div>
                ) : (
                  <div className="w-48 h-48 bg-gray-200 flex justify-center items-center">
                    <ImageOff />
                  </div>
                )}
                <Text className="line-clamp-2 w-full">{product.name}</Text>
              </div>
            ))}
          </div>
        </div>
      </ContentWrapper>
    </>
  );
}
