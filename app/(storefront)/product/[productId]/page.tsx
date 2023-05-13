import { ContentWrapper } from "@/components/content-wrapper";
import { ParagraphFormatter } from "@/components/paragraph-formatter";
import { ProductForm } from "@/components/storefront/product-form";
import { FeatureIcons } from "@/components/storefront/feature-icons";
import { Heading } from "@/components/ui/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { db } from "@/db/db";
import { Product, products, stores } from "@/db/schema";
import { currencyFormatter } from "@/lib/currency";
import { eq } from "drizzle-orm";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { productsQueryParams, routes } from "@/lib/routes";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

export default async function StorefrontProductDetails(props: {
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
      slug: stores.slug,
    })
    .from(stores)
    .where(eq(stores.id, Number(product.storeId)))
    .then((res) => res[0])
    .catch(() => {
      throw new Error("Store not found");
    });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center md:items-start justify-start md:grid md:grid-cols-9 gap-8">
        <div className="col-span-4 w-full">
          {product.images.length > 0 ? (
            <>
              <div className="relative h-96 w-full">
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].alt}
                  fill
                  className="object-cover h-96 w-full"
                />
              </div>
              <div className="flex items-center justify-start gap-2 mt-2 overflow-auto flex-nowrap">
                {product.images.slice(1).map((image) => (
                  <div key={image.id} className="relative h-24 w-24">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover h-24 w-24"
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-96 w-full bg-secondary flex justify-center items-center">
              <ImageOff />
            </div>
          )}
        </div>
        <div className="md:col-span-5 w-full">
          <Heading size="h2">{product.name}</Heading>
          <Text className="text-sm mt-2">
            Sold by{" "}
            <Link
              href={`${routes.products}?${productsQueryParams.seller}${store.slug}`}
            >
              <span className="text-muted-foreground hover:underline">
                {store.name}
              </span>
            </Link>
          </Text>
          <Text className="text-xl mt-4">
            {currencyFormatter(Number(product.price))}
          </Text>
          <ProductForm availableInventory={product.inventory} />
          <FeatureIcons className="mt-8" />
        </div>
      </div>
      <Tabs defaultValue="product">
        <div className="overflow-auto">
          <TabsList>
            <TabsTrigger value="product">Product Description</TabsTrigger>
            <TabsTrigger value="seller">About the Seller</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="product" className="pt-2">
          <ParagraphFormatter paragraphs={product.description} />
        </TabsContent>
        <TabsContent value="seller" className="pt-2">
          {store.description}
        </TabsContent>
      </Tabs>
    </div>
  );
}
