import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";
import Image from "next/image";

export const ProductImage = (props: {
  src: string;
  alt: string;
  sizes?: string;
  imageClassName?: string;
  wrapperClassName?: string;
  height: `h-${string}`;
  width: `w-${string}`;
}) => {
  return (
    <>
      {props.src ? (
        <div
          className={cn(
            "relative",
            props.height,
            props.width,
            props.wrapperClassName
          )}
        >
          <Image
            src={props.src}
            alt={props.alt}
            fill
            sizes={props.sizes}
            className={cn(
              "object-cover",
              props.imageClassName,
              props.height,
              props.width
            )}
          />
        </div>
      ) : (
        <div
          className={cn(
            "bg-secondary flex justify-center items-center",
            props.height,
            props.width
          )}
        >
          <ImageOff />
        </div>
      )}
    </>
  );
};
