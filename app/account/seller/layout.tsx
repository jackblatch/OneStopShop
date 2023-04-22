import { CreateNewStore } from "@/components/admin/create-new-store";
import { currentUser } from "@clerk/nextjs/app-beta";

export default async function SellerLayout() {
  const user = await currentUser();
  console.log(user?.privateMetadata?.storeId);

  return (
    <>{user?.privateMetadata?.storeId ? <div>ddd</div> : <CreateNewStore />}</>
  );
}

// create UI for if storeid isn't on clerk user metadata, then show create store option. Otherwise, fetch and render content
