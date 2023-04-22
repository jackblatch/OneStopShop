import { EditStoreFields } from "@/components/admin/edit-store-fields";
import { Heading } from "@/components/ui/heading";
import { db } from "@/db/db";
import { stores } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/app-beta";
import { eq } from "drizzle-orm";

export default async function SellerProfile() {
  const user = await currentUser();

  let storeDetails;
  try {
    storeDetails = await db
      .select()
      .from(stores)
      .where(eq(stores.id, Number(user?.privateMetadata?.storeId)));
  } catch {
    console.log("error");
  }

  return (
    <div>
      <Heading size="h3">Selling profile</Heading>
      {storeDetails && <EditStoreFields storeDetails={storeDetails[0]} />}
    </div>
  );
}
