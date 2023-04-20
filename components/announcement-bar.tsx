import { PropsWithChildren } from "react";
import { ContentWrapper } from "./content-wrapper";
import { cn } from "@/lib/utils";

export const AnnouncementBar = ({
  columns,
  description,
  backgroundColor = "bg-primary",
  textColor = "text-secondary",
  children,
}: PropsWithChildren<{
  columns: 1 | 2;
  description: string;
  backgroundColor?: string;
  textColor?: string;
}>) => {
  return (
    <div className={cn("text-secondary p-2", backgroundColor, textColor)}>
      <ContentWrapper paddingY="2">
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
