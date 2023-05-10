"use client";
import { Button } from "@/components/ui/button";
import { currencyFormatter } from "@/lib/currency";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { routes, secondLevelNestedRoutes } from "@/lib/routes";
import { ProductImages } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Product = {
  id: string;
  name: string;
  price: number;
  inventory: string;
  images: ProductImages[];
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    header: ({ column }) => {
      return (
        <Button
          className="px-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      return currencyFormatter(price);
    },
  },
  {
    accessorKey: "inventory",
    header: ({ column }) => {
      return (
        <Button
          className="px-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Inventory
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`${secondLevelNestedRoutes.product.base}/${id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <a
              href={`${routes.product}/${id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <DropdownMenuItem>View on storefront</DropdownMenuItem>
            </a>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
