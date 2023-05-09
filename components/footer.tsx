import { GithubIcon } from "lucide-react";
import { ContentWrapper } from "./content-wrapper";
import { Logo } from "./logo";

export const Footer = () => {
  return (
    <footer className="p-6 text-primary-foreground bg-primary pb-12">
      <ContentWrapper className="flex items-start md:items-end justify-start md:justify-between gap-2 flex-col md:flex-row">
        <div>
          <Logo />
          <p>Online shopping made easy</p>
        </div>
        <div className="flex gap-2 items-center justify-start md:justify-end">
          <div className="flex items-start md:items-end justify-center flex-col gap-1 text-secondary text-sm">
            <p>
              Fictional online marketplace built by{" "}
              <a
                href="https://github.com/jackblatch"
                className="text-white border-b pb-[1px] border-secondary"
              >
                @jackblatch
              </a>
              .
            </p>
            <p>Source code available on GitHub.</p>
          </div>
        </div>
      </ContentWrapper>
    </footer>
  );
};
