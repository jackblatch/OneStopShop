"use client";

import { InfoCard } from "@/components/admin/info-card";
import { Button } from "@/components/ui/button";
import { singleLevelNestedRoutes } from "@/lib/routes";
import { Box } from "lucide-react";
import Link from "next/link";

export default function Error() {
  return (
    <InfoCard
      heading="Sorry, an error occured loading this order."
      subheading="This order either does not exist or cannot be retrieved at this time."
      icon={<Box size={32} />}
      button={
        <Link href={singleLevelNestedRoutes.account.orders}>
          <Button>View all orders</Button>
        </Link>
      }
    />
  );
}
