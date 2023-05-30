import { ContentWrapper } from "@/components/content-wrapper";
import { SlideShow } from "@/components/slideshow";
import { Heading } from "@/components/ui/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/db/db";
import { products, stores } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PropsWithChildren } from "react";
import { ProductAndStore } from "./products/page";
import { ProductCard } from "@/components/storefront/product-card";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import Link from "next/link";

export default async function Home() {
  const storeAndProduct = (await db
    .select({
      product: products,
      store: {
        id: stores.id,
        name: stores.name,
        slug: stores.slug,
      },
    })
    .from(products)
    .leftJoin(stores, eq(products.storeId, stores.id))
    .limit(4)) as ProductAndStore[];

  return (
    <div>
      <SlideShow />
      <ContentWrapper>
        <Tabs defaultValue="for-buyers">
          <div className="flex items-center justify-center mt-2 mb-8">
            <TabsList>
              <TabsTrigger value="for-buyers">For Buyers</TabsTrigger>
              <TabsTrigger value="for-sellers">For Sellers</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="for-sellers">
            <HomePageLayout
              heading={<Heading size="h1">Sell online with ease.</Heading>}
              subheading={
                <Heading size="h2">
                  Access our global marketplace and sell your <br /> products to
                  over 1 million visitors.
                </Heading>
              }
            ></HomePageLayout>
          </TabsContent>
          <TabsContent value="for-buyers">
            <HomePageLayout
              heading={<Heading size="h1">Online shopping made easy.</Heading>}
              subheading={
                <Heading size="h2">
                  Shop hundreds of products from sellers worldwide.
                </Heading>
              }
            >
              <Heading size="h3">Top Picks</Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-auto mt-2">
                {storeAndProduct.map((item) => (
                  <ProductCard
                    key={item.product.id}
                    storeAndProduct={item}
                    hideButtonActions={true}
                  />
                ))}
              </div>
              <div className="mt-12 grid place-content-center">
                <Link href={routes.products}>
                  <Button variant="default">View All Products</Button>
                </Link>
              </div>
            </HomePageLayout>
          </TabsContent>
        </Tabs>
      </ContentWrapper>
    </div>
  );
}

const HomePageLayout = (
  props: PropsWithChildren<{
    heading: React.ReactNode;
    subheading: React.ReactNode;
  }>
) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 text-center mb-12 pt-2">
        {props.heading}
        <div className="text-slate-600">{props.subheading}</div>
      </div>
      {props.children}
    </>
  );
};
