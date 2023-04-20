import { PropsWithChildren } from "react";
import { ContentWrapper } from "./content-wrapper";
import { cn } from "@/lib/utils";

export const AnnouncementBar = ({
  columns,
  description,
  children,
}: PropsWithChildren<{ columns: 1 | 2; description: string }>) => {
  return (
    <div className="bg-primary text-secondary p-2">
      <ContentWrapper paddingY="1">
        <div
          className={cn(
            "flex items-center justify-between",
            columns === 1 && "justify-center"
          )}
        >
          <div>{description}</div>
          {children}
        </div>
      </ContentWrapper>
    </div>
  );
};
