import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

export default function Loading() {
  return (
    <div>
      <LoadingSkeleton.HeadingAndSubheading />
      <div className="mt-4 flex flex-col gap-8">
        <LoadingSkeleton className="w-full h-10" />
        <LoadingSkeleton className="w-full h-48" />
        <LoadingSkeleton className="w-full h-24" />
      </div>
      <div className="flex gap-4">
        {Array.from(Array(2)).map((_, i) => (
          <LoadingSkeleton className="w-full h-10" key={i} />
        ))}
      </div>
    </div>
  );
}
