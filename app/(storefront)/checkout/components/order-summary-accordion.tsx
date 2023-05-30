import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export function OrderSummaryAccordion(
  props: PropsWithChildren<{
    title: string;
    className?: string;
  }>
) {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn("w-full", props.className)}
    >
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger>{props.title}</AccordionTrigger>
        <AccordionContent>{props.children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
