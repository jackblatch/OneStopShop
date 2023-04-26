import SiteDescription from "../../(content)/site-description.mdx";
import { ContentWrapper } from "@/components/content-wrapper";
import { CollectionDescription } from "@/components/storefront/collection-description";
import { CollectionHeaderWrapper } from "@/components/storefront/collection-header-wrapper";
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
        <CollectionHeaderWrapper heading="Products">
          <CollectionDescription>
            <SiteDescription />
          </CollectionDescription>
        </CollectionHeaderWrapper>
        <div className="grid grid-cols-12 mt-12">
          <div className="col-span-3">Sidebar</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-between col-span-9">
            {productList.map((product) => (
              <div key={product.id}>
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
                  <div className="w-full h-48 bg-gray-200 flex justify-center items-center">
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
