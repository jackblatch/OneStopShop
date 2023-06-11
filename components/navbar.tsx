import Link from "next/link";
import { Logo } from "./logo";
import { ContentWrapper } from "./content-wrapper";
import { Truck } from "lucide-react";
import { MenuItems } from "./menu-items";
import { Line } from "./line";
import { AnnouncementBar } from "./announcement-bar";
import { IconWithText } from "./icon-with-text";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { MobileNavigation } from "./mobile-navigation";
import { ShoppingCartHeader } from "./shopping-cart-header";
import { ProductSearch } from "./storefront/product-search";

export const NavBar = ({
  showSecondAnnouncementBar,
}: {
  showSecondAnnouncementBar: boolean;
}) => {
  return (
    <>
      <AnnouncementBar
        columns={2}
        description="Free shipping on all orders over $50"
      >
        <div className="items-center justify-end gap-6 hidden sm:flex">
          <Link
            href={routes.account}
            className="uppercase text-secondary text-sm"
          >
            Account
          </Link>
          <Link href="/" className="uppercase text-secondary text-sm">
            Help Centre
          </Link>
        </div>
      </AnnouncementBar>
      <nav
        className={cn(
          "pb-1 sticky top-0 bg-white z-10 shadow-sm",
          showSecondAnnouncementBar && "border-b border-border"
        )}
      >
        <ContentWrapper className="flex justify-between items-center md:hidden flex-wrap gap-4">
          <Logo />
          <div className="ml-auto flex items-center gap-8">
            <ShoppingCartHeader />
            <MobileNavigation />
          </div>
        </ContentWrapper>
        <ContentWrapper className="hidden md:block">
          <ul className="flex items-center justify-between gap-12 py-2">
            <li>
              <Link href="/">
                <Logo />
              </Link>
            </li>
            <li className="flex-1">
              <ProductSearch />
            </li>
            <li className="hidden lg:block">
              <Link href="/">
                <IconWithText
                  icon={<Truck size="36" strokeWidth={2} />}
                  headingText="Fast Dispatch"
                  description="Get your order in 2-3 days"
                />
              </Link>
            </li>
            <li>
              <ShoppingCartHeader />
            </li>
          </ul>
        </ContentWrapper>
        <Line className="hidden md:block" />
        <ContentWrapper className="hidden md:block py-0">
          <div className="-ml-4 mt-1">
            <MenuItems />
          </div>
        </ContentWrapper>
      </nav>
      {showSecondAnnouncementBar && (
        <AnnouncementBar
          columns={1}
          description="New summer sale - limited time only!"
          backgroundColor="bg-blue-900"
          textColor="text-secondary"
        />
      )}
      <Line />
    </>
  );
};
