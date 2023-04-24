import { CreateNewStore } from "@/components/admin/create-new-store";
import { currentUser } from "@clerk/nextjs/app-beta";
import { PropsWithChildren } from "react";

export default async function SellerLayout(
  props: PropsWithChildren<{ modal: any }>
) {
  const user = await currentUser();

  return (
    <>
      {user?.privateMetadata?.storeId ? (
        <div className="flex flex-col gap-4">{props.children}</div>
      ) : (
        <CreateNewStore />
      )}
    </>
  );
}
