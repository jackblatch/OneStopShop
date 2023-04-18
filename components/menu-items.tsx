import Link from "next/link";
import { Button } from "./ui/button";

export const MenuItems = () => {
  return (
    <ul className="flex items-center justify-center gap-4 pt-1">
      {["Home", "About", "Contact"].map((item) => (
        <li>
          <Link href="/">
            <Button variant="ghost" size="default">
              {item}
            </Button>
          </Link>
        </li>
      ))}
    </ul>
  );
};
