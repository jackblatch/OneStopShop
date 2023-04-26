import { PropsWithChildren } from "react";

export default function Layout(
  props: PropsWithChildren<{ modal: React.ReactNode }>
) {
  return (
    <>
      {props.children}
      {/* - @TODO: fix - this causes a 404 not found error on the entire route */}
      {/* {props.modal} */}
    </>
  );
}
