import { cn } from "@/lib/utils";
import { type PropsWithChildren } from "react";

export const ContentWrapper = ({
  children,
  padding = "6",
}: PropsWithChildren<{ padding?: string }>) => {
  return (
    <div className={cn("max-w-7xl m-auto", `p-${padding}`)}>{children}</div>
  );
};
