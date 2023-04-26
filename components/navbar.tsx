import Link from "next/link";
import { Logo } from "./logo";
import { ContentWrapper } from "./content-wrapper";
import { ShoppingCart, Truck } from "lucide-react";
import { Search } from "./search";
import { MenuItems } from "./menu-items";
import { Line } from "./line";
import { AnnouncementBar } from "./announcement-bar";
import { IconWithText } from "./icon-with-text";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

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
        <div className="flex items-center justify-end gap-6">
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
        <ContentWrapper>
          <ul className="flex items-center justify-between gap-12 py-2">
            <li>
              <Link href="/">
                <Logo />
              </Link>
            </li>
            <li className="flex-1">
              <Search />
            </li>
            <li>
              <Link href="/">
                <IconWithText
                  icon={<Truck size="36" strokeWidth={2} />}
                  headingText="Fast Dispatch"
                  description="Get your order in 2-3 days"
                />
              </Link>
            </li>
            <li>
              <ShoppingCart size={26} />
            </li>
          </ul>
        </ContentWrapper>
        <Line />
        <ContentWrapper paddingY="0">
          <div className="-ml-4">
            <MenuItems />
          </div>
        </ContentWrapper>
      </nav>
      {showSecondAnnouncementBar && (
        <AnnouncementBar
          columns={1}
          description="New summer sale - limited time only!"
          backgroundColor="bg-secondary"
          textColor="text-primary"
        />
      )}
      <Line />
    </>
  );
};
