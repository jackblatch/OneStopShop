"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { routes } from "@/lib/routes";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductSearch } from "./storefront/product-search";
import { ProductImage } from "./product-image";
import { images } from "@/lib/assets";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const MobileNavigation = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  return (
    <>
      <Sheet
        open={isMobileNavOpen}
        onOpenChange={() => setIsMobileNavOpen((prev) => !prev)}
      >
        <SheetTrigger>
          <div className="p-2 rounded-md border border-border">
            <Menu />
          </div>
        </SheetTrigger>
        <SheetContent
          size="full"
          className="overflow-auto lg:max-w-[600px] sm:max-w-[400px] xl:max-w-[650px]"
        >
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="my-6">
            <ProductSearch />
          </div>
          <div className="flex items-start justify-center gap-2 flex-col">
            <NavBarLink
              image={images[0]}
              href={routes.products}
              name="Products"
              setIsMobileNavOpen={setIsMobileNavOpen}
            />
            <NavBarLink
              image={images[1]}
              href={routes.account}
              name="Account"
              setIsMobileNavOpen={setIsMobileNavOpen}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

const NavBarLink = (props: {
  href: string;
  name: string;
  image: string;
  setIsMobileNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  return (
    <div className="flex gap-2 items-center justify-between w-full rounded-md border border-border">
      <ProductImage
        alt="products"
        src={props.image}
        sizes="50px"
        height="h-14"
        width="w-14"
      />
      <div className="w-full text-left">
        <Button
          variant="link"
          onClick={() => {
            router.push(props.href);
            props.setIsMobileNavOpen(false);
          }}
        >
          {props.name}
        </Button>
      </div>
    </div>
  );
};
