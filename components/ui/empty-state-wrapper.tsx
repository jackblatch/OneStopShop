import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export const EmptyStateWrapper = (
  props: PropsWithChildren<{
    height: `${`h-[${number}px]`}`;
  }>
) => {
  return (
    <div
      className={cn(
        "col-span-9 mt-4 gap-2 rounded-md border-2 border-dashed border-gray-200 p-6 text-center flex items-center justify-center flex-col",
        props.height
      )}
    >
      {props.children}
    </div>
  );
};
