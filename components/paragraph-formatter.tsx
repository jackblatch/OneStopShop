import { cn } from "@/lib/utils";
import { Text } from "./ui/text";

export const ParagraphFormatter = (props: {
  paragraphs: string | null;
  className?: string;
}) => {
  if (!props.paragraphs) return null;
  return (
    <div className={cn("flex flex-col gap-2", props.className)}>
      {props.paragraphs?.split("\n").map((item, i) => (
        <Text key={i}>{item}</Text>
      ))}
    </div>
  );
};
