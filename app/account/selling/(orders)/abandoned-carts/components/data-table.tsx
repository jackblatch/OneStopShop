"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Payment } from "./columns";
import { Loader2 } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  getPaymentIntents: ({
    startingAfterPaymentId,
    beforePaymentId,
  }: {
    startingAfterPaymentId?: string | undefined;
    beforePaymentId?: string | undefined;
  }) => Promise<{ paymentIntents: any; hasMore: any }>;
  lastPaymentIntentInInitialFetchId: string;
  initialFetchHasNextPage: boolean;
}

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const [newData, setNewData] = useState<Payment[]>(props.data as Payment[]);
  const [hasNextPage, setHasNextPage] = useState(props.initialFetchHasNextPage);
  const [isLoadingNewPage, setIsLoadingNewPage] = useState({
    previous: false,
    next: false,
  });
  const [pageIndex, setPageIndex] = useState(1);

  const table = useReactTable({
    data: newData as TData[],
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-secondary">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={props.columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          Page {pageIndex <= 0 ? 1 : pageIndex} of{" "}
          {hasNextPage ? "many" : pageIndex}
        </p>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              setIsLoadingNewPage({ previous: true, next: false });
              const currentNewestPaymentIntent = newData.at(0);
              const { paymentIntents } = await props.getPaymentIntents({
                beforePaymentId: currentNewestPaymentIntent?.id,
              });
              setNewData(paymentIntents);
              setIsLoadingNewPage({ previous: false, next: false });
              setPageIndex((prev) => prev - 1);
            }}
            disabled={
              props.lastPaymentIntentInInitialFetchId === newData.at(-1)?.id ||
              isLoadingNewPage.previous ||
              isLoadingNewPage.next
            }
            className="flex items-center justify-center gap-1"
          >
            <p>Previous</p>
            {isLoadingNewPage.previous && (
              <Loader2 size={14} className="animate-spin" />
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              setIsLoadingNewPage({ previous: false, next: true });
              const currentOldestPaymentIntent = newData.at(-1);
              const { paymentIntents, hasMore } = await props.getPaymentIntents(
                {
                  startingAfterPaymentId: currentOldestPaymentIntent?.id,
                }
              );
              setHasNextPage(hasMore);
              setNewData(paymentIntents);
              setIsLoadingNewPage({ previous: false, next: false });
              setPageIndex((prev) => prev + 1);
            }}
            disabled={
              !hasNextPage || isLoadingNewPage.previous || isLoadingNewPage.next
            }
            className="flex items-center justify-center gap-1"
          >
            <p>Next</p>
            {isLoadingNewPage.next && (
              <Loader2 size={14} className="animate-spin" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
