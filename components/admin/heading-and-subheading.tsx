import { cn } from "@/lib/utils";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";

export const HeadingAndSubheading = (props: {
  heading: string;
  subheading: string;
  className?: string;
}) => {
  return (
    <div className={cn(props.className)}>
      <Heading size="h3">{props.heading}</Heading>
      <Text appearance="secondary">{props.subheading}</Text>
    </div>
  );
};
