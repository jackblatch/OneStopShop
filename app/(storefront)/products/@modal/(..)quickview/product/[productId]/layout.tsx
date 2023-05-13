import { type PropsWithChildren } from "react";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";

export default function Layout(props: PropsWithChildren) {
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="max-w-2xl min-w-xl max-h-[500px] overflow-x-auto">
        {props.children}
      </AlertDialogContent>
    </AlertDialog>
  );
}
