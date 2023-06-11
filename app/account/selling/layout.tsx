import { CreateNewStore } from "@/components/admin/create-new-store";
import { createStore } from "@/server-actions/store";
import { currentUser } from "@clerk/nextjs";
import { PropsWithChildren } from "react";

export default async function SellerLayout(props: PropsWithChildren) {
  const user = await currentUser();

  return (
    <>
      {user?.privateMetadata?.storeId ? (
        <div className="flex flex-col gap-4">{props.children}</div>
      ) : (
        <CreateNewStore createStore={createStore} />
      )}
    </>
  );
}
