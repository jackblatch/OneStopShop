"use client";
import { formatRelative } from "date-fns";
import { currencyFormatter } from "@/lib/currency";
import { convertSecondsToDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  created: number;
  cartId: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "Checkout ID",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return currencyFormatter(amount);
    },
  },
  {
    accessorKey: "created",
    header: "Created At",
    cell: ({ row }) => {
      const createdSeconds = parseFloat(row.getValue("created"));
      const relativeDate = formatRelative(
        convertSecondsToDate(createdSeconds),
        new Date()
      );
      return relativeDate[0].toUpperCase() + relativeDate.slice(1);
    },
  },
  {
    accessorKey: "cartId",
    header: "Cart ID",
  },
];
