import { CreateNewStore } from "@/components/admin/create-new-store";
import { currentUser } from "@clerk/nextjs/app-beta";
import { PropsWithChildren } from "react";

export default async function SellerLayout({ children }: PropsWithChildren) {
  const user = await currentUser();

  return (
    <>
      {user?.privateMetadata?.storeId ? (
        <div>{children}</div>
      ) : (
        <CreateNewStore />
      )}
    </>
  );
}
