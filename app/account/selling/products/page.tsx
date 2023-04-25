import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AccountHeading } from "@/components/admin/account-heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { db } from "@/db/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/app-beta";
import Image from "next/image";

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
      <div className="grid grid-cols-3 gap-6">
        {productsList.map((product) => {
          return (
            <div key={product.id}>
              <h1>{product.name}</h1>
            </div>
          );
        })}
      </div>
    </>
  );
}

const CreateProductModal = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          New Product <Plus size={18} className="ml-2" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
