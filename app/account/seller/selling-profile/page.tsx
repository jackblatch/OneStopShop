import { EditStoreFields } from "@/components/admin/edit-store-fields";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { db } from "@/db/db";
import { stores } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/app-beta";
import { eq } from "drizzle-orm";

export default async function SellerProfile() {
  const user = await currentUser();

  const storeDetails = await db
    .select()
    .from(stores)
    .where(eq(stores.id, Number(user?.privateMetadata?.storeId)))
    .catch((err) => {
      console.log(err);
      return null;
    });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Heading size="h3">Selling profile</Heading>
        <Text appearance="secondary">
          Review and update your store settings
        </Text>
      </div>
      {storeDetails && <EditStoreFields storeDetails={storeDetails[0]} />}
    </div>
  );
}
