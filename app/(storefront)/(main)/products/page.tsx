import { CollectionBody } from "@/components/storefront/collection-body";
import { CollectionHeaderWrapper } from "@/components/storefront/collection-header-wrapper";
import { CollectionPagePagination } from "@/components/storefront/collection-page-pagination";
import { db } from "@/db/db";
import { Product, Store, stores } from "@/db/schema";
import { products } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

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
      return inArray(stores.slug, context.searchParams.seller.split("_"));
    })
    .leftJoin(stores, eq(products.storeId, stores.id))
    .limit(PRODUCTS_PER_PAGE)
    .offset(
      !isNaN(Number(context.searchParams.page))
        ? (Number(context.searchParams.page) - 1) * PRODUCTS_PER_PAGE
        : 0
    )) as ProductAndStore[];

  return (
    <div>
      <CollectionHeaderWrapper heading="Products">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis at
          tellus at urna. Sit amet porttitor eget dolor morbi non. Feugiat nibh
          sed pulvinar proin gravida hendrerit. Fermentum odio eu feugiat
          pretium nibh. Commodo ullamcorper a lacus vestibulum sed arcu non odio
          euismod. Auctor augue mauris augue neque gravida in fermentum.
        </p>
        <p>
          Consectetur libero id faucibus nisl tincidunt eget nullam non. Fames
          ac turpis egestas sed tempus urna et. Massa sed elementum tempus
          egestas sed sed risus pretium quam. Erat pellentesque adipiscing
          commodo elit at imperdiet. Blandit turpis cursus in hac habitasse
          platea dictumst. Rhoncus aenean vel elit scelerisque mauris
          pellentesque pulvinar pellentesque habitant.
        </p>
        <p>
          In mollis nunc sed id semper risus in hendrerit gravida. Imperdiet dui
          accumsan sit amet nulla facilisi morbi tempus. Quis vel eros donec ac
          odio tempor. Elementum pulvinar etiam non quam lacus suspendisse
          faucibus interdum.
        </p>
        <p>
          Urna cursus eget nunc scelerisque viverra mauris in. Eget nullam non
          nisi est sit amet facilisis magna etiam. Elit sed vulputate mi sit
          amet mauris commodo. Ut sem nulla pharetra diam sit amet nisl
          suscipit. Turpis tincidunt id aliquet risus feugiat. Maecenas pharetra
          convallis posuere morbi. Leo vel orci porta non pulvinar. Sodales
          neque sodales ut etiam sit. Lacinia quis vel eros donec. Massa sapien
          faucibus et molestie ac feugiat sed.
        </p>
      </CollectionHeaderWrapper>
      <CollectionBody
        storeAndProduct={storeAndProduct}
        activeSellers={await getActiveSellers()}
      >
        <CollectionPagePagination
          productsPerPage={PRODUCTS_PER_PAGE}
          sellerParams={context.searchParams.seller as string}
        />
      </CollectionBody>
    </div>
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
