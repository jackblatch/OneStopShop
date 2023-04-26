"use client";

import { AccountHeading } from "@/components/admin/account-heading";
import { Button } from "@/components/ui/button";
import { singleLevelNestedRoutes } from "@/lib/routes";
import Link from "next/link";

export default function Error(props: { error: Error; reset: () => void }) {
  return (
    <div>
      <AccountHeading
        heading="Something went wrong!"
        subheading="Sorry, something went wrong visiting this product."
      />
      <div className="flex gap-2 items-center mt-4">
        <Button onClick={() => props.reset()}>Try again</Button>
        <Link href={singleLevelNestedRoutes.account.products}>
          <Button variant="outline">Return to all products</Button>
        </Link>
      </div>
    </div>
  );
}
