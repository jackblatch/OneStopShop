"use client";

import { useState, type PropsWithChildren } from "react";
import { Heading } from "../ui/heading";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { anchorTags } from "@/lib/routes";
import { LoadingSkeleton } from "../ui/loading-skeleton";

const mockImage =
  "https://images.unsplash.com/photo-1426927308491-6380b6a9936f?auto=format&fit=crop&q=80&w=2071&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const CollectionHeaderWrapper = (
  props: PropsWithChildren<{ heading: string }>
) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div
      className="border-border rounded-md border overflow-hidden"
      id={anchorTags.collectionHeader}
    >
      <div className="relative w-full h-36">
        <Image
          src={mockImage}
          alt="mock image"
          fill
          className="object-cover w-full h-36"
        />
      </div>
      <div className="p-6">
        <Heading size="h2">{props.heading}</Heading>
        <div
          className={cn(
            "text-muted-foreground flex flex-col gap-4 mt-2 relative",
            !showMore && "max-h-[100px] overflow-hidden"
          )}
        >
          {!showMore && (
            <div
              className={cn(
                "p-2 h-[70px] absolute bottom-0 w-full",
                !showMore &&
                  "bg-gradient-to-b from-transparent to-translucentWhite"
              )}
            />
          )}
          {props.children}
        </div>
        <Button
          variant="secondary"
          onClick={() => setShowMore((prev) => !prev)}
          className={cn(showMore && "mt-4")}
        >
          {!showMore ? "Show more" : "Show less"}
        </Button>
      </div>
    </div>
  );
};
