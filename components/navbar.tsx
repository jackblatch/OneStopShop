import Link from "next/link";
import { Logo } from "./logo";
import { ContentWrapper } from "./content-wrapper";
import { ShoppingCart, Truck } from "lucide-react";
import { Search } from "./search";
import { MenuItems } from "./menu-items";
import { Line } from "./line";
import { AnnouncementBar } from "./announcement-bar";
import { IconWithText } from "./icon-with-text";
import { Button } from "./ui/button";

export const NavBar = () => {
  return (
    <>
      <AnnouncementBar
        columns={2}
        description="Free shipping on all orders over $50"
      >
        <div className="flex items-center justify-end gap-2">
          <Button variant="link" size="sm">
            <span className="uppercase text-secondary">Stores</span>
          </Button>
          <Button variant="link" size="sm">
            <span className="uppercase text-secondary">Help Centre</span>
          </Button>
        </div>
      </AnnouncementBar>
      <nav className="border-b border-border pb-1">
        <ContentWrapper>
          <ul className="flex items-center justify-between gap-12">
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
          <MenuItems />
        </ContentWrapper>
      </nav>
      <AnnouncementBar
        columns={1}
        description="Free shipping on all orders over $50"
      />
    </>
  );
};
