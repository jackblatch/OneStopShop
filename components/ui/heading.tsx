import { type PropsWithChildren } from "react";

const headingStyles = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
};

export const Heading = ({
  children,
  size: Tag,
}: PropsWithChildren<{ size: "h1" | "h2" | "h3" | "h4" }>) => {
  return <Tag className={headingStyles[Tag]}>{children}</Tag>;
};
