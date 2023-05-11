"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Product } from "@/db/schema";
import { routes } from "@/lib/routes";
import { getProductsBySearchTerm } from "@/server-actions/product-search";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
export function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Pick<Product, "id" | "name">[]>([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const getData = setTimeout(async () => {
      if (searchTerm === "") return;
      setResults(await getProductsBySearchTerm(searchTerm).then((res) => res));
    }, 500);
    return () => clearTimeout(getData);
  }, [searchTerm]);

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <button
          className="border border-border px-4 py-2 rounded-md w-full flex items-center justify-between gap-2"
          onClick={() => setOpen((prev) => !prev)}
        >
          <p className="text-muted-foreground text-sm">Search...</p>
          <p className="text-sm text-muted-foreground">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </p>
        </button>
      </div>
      <Dialog onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Search for a product</DialogTitle>
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <DialogDescription className="flex flex-col gap-2 items-start justify-start">
              {results.map((product) => (
                <Link
                  href={`${routes.product}/${product.id}`}
                  key={product.id}
                  className="w-full"
                >
                  <Button
                    variant="secondary"
                    className="flex items-center justify-start w-full text-left"
                  >
                    {product.name}
                  </Button>
                </Link>
              ))}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
