"use client";
import { Button } from "@/components/ui/button";
import { StatusLabel } from "@/components/ui/status-label";
import { currencyFormatter } from "@/lib/currency";
import { BuyersOrderTable, CheckoutItem } from "@/lib/types";
import { convertSecondsToDate, formatOrderNumber } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { formatRelative } from "date-fns";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<BuyersOrderTable>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const id = row.getValue("id");
      return <p className="px-4">{formatOrderNumber(Number(id))}</p>;
    },
  },
  {
    accessorKey: "sellerName",
    header: "Seller",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => currencyFormatter(Number(row.getValue("total"))),
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => {
      const items = JSON.parse(row.getValue("items")) as CheckoutItem[];
      const total = items.reduce((acc, item) => acc + Number(item.qty), 0);
      return (
        <p>
          {total} {`${total > 1 ? "items" : "item"}`}
        </p>
      );
    },
  },
  {
    accessorKey: "stripePaymentIntentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const status = row.getValue("stripePaymentIntentStatus") as string;
      return (
        <StatusLabel status={status === "succeeded" ? "success" : "error"}>
          {status}
        </StatusLabel>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date ordered",
    cell: ({ row }) => {
      const createdSeconds = parseFloat(row.getValue("createdAt"));
      if (!createdSeconds) return;
      const relativeDate = formatRelative(
        convertSecondsToDate(createdSeconds),
        new Date()
      );
      return relativeDate[0].toUpperCase() + relativeDate.slice(1);
    },
  },
];
