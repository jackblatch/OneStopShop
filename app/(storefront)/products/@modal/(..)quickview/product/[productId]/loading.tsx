import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-2 gap-6 w-full">
      <LoadingSkeleton className="w-full h-48" />
      <div className="flex flex-col gap-4 col-span-1">
        <LoadingSkeleton className="w-56 h-8" />
        <LoadingSkeleton className="w-24 h-8" />
        <LoadingSkeleton.Button />
        <div className="flex flex-col gap-2 w-full">
          <LoadingSkeleton className="w-full h-5" />
          <LoadingSkeleton className="w-[90%] h-5" />
          <LoadingSkeleton className="w-[70%] h-5" />
        </div>
      </div>
    </div>
  );
}
