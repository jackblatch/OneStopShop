import Link from "next/link";
import { Logo } from "./logo";
import { ContentWrapper } from "./content-wrapper";
import { ShoppingCart } from "lucide-react";
import { Search } from "./search";
import { MenuItems } from "./menu-items";
import { Line } from "./line";

export const NavBar = () => {
  return (
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
            <ShoppingCart />
          </li>
        </ul>
      </ContentWrapper>
      <Line />
      <ContentWrapper padding="0">
        <MenuItems />
      </ContentWrapper>
    </nav>
  );
};
