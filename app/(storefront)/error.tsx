"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import Link from "next/link";

export default function ProductPageError(props: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center flex-col mt-24">
      <Heading size="h2">Sorry, this page can&apos;t be found</Heading>
      <div className="flex gap-2 items-center mt-4">
        <Link href="/">
          <Button>Return home</Button>
        </Link>
      </div>
    </div>
  );
}
