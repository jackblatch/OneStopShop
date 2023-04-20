import { Text } from "./ui/text";

export const IconWithText = ({
  icon,
  headingText,
  description,
}: {
  icon: React.ReactNode;
  headingText: string;
  description: string;
}) => {
  return (
    <div className="flex items-center justify-between gap-3">
      {icon}
      <div className="flex flex-col">
        <p className="text-primary">{headingText}</p>
        <Text appearance="secondary">{description}</Text>
      </div>
    </div>
  );
};
