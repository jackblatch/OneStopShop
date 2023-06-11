import { ContentWrapper } from "@/components/content-wrapper";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

export default function Loading() {
  return (
    <div>
      <LoadingSkeleton className="w-full h-[500px]" />
      <div className="flex gap-2 items-center justify-center mt-2 mb-6">
        {Array.from(Array(3)).map((_, i) => (
          <LoadingSkeleton className="w-3 h-3 rounded-full" key={i} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 mt-12">
        <LoadingSkeleton className="w-24 h-8" />
        <LoadingSkeleton className="w-24 h-8" />
      </div>
      <div className="flex flex-col gap-2 items-center justify-center mt-12">
        <LoadingSkeleton className="w-1/2 md:w-1/3 h-12" />
        <LoadingSkeleton className="w-1/3 md:w-1/4 h-10" />
      </div>
      <ContentWrapper className="sm:grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 flex flex-col">
        {Array.from(Array(4)).map((_, i) => (
          <LoadingSkeleton className="w-full h-48" key={i} />
        ))}
      </ContentWrapper>
    </div>
  );
}
