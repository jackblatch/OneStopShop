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

export default function ProductsPage() {
  return (
    <>
      <div className="flex items-start justify-between">
        <AccountHeading
          heading="Products"
          subheading="View and manage your products"
        />
        {/* <CreateProductModal /> */}
        {/* <CreateProductModal
          button={
            <Button>
              New Product <Plus size={18} className="ml-2" />
            </Button>
          }
        /> */}
        <Link href="/account/selling/product/new">Click</Link>
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
