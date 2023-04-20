import { cn } from "@/lib/utils";
import { type PropsWithChildren } from "react";

export const ContentWrapper = ({
  children,
  paddingY = "6",
}: PropsWithChildren<{ paddingY?: string }>) => {
  return (
    <div className={`max-w-7xl m-auto px-6 py-${paddingY}`}>{children}</div>
  );
};
