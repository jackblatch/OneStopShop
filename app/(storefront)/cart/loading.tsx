import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { cookies } from "next/headers";

export default function Loading() {
  return (
    <>
      {/* {!!cookies().has("cartItems") && ( */}
      <div>
        <div className="mb-4 flex items-end justify-between">
          <LoadingSkeleton className="w-48 h-12" />
          <LoadingSkeleton className="w-36 h-8" />
        </div>
        <div className="grid grid-cols-9 gap-24">
          <div className="col-span-6 flex flex-col gap-4">
            {Array.from(Array(6)).map((_, i) => (
              <LoadingSkeleton className="w-full h-12" key={i} />
            ))}
          </div>
          <div className="col-span-3">
            <LoadingSkeleton className="w-full h-96" />
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
}
