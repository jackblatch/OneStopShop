import { cn } from "@/lib/utils";
import { Phone, RotateCcw, Truck } from "lucide-react";

export const FeatureIcons = (props: { className?: string }) => {
  return (
    <div
      className={cn(
        "text-center flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-4 bg-secondary border border-border rounded-md p-4 px-12",
        props.className
      )}
    >
      <div className="flex items-center justify-center flex-col gap-2">
        <Truck />
        <p>Fast Dispatch</p>
      </div>
      <div className="flex items-center justify-center flex-col gap-2">
        <RotateCcw />
        <p>30 Day Returns</p>
      </div>
      <div className="flex items-center justify-center flex-col gap-2">
        <Phone />
        <p>24/7 Support</p>
      </div>
    </div>
  );
};
