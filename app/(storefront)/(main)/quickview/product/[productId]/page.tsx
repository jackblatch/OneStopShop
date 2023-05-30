import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";

export default function QuickViewPage(context: {
  params: { productId: string };
}) {
  redirect(`${routes.product}/${context.params.productId}`);
}
