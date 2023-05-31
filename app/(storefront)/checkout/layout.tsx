import { ContentWrapper } from "@/components/content-wrapper";
import { Logo } from "@/components/logo";
import { PropsWithChildren } from "react";

export default function Layout(props: PropsWithChildren) {
  return (
    <div>
      <header className="bg-primary text-white">
        <ContentWrapper className="flex items-center justify-center">
          <Logo />
        </ContentWrapper>
      </header>
      <ContentWrapper>{props.children}</ContentWrapper>
    </div>
  );
}
