import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-2">
      <LoadingSkeleton.HeadingAndSubheading />
      <LoadingSkeleton className="w-full h-12 mt-2" />
      <LoadingSkeleton className="w-full h-36" />
    </div>
  );
}
