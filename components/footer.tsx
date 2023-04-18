import { ContentWrapper } from "./content-wrapper";
import { Logo } from "./logo";

export const Footer = () => {
  return (
    <footer className="p-6 text-primary-foreground bg-primary">
      <ContentWrapper>
        <Logo />
      </ContentWrapper>
    </footer>
  );
};
