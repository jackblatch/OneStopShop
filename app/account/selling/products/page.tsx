import { HeadingAndSubheading } from "@/components/admin/heading-and-subheading";
import { Button } from "@/components/ui/button";
import { Plus, Store } from "lucide-react";
import Link from "next/link";
import { db } from "@/db/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/app-beta";
import Table from "@/components/admin/table";
import { secondLevelNestedRoutes } from "@/lib/routes";
import { currencyFormatter } from "@/lib/currency";
import { InfoCard } from "@/components/admin/info-card";

export default async function ProductsPage() {
  const user = await currentUser();

  // ternary required here as while the layout won't render children if not authed, RSC still seems to run regardless
  const productsList = !isNaN(Number(user?.privateMetadata.storeId))
    ? ((await db
        .select()
        .from(products)
        .where(eq(products.storeId, Number(user?.privateMetadata.storeId)))
        .catch((err) => {
          console.log(err);
          return [];
        })) as any[])
    : [];

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
        <Table columnNames={["Name", "Price", "Inventory", "Images"]}>
          {productsList.map((product) => (
            <tr key={product.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-primary sm:pl-6">
                {product.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                {currencyFormatter(product.price)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                {product.inventory}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                {product.images.length}
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <a
                  href={`${secondLevelNestedRoutes.product.base}/${product.id}`}
                  className="text-primary hover:text-muted-foreground"
                >
                  Edit<span className="sr-only">, {product.name}</span>
                </a>
              </td>
            </tr>
          ))}
        </Table>
      )}
    </>
  );
}
