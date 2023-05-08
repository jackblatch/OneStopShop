import SiteDescription from "../../(content)/site-description.mdx";
import { ContentWrapper } from "@/components/content-wrapper";
import { CollectionBody } from "@/components/storefront/collection-body";
import { CollectionHeaderWrapper } from "@/components/storefront/collection-header-wrapper";
import { CollectionPagePagination } from "@/components/storefront/collection-page-pagination";
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

const PRODUCTS_PER_PAGE = 6;

export default async function StorefrontProductsPage(context: {
  params: { slug: string };
  searchParams: { page: string; seller: string };
}) {
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
    .where(() => {
      if (
        context.searchParams.seller === undefined ||
        context.searchParams.seller === ""
      )
        return;
      return eq(stores.slug, context.searchParams.seller);
    })
    .leftJoin(stores, eq(products.storeId, stores.id))
    .limit(PRODUCTS_PER_PAGE)
    .offset(
      !isNaN(Number(context.searchParams.page))
        ? (Number(context.searchParams.page) - 1) * PRODUCTS_PER_PAGE
        : 0
    )) as ProductAndStore[];

  console.log(storeAndProduct.length);

  return (
    <ContentWrapper>
      <CollectionHeaderWrapper heading="Products">
        <SiteDescription />
      </CollectionHeaderWrapper>
      <CollectionBody
        storeAndProduct={storeAndProduct}
        activeSellers={await getActiveSellers()}
      >
        {/* @ts-expect-error Async Server Component */}
        <CollectionPagePagination
          productsPerPage={PRODUCTS_PER_PAGE}
          sellerParams={context.searchParams.seller as string}
        />
      </CollectionBody>
    </ContentWrapper>
  );
}

const getActiveSellers = async () => {
  return await db
    .select({
      id: stores.id,
      name: stores.name,
      slug: stores.slug,
    })
    .from(stores);
};
