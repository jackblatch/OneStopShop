"use client";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { generateReactHelpers } from "@uploadthing/react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ProductImages } from "@/lib/types";
import Image from "next/image";
import { Product } from "@/db/schema";
import { useState } from "react";
import { XIcon } from "lucide-react";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export function ProductImageUploader(props: {
  product: Omit<Product, "images"> & { images: ProductImages[] };
  newImages: ProductImages[];
  setNewImages: React.Dispatch<React.SetStateAction<ProductImages[]>>;
  imagesToDelete: ProductImages[];
  setImagesToDelete: React.Dispatch<React.SetStateAction<ProductImages[]>>;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const { getRootProps, getInputProps, files, startUpload } =
    useUploadThing("productUploader");

  return (
    <div {...getRootProps()}>
      <Label htmlFor="product-images">Images</Label>
      <div className="mt-2 border border-border p-4 rounded-md flex items-center justify-start gap-2 flex-wrap">
        {props.product.images &&
          props.product.images.length > 0 &&
          [...props.product.images, ...props.newImages]
            .filter((item) => !props.imagesToDelete.includes(item))
            .map((image) => (
              <div key={image.id}>
                <li className="relative w-36 h-36">
                  <Image
                    src={image.url}
                    alt={image.alt ?? ""}
                    fill
                    className="object-cover w-36 h-36"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      props.setImagesToDelete((prev) => [...prev, image]);
                    }}
                    className="relative -top-4 ml-28 bg-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                </li>
              </div>
            ))}
        <div className="border-border border-2 rounded-md border-dashed w-36 h-36">
          <p className="items-center justify-center flex relative top-[50px] flex-col text-sm">
            <span className="font-semibold mr-1">Click to upload</span>
            <span>or drag and drop.</span>
          </p>
          <input
            id="product-images"
            className="relative z-10 h-[100px] border-2 opacity-0 w-full"
            {...getInputProps()}
            style={{ display: "block" }}
          />
        </div>
      </div>
      {files.length > 0 && (
        <div className="mt-4">
          {files.map((file, i) => (
            <li key={i}>
              {file.file.name} - {file.file.size} bytes
              {/* <Button
                type="button"
                variant="link"
                onClick={() => {
                  files.splice(i, 1);
                  // re-render not working
                }}
              >
                Remove
              </Button> */}
            </li>
          ))}
          <Button
            disabled={isUploading}
            className="mt-2"
            onClick={() => {
              setIsUploading(true);
              const res = startUpload();
              res.then((data) => {
                props.setNewImages(
                  data.map((item) => {
                    return {
                      url: item.fileUrl,
                      alt: item.fileKey.split("_")[1],
                      id: item.fileKey,
                    };
                  })
                );
                setIsUploading(false);
              });
            }}
            type="button"
          >
            {`${isUploading ? "Uploading" : "Upload"} ${files.length} file${
              files.length > 1 ? "s" : ""
            }${isUploading ? "..." : ""}`}
          </Button>
        </div>
      )}
    </div>
  );
}
