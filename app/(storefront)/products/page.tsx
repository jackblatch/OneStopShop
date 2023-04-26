import SiteDescription from "../../(content)/site-description.mdx";
import { ContentWrapper } from "@/components/content-wrapper";
import { CollectionHeaderWrapper } from "@/components/storefront/collection-header-wrapper";
import { ProductCard } from "@/components/storefront/product-card";
import { db } from "@/db/db";
import { Product } from "@/db/schema";
import { products } from "@/db/schema";

export default async function StorefrontProductsPage() {
  const productList = (await db.select().from(products)) as (Omit<
    Product,
    "images"
  > & { images: { id: string; url: string; alt: string }[] })[];

  return (
    <>
      <ContentWrapper>
        <CollectionHeaderWrapper heading="Products">
          <SiteDescription />
        </CollectionHeaderWrapper>
        <div className="grid grid-cols-12 mt-12">
          <div className="col-span-3">Sidebar</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-between col-span-9">
            {productList.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        </div>
      </ContentWrapper>
    </>
  );
}
