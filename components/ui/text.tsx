import { PropsWithChildren } from "react";

export const Text = ({
  children,
  appearance,
}: PropsWithChildren<{
  appearance?: "default" | "secondary";
}>) => {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
};
