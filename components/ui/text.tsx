import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export const Text = ({
  children,
  appearance,
  className,
}: PropsWithChildren<{
  appearance?: "default" | "secondary";
  className?: string;
}>) => {
  return (
    <p
      className={cn(
        "leading-7",
        appearance === "secondary" && "text-muted-foreground",
        className
      )}
    >
      {children}
    </p>
  );
};
