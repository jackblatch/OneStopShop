import { HeadingAndSubheading } from "@/components/admin/heading-and-subheading";
import { OrderLineItems } from "@/components/order-line-items";
import { Heading } from "@/components/ui/heading";
import { StatusLabel } from "@/components/ui/status-label";
import { db } from "@/db/db";
import { addresses, orders } from "@/db/schema";
import { currencyFormatter } from "@/lib/currency";
import { CheckoutItem } from "@/lib/types";
import {
  convertDateToRelativeTime,
  convertSecondsToDate,
  formatOrderNumber,
  removeOrderNumberFormatting,
} from "@/lib/utils";
import { getDetailsOfProductsOrdered } from "@/server-actions/orders";
import { getStoreId } from "@/server-actions/store-details";
import { and, eq } from "drizzle-orm";

export default async function OrderDetailPage(context: {
  params: { orderId: string };
}) {
  const storeId = await getStoreId();
  if (!storeId || isNaN(Number(context.params.orderId))) {
    throw new Error("Store ID not found");
  }
  const orderDetails = await db
    .select({
      order: orders,
      address: addresses,
    })
    .from(orders)
    .leftJoin(addresses, eq(orders.addressId, addresses.id))
    .where(
      and(
        eq(
          orders.prettyOrderId,
          removeOrderNumberFormatting(Number(context.params.orderId))
        ),
        eq(orders.storeId, Number(storeId))
      )
    );

  const record = orderDetails[0];
  const checkoutItems = JSON.parse(
    (record.order.items as string) ?? "[]"
  ) as CheckoutItem[];
  const products = await getDetailsOfProductsOrdered(checkoutItems);
  const totalItems = checkoutItems.reduce((acc, curr) => acc + curr.qty, 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-secondary border border-border p-6 rounded-md">
        <HeadingAndSubheading
          heading={`Order ${formatOrderNumber(
            record.order?.prettyOrderId ?? 0
          )}`}
          subheading={`${
            !record.order?.createdAt
              ? ""
              : convertDateToRelativeTime(
                  convertSecondsToDate(Number(record.order?.createdAt))
                )
          }`}
        />
      </div>
      <div className="md:grid grid-cols-12 flex flex-col gap-4">
        <div className="bg-secondary border border-border rounded-md p-4 py-6 md:col-span-8 h-fit">
          <Heading size="h4">
            <span className="px-2">Items ({totalItems})</span>
          </Heading>
          <OrderLineItems products={products} checkoutItems={checkoutItems} />
          <div className="mt-4 flex items-center justify-start gap-2 px-2">
            <Heading size="h4">
              Total paid:{" "}
              {isNaN(Number(record.order.total))
                ? ""
                : currencyFormatter(Number(record.order.total))}
            </Heading>
          </div>
        </div>
        <div className="md:col-span-4 flex flex-col gap-4">
          <div className="bg-secondary border border-border rounded-md p-4">
            <Heading size="h4">Customer</Heading>
            <div className="mt-2">
              <p>{record.order.name}</p>
              <p>{record.order.email}</p>
            </div>
          </div>
          <div className="bg-secondary border border-border rounded-md p-4">
            <Heading size="h4">Shipping Details</Heading>
            <div className="mt-2">
              <p>{record.address?.line1}</p>
              <p>{record.address?.line2}</p>
              <p>
                {record.address?.city}, {record.address?.postal_code}
              </p>
              <p>
                {record.address?.state}, {record.address?.country}
              </p>
            </div>
          </div>
          <div className="bg-secondary border border-border rounded-md p-4">
            <Heading size="h4">Payment</Heading>
            <div className="mt-2">
              <StatusLabel
                status={
                  record.order?.stripePaymentIntentStatus === "succeeded"
                    ? "success"
                    : "error"
                }
              >
                {record.order?.stripePaymentIntentStatus}
              </StatusLabel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
