import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { singleLevelNestedRoutes } from "@/lib/routes";
import { AlertCircle, ChevronDown } from "lucide-react";
import Link from "next/link";

export const PaymentConnectionStatus = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 justify-center rounded-md bg-yellow-100 border border-yellow-500 text-yellow-700 py-1 px-3 text-sm text-center">
        <AlertCircle size={16} />
        <p className="font-bold">Payments:</p>
        <p>Not connected</p>
        <ChevronDown size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Payments</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            className="w-full h-full" /* maximises clickable area */
            href={singleLevelNestedRoutes.account.payments}
          >
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Learn more</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
