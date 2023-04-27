import { cn } from "@/lib/utils";

export const Line = (props: { className?: string }) => {
  return <div className={cn("h-[1px] bg-border w-full", props.className)} />;
};
