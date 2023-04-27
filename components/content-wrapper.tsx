import { cn } from "@/lib/utils";
import { type PropsWithChildren } from "react";

export const ContentWrapper = ({
  children,
  className,
  paddingY = "6",
}: PropsWithChildren<{ paddingY?: string; className?: string }>) => {
  return (
    <div className={cn(`max-w-[1800px] m-auto px-6 py-${paddingY}`, className)}>
      {children}
    </div>
  );
};
