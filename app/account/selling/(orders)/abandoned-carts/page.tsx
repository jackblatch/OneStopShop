import { getPaymentIntents } from "@/server-actions/stripe/payment";
import { Payment, columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { InfoCard } from "@/components/admin/info-card";
import { ShoppingCart } from "lucide-react";
import { Heading } from "@/components/ui/heading";

async function getData(): Promise<{
  paymentIntents: Payment[];
  hasMore: boolean;
}> {
  return await getPaymentIntents({});
}

export default async function OrdersPage() {
  const data = await getData();
  const lastPaymentIntentInInitialFetch = data.paymentIntents.at(-1) as Payment;

  return (
    <div>
      <div className="mb-4">
        <Heading size="h4">Abondoned carts</Heading>
      </div>
      {!data.paymentIntents.length ? (
        <InfoCard
          heading="You don't have any abandoned carts yet"
          subheading="Check back later once shoppers have started checking out"
          icon={<ShoppingCart size={36} className="text-gray-600" />}
        />
      ) : (
        <div className="w-full">
          <DataTable
            columns={columns}
            data={data.paymentIntents}
            initialFetchHasNextPage={data.hasMore}
            lastPaymentIntentInInitialFetchId={
              lastPaymentIntentInInitialFetch.id
            }
            getPaymentIntents={getPaymentIntents}
          />
        </div>
      )}
    </div>
  );
}
