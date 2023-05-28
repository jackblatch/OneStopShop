import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { singleLevelNestedRoutes } from "@/lib/routes";
import { hasConnectedStripeAccount } from "@/server-actions/stripe";
import { AlertCircle, ChevronDown } from "lucide-react";
import Link from "next/link";

export const PaymentConnectionStatus = async () => {
  const connectedStripeAccount = await hasConnectedStripeAccount();
  const connectColor = connectedStripeAccount ? "green" : "yellow";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`flex items-center gap-1 justify-center rounded-md border py-1 px-3 text-sm text-center bg-${connectColor}-100 border-${connectColor}-500 text-${connectColor}-700`}
      >
        <AlertCircle size={16} />
        <p className="font-bold">Payments:</p>
        <p>{connectedStripeAccount ? "Connected" : "Not connected"}</p>
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
