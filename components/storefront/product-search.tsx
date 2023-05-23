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
import Image from "next/image";
import { ProductImages } from "@/lib/types";
import { ImageOff } from "lucide-react";
import { currencyFormatter } from "@/lib/currency";
import { LoadingSkeleton } from "../ui/loading-skeleton";
import { ProductImage } from "../product-image";

export function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<
    (Pick<Product, "id" | "name" | "price"> & { images: ProductImages[] })[]
  >([]);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [confirmedHasNoResults, setConfirmedHasNoResults] = useState(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (searchTerm === "") return setResults([]);
    const getData = setTimeout(async () => {
      if (searchTerm === "") return;
      setIsLoadingResults(true);
      setConfirmedHasNoResults(false);
      setResults(
        await getProductsBySearchTerm(searchTerm)
          .then((res) => {
            if (!res.length) setConfirmedHasNoResults(true);
            return res as unknown as (Pick<Product, "id" | "name" | "price"> & {
              images: ProductImages[];
            })[];
          })
          .finally(() => setIsLoadingResults(false))
      );
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
          <p className="text-sm text-muted-foreground hidden md:block">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </p>
        </button>
      </div>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Search for a product</DialogTitle>
            <DialogDescription>
              Search our entire product catalogue
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex flex-col gap-2 items-start justify-start">
            {isLoadingResults && <LoadingSkeleton className="w-full h-12" />}
            {!results.length &&
              searchTerm !== "" &&
              !isLoadingResults &&
              confirmedHasNoResults && <p>No results found.</p>}
            {results.map((product) => (
              <Link
                href={`${routes.product}/${product.id}`}
                onClick={() => setOpen(false)}
                key={product.id}
                className="w-full bg-secondary p-2 rounded-md"
              >
                <div className="flex items-center justify-start gap-2">
                  <ProductImage
                    src={product.images[0]?.url}
                    alt={product.images[0]?.alt}
                    sizes="50px"
                    height="h-12"
                    width="w-14"
                  />
                  <div className="flex items-center justify-between w-full pr-4">
                    <Button
                      variant="link"
                      className="flex items-center justify-start w-full text-left"
                    >
                      {product.name}
                    </Button>
                    <p className="text-muted-foreground text-sm">
                      {currencyFormatter(Number(product.price))}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
