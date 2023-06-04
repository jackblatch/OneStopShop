import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export const StatusLabel = (
  props: PropsWithChildren<{
    status: "warning" | "success" | "error" | "info";
  }>
) => {
  const colours = {
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    success: "bg-green-100 text-green-800 border-green-300",
    error: "bg-red-100 text-red-800 border-red-300",
    info: "bg-blue-100 text-blue-800 border-blue-300",
  };

  return (
    <div
      className={cn(
        "rounded-full border capitalize w-fit px-2 py-[1px] text-sm text-center",
        colours[props.status]
      )}
    >
      {props.children}
    </div>
  );
};
