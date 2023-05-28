import { HeadingAndSubheading } from "@/components/admin/heading-and-subheading";
import { InfoCard } from "@/components/admin/info-card";
import { CreditCard } from "lucide-react";
import { CreateConnectedAccount } from "./components/create-connected-account";
import {
  createAccountLink,
  hasConnectedStripeAccount,
  updateStripeAccountStatus,
} from "@/server-actions/stripe";

export default async function PaymentsPage() {
  await updateStripeAccountStatus();
  const connectedStripeAccount = await hasConnectedStripeAccount();

  return (
    <>
      <HeadingAndSubheading
        heading="Payments"
        subheading="View your payouts and manage your payment settings"
      />
      {connectedStripeAccount ? (
        "Account connected"
      ) : (
        <InfoCard
          heading="Payments aren't setup yet"
          subheading="Link your stripe account to start accepting orders"
          icon={<CreditCard size={36} className="text-gray-600" />}
          button={
            // pass server action from server component to client component - work around for nextjs/server actions bug with clerk.
            // calling the server action inside the client component causes a clerk error of "Error: Clerk: auth() and currentUser() are only supported in App Router (/app directory)"
            <CreateConnectedAccount createAccountLink={createAccountLink} />
          }
        />
      )}
    </>
  );
}
