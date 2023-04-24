import { Heading } from "../ui/heading";
import { Text } from "../ui/text";

export const AccountHeading = (props: {
  heading: string;
  subheading: string;
}) => {
  return (
    <div>
      <Heading size="h3">{props.heading}</Heading>
      <Text appearance="secondary">{props.subheading}</Text>
    </div>
  );
};
