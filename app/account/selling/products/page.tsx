import { HeadingAndSubheading } from "@/components/admin/heading-and-subheading";
import { Button } from "@/components/ui/button";
import { Plus, Store } from "lucide-react";
import Link from "next/link";
import { db } from "@/db/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs";
import { secondLevelNestedRoutes } from "@/lib/routes";
import { InfoCard } from "@/components/admin/info-card";
import { DataTable } from "./data-table";
import { type Product, columns } from "./columns";

async function getData(): Promise<Product[]> {
  const user = await currentUser();
  // ternary required here as while the layout won't render children if not authed, RSC still seems to run regardless
  return !isNaN(Number(user?.privateMetadata.storeId))
    ? ((await db
        .select({
          id: products.id,
          name: products.name,
          price: products.price,
          inventory: products.inventory,
          images: products.images,
        })
        .from(products)
        .where(eq(products.storeId, Number(user?.privateMetadata.storeId)))
        .catch((err) => {
          console.log(err);
          return [];
        })) as any[])
    : [];
}

export default async function ProductsPage() {
  const productsList = await getData();

  return (
    <>
      <div className="flex items-start justify-between">
        <HeadingAndSubheading
          heading="Products"
          subheading="View and manage your products"
        />
        <Link href={secondLevelNestedRoutes.product.new}>
          <Button>
            New Product <Plus size={18} className="ml-2" />
          </Button>
        </Link>
      </div>
      {productsList.length === 0 ? (
        <InfoCard
          heading="You don't have any products yet"
          subheading="Create your first product to get started"
          icon={<Store size={36} className="text-gray-600" />}
          button={
            <Link href={secondLevelNestedRoutes.product.new}>
              <Button size="sm">Create</Button>
            </Link>
          }
        />
      ) : (
        <>
          <div className="pt-4">
            <DataTable columns={columns} data={productsList} />
          </div>
        </>
      )}
    </>
  );
}
