"use client";
import { useDropzone } from "react-dropzone";
import type { FileWithPath } from "react-dropzone";

import { useUploadThing } from "@/lib/uploadthing-generate-react-helpers";
import { useCallback, useState } from "react";
import { Product } from "@/db/schema";
import { ProductImages } from "@/lib/types";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

export function ProductImageUploader(props: {
  product: Omit<Product, "images"> & { images: ProductImages[] };
  newImages: ProductImages[];
  setNewImages: React.Dispatch<React.SetStateAction<ProductImages[]>>;
  imagesToDelete: ProductImages[];
  setImagesToDelete: React.Dispatch<React.SetStateAction<ProductImages[]>>;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(["image"]),
  });

  const { startUpload, isUploading, permittedFileInfo } = useUploadThing({
    endpoint: "imageUploader", // replace this with an actual endpoint name
    onClientUploadComplete: (data) => {
      setFiles([]);
      if (!data) return;
      props.setNewImages(
        data.map((item) => {
          return {
            url: item.fileUrl,
            alt: item.fileKey.split("_")[1],
            id: item.fileKey,
          };
        })
      );
    },
    onUploadError: () => {
      toast({
        title: "Sorry, an error occured while uploading your image(s).",
      });
    },
  });

  return (
    <div>
      <Label htmlFor="product-images">Images</Label>
      <div className="mt-2 border border-border p-4 rounded-md flex items-center justify-start gap-2 flex-wrap">
        {[...props.product.images, ...props.newImages]
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
        <div
          {...getRootProps()}
          className="border-border border-2 rounded-md border-dashed w-36 h-36"
        >
          <p className="items-center justify-center flex relative top-[50px] flex-col text-sm">
            <span className="font-semibold mr-1">Click to upload</span>
            <span>or drag and drop.</span>
            <span className="text-xs text-muted-foreground">
              (Max {permittedFileInfo?.config.image?.maxFileSize})
            </span>
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
              {file.name} - {file.size} bytes
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
            onClick={() => startUpload(files)}
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
