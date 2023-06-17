import { OrdersTable } from "@/lib/types";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { db } from "@/db/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getStoreId } from "@/server-actions/store-details";
import { InfoCard } from "@/components/admin/info-card";
import { Box } from "lucide-react";
import { Heading } from "@/components/ui/heading";

async function getData(): Promise<OrdersTable[]> {
  const storeId = await getStoreId();
  if (isNaN(Number(storeId))) return [];
  const storeOrders = await db
    .select({
      id: orders.prettyOrderId,
      name: orders.name,
      items: orders.items,
      total: orders.total,
      stripePaymentIntentStatus: orders.stripePaymentIntentStatus,
      createdAt: orders.createdAt,
    })
    .from(orders)
    .where(eq(orders.storeId, Number(storeId)));
  return (storeOrders as OrdersTable[]).sort(
    (a, b) => b.createdAt - a.createdAt
  );
}

export default async function OrdersPage() {
  const data = await getData();

  return (
    <div>
      <Heading size="h4">All orders</Heading>
      {data.length > 0 ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <InfoCard
          heading="No orders"
          subheading="You don't have any orders yet."
          icon={<Box size={30} />}
        />
      )}
    </div>
  );
}
