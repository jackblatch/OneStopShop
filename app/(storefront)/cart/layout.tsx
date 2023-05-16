import { ContentWrapper } from "@/components/content-wrapper";
import { PropsWithChildren } from "react";
import { cookies } from "next/headers";

export default function Layout(props: PropsWithChildren) {
  return <ContentWrapper>{props.children}</ContentWrapper>;
}
