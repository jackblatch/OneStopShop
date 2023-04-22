import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Sidebar = ({
  menuItems,
}: {
  menuItems: { name: string; href: string; heading: boolean }[];
}) => {
  return (
    <ul>
      {menuItems.map((item, i) => (
        <li
          key={i}
          className={cn(
            "mb-2 group flex items-center justify-start gap-2",
            item.heading &&
              "text-xl font-medium border-b border-gray-200 mb-2 pb-2 first:mt-0 mt-6"
          )}
        >
          <span
            className={cn(
              "border-b border-transparent",
              !item.heading && "hover:border-gray-800 cursor-pointer w-fit"
            )}
          >
            <Link href={item.href}>{item.name}</Link>
          </span>
          {!item.heading && (
            <span className="hidden group-hover:inline">
              <ArrowRight />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};
