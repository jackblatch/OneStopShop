import { CreateNewStore } from "@/components/admin/create-new-store";
import { currentUser } from "@clerk/nextjs/app-beta";

export default async function SellerLayout() {
  const user = await currentUser();
  console.log(user?.privateMetadata?.storeId);

  return (
    <>
      {user?.privateMetadata?.storeId ? (
        <div>Store created!</div>
      ) : (
        <CreateNewStore />
      )}
    </>
  );
}
