import { cn } from "@/lib/utils";

export const LoadingSkeleton = (props: { className: string }) => (
  <div
    className={cn("animate-pulse rounded-md bg-secondary", props.className)}
  />
);

const Button = () => <LoadingSkeleton className="w-36 h-10" />;
LoadingSkeleton.Button = Button;

const HeadingAndSubheading = () => {
  return (
    <div className="flex flex-col gap-2">
      <LoadingSkeleton className="w-48 h-8" />
      <LoadingSkeleton className="w-64 h-6" />
    </div>
  );
};
LoadingSkeleton.HeadingAndSubheading = HeadingAndSubheading;

const CollectionHeaderWrapper = () => (
  <div className="flex flex-col gap-4">
    <LoadingSkeleton className="w-full h-36" />
    <LoadingSkeleton className="w-48 h-10" />
    <div className="flex flex-col gap-2 mb-4">
      <LoadingSkeleton className="w-full h-4" />
      <LoadingSkeleton className="w-[90%] h-4" />
      <LoadingSkeleton className="w-[70%] h-4" />
    </div>
    <Button />
  </div>
);
LoadingSkeleton.CollectionHeaderWrapper = CollectionHeaderWrapper;
