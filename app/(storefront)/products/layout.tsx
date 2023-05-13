import { ContentWrapper } from "@/components/content-wrapper";
import { PropsWithChildren } from "react";

export default function Layout(
  props: PropsWithChildren<{ modal: React.ReactNode }>
) {
  return (
    <ContentWrapper>
      {props.children}
      {props.modal}
    </ContentWrapper>
  );
}
