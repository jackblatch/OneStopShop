import SiteDescription from "../../(content)/site-description.mdx";
import { ContentWrapper } from "@/components/content-wrapper";
import { CollectionHeaderWrapper } from "@/components/storefront/collection-header-wrapper";
import { ProductCard } from "@/components/storefront/product-card";
import { ProductSidebar } from "@/components/storefront/product-sidebar";
import { db } from "@/db/db";
import { Product, Store, stores } from "@/db/schema";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export type ProductAndStore = {
  product: Omit<Product, "images"> & {
    images: { id: string; url: string; alt: string }[];
  };
  store: Omit<Store, "description" | "industry">;
};

export default async function StorefrontProductsPage() {
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
    .leftJoin(stores, eq(products.storeId, stores.id))) as ProductAndStore[];

  return (
    <ContentWrapper>
      <CollectionHeaderWrapper heading="Products">
        <SiteDescription />
      </CollectionHeaderWrapper>
      <div className="grid grid-cols-12 mt-12 gap-12">
        <div className="col-span-3">
          <ProductSidebar storeAndProduct={storeAndProduct} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-between col-span-9">
          {storeAndProduct.map((product, i) => (
            <ProductCard storeAndProduct={product} key={i} />
          ))}
        </div>
      </div>
    </ContentWrapper>
  );
}
