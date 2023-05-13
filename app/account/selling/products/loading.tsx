import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-between">
        <LoadingSkeleton.HeadingAndSubheading />
        <LoadingSkeleton.Button />
      </div>
      <div className="mt-4">
        <LoadingSkeleton className="w-1/4 h-10" />
      </div>
      <div className="flex flex-col gap-2">
        {Array.from(Array(6)).map((_, i) => (
          <LoadingSkeleton className="w-full h-10" key={i} />
        ))}
      </div>
    </>
  );
}
