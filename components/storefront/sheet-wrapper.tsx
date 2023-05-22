"use client";

import { useState, type PropsWithChildren } from "react";
import { Sheet, SheetContent } from "../ui/sheet";
import { useRouter } from "next/navigation";

export const SheetWrapper = (
  props: PropsWithChildren<{
    buttonRoute: string;
    insideButton: React.ReactNode;
    trigger: React.ReactNode;
  }>
) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <Sheet onOpenChange={() => setIsOpen((prev) => !prev)} open={isOpen}>
      {props.trigger}
      <SheetContent
        size="full"
        className="overflow-auto lg:max-w-[600px] sm:max-w-[400px] xl:max-w-[650px]"
      >
        {props.children}
        <div
          className="mt-8"
          onClick={() => {
            setIsOpen(false);
            router.push(props.buttonRoute);
          }}
        >
          {props.insideButton}
        </div>
      </SheetContent>
    </Sheet>
  );
};
