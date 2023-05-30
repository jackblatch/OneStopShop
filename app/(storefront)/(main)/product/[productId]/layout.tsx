import { ContentWrapper } from "@/components/content-wrapper";
import { type PropsWithChildren } from "react";

export default function Layout(props: PropsWithChildren) {
  return (
    <ContentWrapper className="max-w-7xl m-x-auto mt-8">
      {props.children}
    </ContentWrapper>
  );
}
