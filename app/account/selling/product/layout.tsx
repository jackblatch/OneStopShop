import { singleLevelNestedRoutes } from "@/lib/routes";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { type PropsWithChildren } from "react";

export default function ProductLayout(props: PropsWithChildren) {
  return (
    <>
      <div className="text-muted-foreground text-sm flex justify-start gap-2 items-center">
        <Link
          href={singleLevelNestedRoutes.account.products}
          className="hover:text-primary"
        >
          <span>Products</span>
        </Link>
        <ChevronRight size={18} />{" "}
        <span className="text-primary">Product Details</span>
      </div>
      {props.children}
    </>
  );
}
