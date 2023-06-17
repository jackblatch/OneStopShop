import { HeadingAndSubheading } from "@/components/admin/heading-and-subheading";
import { Button } from "@/components/ui/button";
import { singleLevelNestedRoutes } from "@/lib/routes";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function OrdersLayout(props: PropsWithChildren) {
  return (
    <>
      <HeadingAndSubheading
        heading="Orders"
        subheading="View and manage your orders"
      />
      <div className="flex items-center justify-start gap-4 -mt-4">
        <Link href={singleLevelNestedRoutes.account.orders}>
          <Button variant="link" className="p-0">
            All Orders
          </Button>
        </Link>
        <Link href={singleLevelNestedRoutes.account["abandoned-carts"]}>
          <Button variant="link" className="p-0">
            Abandoned Carts
          </Button>
        </Link>
      </div>
      {props.children}
    </>
  );
}
