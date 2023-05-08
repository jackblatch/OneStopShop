/** app/api/uploadthing/core.ts */
import { currentUser } from "@clerk/nextjs";
import { createFilething, type FileRouter } from "uploadthing/server";
const f = createFilething();

const getUser = async () => await currentUser();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  productUploader: f
    // Set permissions and file types for this FileRoute
    .fileTypes(["image"])
    .maxSize("1MB")
    .middleware(async (req) => {
      // This code runs on your server before upload
      const user = await getUser();
      console.log("REQ", req);

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { storeId: user.privateMetadata.storeId }; // add product id metadata here too.
    })
    .onUploadComplete(async ({ metadata }) => {
      // This code RUNS ON YOUR SERVER after upload
      // ideally need to pass in product id here too.
      console.log("Upload complete for userId:", metadata.storeId);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
