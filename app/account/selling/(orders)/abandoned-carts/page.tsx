import { getPaymentIntents } from "@/server-actions/stripe/payment";
import { Payment, columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { StripePaymentIntent } from "@/lib/types";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return await getPaymentIntents().then((res) =>
    res.map((item: StripePaymentIntent) => ({
      id: item.id,
      amount: item.amount / 100,
      created: item.created,
      cartId: item.metadata.cartId,
    }))
  );
}

export default async function OrdersPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
