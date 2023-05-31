import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

export default function Loading() {
  return (
    <div className="md:grid md:grid-cols-9 gap-8 w-full flex flex-col">
      <LoadingSkeleton className="w-full col-span-4 h-80" />
      <div className="flex flex-col gap-4 col-span-5">
        <LoadingSkeleton className="w-56 h-8" />
        <LoadingSkeleton className="w-36 h-4" />
        <LoadingSkeleton className="w-24 h-8" />
        <div className="flex gap-2">
          {Array.from(Array(2)).map((_, i) => (
            <LoadingSkeleton.Button key={i} />
          ))}
        </div>
        <LoadingSkeleton className="w-96 h-16" />
      </div>
    </div>
  );
}
