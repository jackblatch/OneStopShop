"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { routes } from "@/lib/routes";
import Link from "next/link";

export default function CheckoutError(props: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center flex-col mt-24">
      <Heading size="h2">Sorry, an error occured loading this page.</Heading>
      <p className="mt-2">
        Please try again, or contact our customer support team if this issue
        persists.
      </p>
      <div className="flex gap-2 items-center mt-4">
        <Link href={routes.cart}>
          <Button>Return to Cart</Button>
        </Link>
      </div>
    </div>
  );
}
