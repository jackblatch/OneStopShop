import { AccountHeading } from "@/components/admin/account-heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { db } from "@/db/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/app-beta";
import Table from "@/components/admin/table";
import { secondLevelNestedRoutes } from "@/lib/routes";

export default async function ProductsPage() {
  const user = await currentUser();

  const productsList = (await db
    .select()
    .from(products)
    .where(eq(products.storeId, Number(user?.privateMetadata.storeId)))
    .catch((err) => {
      console.log(err);
      return [];
    })) as any[];

  console.log(productsList);

  return (
    <>
      <div className="flex items-start justify-between">
        <AccountHeading
          heading="Products"
          subheading="View and manage your products"
        />
        <Link href="/account/selling/product/new">
          <Button>
            New Product <Plus size={18} className="ml-2" />
          </Button>
        </Link>
      </div>
      <Table columnNames={["Name", "Price", "Inventory", "Images"]}>
        {productsList.map((product) => (
          <tr key={product.id}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-primary sm:pl-6">
              {product.name}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.price)}
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
    </>
  );
}
