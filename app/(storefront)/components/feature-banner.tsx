export const FeatureBanner = (props: {
  heading: string;
  subheading: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="p-6 bg-secondary border border-border rounded-md flex flex-col gap-3">
      <div>{props.icon}</div>
      <div>
        <p className="font-semibold text-xl">{props.heading}</p>
        <p>{props.subheading}</p>
      </div>
    </div>
  );
};
