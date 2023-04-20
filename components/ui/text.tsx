import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export const Text = ({
  children,
  appearance,
}: PropsWithChildren<{
  appearance?: "default" | "secondary";
}>) => {
  return (
    <p
      className={cn(
        "leading-7",
        appearance === "secondary" && "text-muted-foreground"
      )}
    >
      {children}
    </p>
  );
};
