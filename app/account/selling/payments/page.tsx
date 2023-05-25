import { HeadingAndSubheading } from "@/components/admin/heading-and-subheading";
import { createConnectedAccount } from "@/server-actions/stripe";

export default function PaymentsPage() {
  createConnectedAccount();
  return (
    <>
      <HeadingAndSubheading
        heading="Payments"
        subheading="View your payouts and manage your payment settings"
      />
    </>
  );
}
