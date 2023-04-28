import { HeadingAndSubheading } from "./heading-and-subheading";

export const InfoCard = (props: {
  heading: string;
  subheading: string;
  icon: React.ReactNode;
  button?: React.ReactNode;
}) => {
  return (
    <div className="flex items-center justify-center bg-gray-50 rounded-md border border-border flex-col p-6 gap-4 py-24">
      {props.icon}
      <HeadingAndSubheading
        heading={props.heading}
        subheading={props.subheading}
        className="text-center"
      />
      {props.button}
    </div>
  );
};
