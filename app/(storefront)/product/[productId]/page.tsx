import { ContentWrapper } from "@/components/content-wrapper";
import { ParagraphFormatter } from "@/components/paragraph-formatter";
import { ProductForm } from "@/components/storefront/product-form";
import { WhyShopGrid } from "@/components/storefront/why-shop-grid";
import { Heading } from "@/components/ui/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { db } from "@/db/db";
import { Product, products, stores } from "@/db/schema";
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

  const store = await db
    .select({
      name: stores.name,
      description: stores.description,
    })
    .from(stores)
    .where(eq(stores.id, Number(product.storeId)))
    .then((res) => res[0])
    .catch(() => {
      throw new Error("Store not found");
    });

  return (
    <ContentWrapper>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center md:items-start justify-start md:grid md:grid-cols-9 gap-8">
          <div className="col-span-4 w-full">
            {product.images.length > 0 ? (
              <div className="relative h-96 w-full">
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].alt}
                  fill
                  className="object-cover h-96 w-full"
                />
              </div>
            ) : (
              <div className="h-96 w-full bg-secondary flex justify-center items-center">
                <ImageOff />
              </div>
            )}
          </div>
          <div className="col-span-5">
            <Heading size="h2">{product.name}</Heading>
            <Text className="text-sm mt-2">
              Sold by{" "}
              <span className="text-muted-foreground">{store.name}</span>
            </Text>
            <Text className="text-xl mt-4">
              {currencyFormatter(Number(product.price))}
            </Text>
            <ProductForm availableInventory={product.inventory} />
            <WhyShopGrid className="mt-8" />
          </div>
        </div>
        <Tabs defaultValue="product">
          <TabsList>
            <TabsTrigger value="product">Product Description</TabsTrigger>
            <TabsTrigger value="seller">About the Seller</TabsTrigger>
          </TabsList>
          <TabsContent value="product" className="pt-2">
            <ParagraphFormatter paragraphs={product.description} />
          </TabsContent>
          <TabsContent value="seller" className="pt-2">
            {store.description}
          </TabsContent>
        </Tabs>
      </div>
    </ContentWrapper>
  );
}
