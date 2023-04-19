import Link from "next/link";
import { Button } from "./ui/button";

export const MenuItems = () => {
  return (
    <ul className="flex items-center justify-start gap-4 pt-1 ml-2">
      {["Home", "About", "Contact"].map((item) => (
        <li key={item}>
          <Link href="/">
            <Button variant="link" size="default">
              {item}
            </Button>
          </Link>
        </li>
      ))}
    </ul>
  );
};
