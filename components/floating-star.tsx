import { Star } from "lucide-react";
import { PropsWithChildren } from "react";

export const FloatingStar = () => {
  return (
    <div className="group">
      <div className="hidden fixed bottom-4 bg-primary text-secondary rounded-r-full z-10 text-sm md:block p-4 hover:border-transparent">
        <GitHubLinkWrapper>
          <Star className="inline-block" size={24} />
        </GitHubLinkWrapper>
      </div>
      <div className="group-hover:block hidden animate-roll-in-left fixed bottom-4 left-4 bg-primary text-secondary rounded-r-full z-[9] text-sm h-[56px] p-4 pl-[48px] pr-6">
        <GitHubLinkWrapper>
          <p className="hover:underline mt-[2px]">Star project on GitHub</p>
        </GitHubLinkWrapper>
      </div>
    </div>
  );
};

const GitHubLinkWrapper = (props: PropsWithChildren) => {
  return (
    <a
      href="https://github.com/jackblatch/OneStopShop"
      className="flex items-center justify-center gap-2 plausible-event-name=floating-star-outbound"
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
    </a>
  );
};
