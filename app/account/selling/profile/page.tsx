import { HeadingAndSubheading } from "@/components/admin/heading-and-subheading";
import { EditStoreFields } from "@/components/admin/edit-store-fields";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { db } from "@/db/db";
import { stores } from "@/db/schema";
import { currentUser } from "@clerk/nextjs";
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
    <>
      <HeadingAndSubheading
        heading="Selling profile"
        subheading="Review and update your store settings"
      />
      {storeDetails && <EditStoreFields storeDetails={storeDetails[0]} />}
    </>
  );
}
