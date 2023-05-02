"use client";
import { useState } from "react";
import Sheet from "./sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { routes } from "@/lib/routes";
import Link from "next/link";

export const MobileNavigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen((prev) => !prev)}>
        <Menu />
      </Button>
      <Sheet title="Menu" open={open} setOpen={setOpen}>
        <div className="flex items-start justify-center gap-2 flex-col">
          <button onClick={() => setOpen(false)}>
            <Link href={routes.products}>Products</Link>
          </button>
          <button onClick={() => setOpen(false)}>
            <Link href={routes.account}>Account</Link>
          </button>
          <button onClick={() => setOpen(false)}>
            <Link href={routes.cart}>Cart</Link>
          </button>
        </div>
      </Sheet>
    </>
  );
};
