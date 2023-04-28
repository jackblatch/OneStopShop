import { PropsWithChildren } from "react";

export default function Layout(
  props: PropsWithChildren<{ modal: React.ReactNode }>
) {
  return (
    <>
      {props.children}
      {props.modal}
    </>
  );
}
