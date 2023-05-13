import { ContentWrapper } from "@/components/content-wrapper";
import { PropsWithChildren } from "react";

export default function Layout(props: PropsWithChildren) {
  return <ContentWrapper>{props.children}</ContentWrapper>;
}
