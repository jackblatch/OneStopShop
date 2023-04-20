import Link from "next/link";
import { Button } from "./ui/button";

const menuItems = [
  {
    name: "Home",
    href: "/",
    megaMenu: [
      {
        title: "Col 1",
        items: [
          {
            name: "Item 1",
            href: "/",
          },
        ],
      },
    ],
  },
  {
    name: "Contact",
    href: "/",
    megaMenu: [
      {
        title: "Col 1",
        items: [
          {
            name: "Item 1",
            href: "/",
          },
        ],
      },
    ],
  },
];

export const MenuItems = () => {
  return (
    <ul className="flex items-center justify-start gap-4 pt-1">
      {menuItems.map((item, i) => (
        <li key={i}>
          <Link href="/">
            <Button variant="link" size="default">
              {item.name}
            </Button>
          </Link>
        </li>
      ))}
    </ul>
  );
};
