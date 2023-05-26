import { HeadingAndSubheading } from "@/components/admin/heading-and-subheading";
import { InfoCard } from "@/components/admin/info-card";
import { Button } from "@/components/ui/button";
import { createConnectedAccount } from "@/server-actions/stripe";
import { CreditCard, Lock } from "lucide-react";
import { CreateConnectedAccount } from "./components/create-connected-account";

export default function PaymentsPage() {
  return (
    <>
      <HeadingAndSubheading
        heading="Payments"
        subheading="View your payouts and manage your payment settings"
      />
      <InfoCard
        heading="Payments aren't setup yet"
        subheading="Link your stripe account to start accepting orders"
        icon={<CreditCard size={36} className="text-gray-600" />}
        button={<CreateConnectedAccount />}
      />
    </>
  );
}
