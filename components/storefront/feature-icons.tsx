import { cn } from "@/lib/utils";
import { Phone, RotateCcw, Truck } from "lucide-react";

export const FeatureIcons = (props: { className?: string }) => {
  return (
    <div
      className={cn(
        "text-center flex items-center rounded-md justify-between gap-8 sm:gap-4 p-4 md:w-fit",
        props.className
      )}
    >
      <div className="flex items-center justify-center flex-col gap-2 sm:mx-4">
        <Truck />
        <p className="text-sm">Fast Dispatch</p>
      </div>
      <div className="flex items-center justify-center flex-col gap-2 sm:mx-4">
        <RotateCcw />
        <p className="text-sm">30 Day Returns</p>
      </div>
      <div className="flex items-center justify-center flex-col gap-2 sm:mx-4">
        <Phone />
        <p className="text-sm">24/7 Support</p>
      </div>
    </div>
  );
};
