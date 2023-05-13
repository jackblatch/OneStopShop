import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

export default function Loading() {
  return (
    <div>
      <LoadingSkeleton.CollectionHeaderWrapper />
      <div className="md:grid md:grid-cols-12 gap-12 mt-8">
        <LoadingSkeleton className="hidden md:block w-full md:col-span-3 md:h-full" />
        <div className="md:col-span-9 sm:grid md:grid-cols-3 gap-8 sm:grid-cols-2 flex flex-col">
          {Array.from(Array(12)).map((_, i) => (
            <LoadingSkeleton key={i} className="w-full h-48" />
          ))}
        </div>
      </div>
    </div>
  );
}
