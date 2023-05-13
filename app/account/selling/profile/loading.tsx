import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

export default function Loading() {
  return (
    <>
      <LoadingSkeleton.HeadingAndSubheading />
      <div className="grid grid-cols-2 gap-6 mt-4">
        <div className="flex flex-col gap-6 col-span-1">
          <LoadingSkeleton className="w-full h-12" />
          <LoadingSkeleton className="w-full h-12" />
        </div>
        <LoadingSkeleton className="w-full h-full" />
      </div>
      <div className="flex justify-end items-center mt-2">
        <LoadingSkeleton.Button />
      </div>
    </>
  );
}
