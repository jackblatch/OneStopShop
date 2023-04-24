import { PropsWithChildren } from "react";

export default function Layout(props: PropsWithChildren<{ modal: any }>) {
  return (
    <>
      {props.children}
      {props.modal}
    </>
  );
}
