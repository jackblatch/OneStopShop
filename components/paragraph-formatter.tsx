import { Text } from "./ui/text";

export const ParagraphFormatter = (props: { paragraphs: string | null }) => {
  if (!props.paragraphs) return null;
  return (
    <div className="flex flex-col gap-2">
      {props.paragraphs?.split("\n").map((item, i) => (
        <Text key={i}>{item}</Text>
      ))}
    </div>
  );
};
