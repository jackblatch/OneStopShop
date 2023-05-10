"use client";
import { Button } from "@/components/ui/button";
import { currencyFormatter } from "@/lib/currency";
import {
  routes,
  secondLevelNestedRoutes,
  singleLevelNestedRoutes,
} from "@/lib/routes";
import { ProductImages } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Payment = {
  id: string;
  name: string;
  price: number;
  inventory: string;
  images: ProductImages[];
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original.name;
      const id = row.original.id;
      return (
        <Button variant="link" size="sm">
          <Link href={`${secondLevelNestedRoutes.product.base}/${id}`}>
            {name}
          </Link>
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      return currencyFormatter(price);
    },
  },
  {
    accessorKey: "inventory",
    header: "Inventory",
  },
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => {
      const images = row.getValue("images") as ProductImages[];
      return images.length;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <Button variant="link" size="sm">
          <Link href={`${secondLevelNestedRoutes.product.base}/${id}`}>
            Edit
          </Link>
        </Button>
      );
    },
  },
];
