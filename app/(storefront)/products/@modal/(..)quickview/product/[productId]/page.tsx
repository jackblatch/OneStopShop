import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { ParagraphFormatter } from "@/components/paragraph-formatter";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { db } from "@/db/db";
import { Product, products } from "@/db/schema";
import { currencyFormatter } from "@/lib/currency";
import { eq } from "drizzle-orm";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { QuickViewModalWrapper } from "@/components/storefront/quickview-modal-wrapper";
import Link from "next/link";
import { routes } from "@/lib/routes";

export default async function StorefrontProductQuickView(props: {
  params: { productId: string };
}) {
  const product = (await db
    .select()
    .from(products)
    .where(eq(products.id, Number(props.params.productId)))
    .then((res) => {
      if (res.length === 0) throw new Error("Product not found");
      return res[0];
    })
    .catch(() => {
      throw new Error("Product not found");
    })) as Omit<Product, "images"> & {
    images: { id: string; url: string; alt: string }[];
  };

  return (
    <QuickViewModalWrapper>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center md:items-start justify-start md:grid md:grid-cols-9 gap-8">
          <div className="col-span-4 w-full">
            {product.images.length > 0 ? (
              <>
                <div className="relative h-48 w-full">
                  <Image
                    src={product.images[0].url}
                    alt={product.images[0].alt}
                    fill
                    className="object-cover h-48 w-full"
                  />
                </div>
                <div className="flex items-center justify-start gap-2 mt-2 overflow-auto flex-nowrap">
                  {product.images.slice(1).map((image) => (
                    <div key={image.id} className="relative h-24 w-24">
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover h-24 w-24"
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-96 w-full bg-secondary flex justify-center items-center">
                <ImageOff />
              </div>
            )}
          </div>
          <div className="md:col-span-5 w-full flex flex-col gap-2">
            <Heading size="h3">{product.name}</Heading>
            <Text className="text-lg">
              {currencyFormatter(Number(product.price))}
            </Text>
            <div className="my-2 flex items-start flex-col gap-2 justify-center">
              <Link href={`${routes.product}/${props.params.productId}`}>
                <Button variant="default" className="w-fit" size="sm">
                  View Product
                </Button>
              </Link>
              {!product.inventory && (
                <Text appearance="secondary">Sold out</Text>
              )}
            </div>
            <ParagraphFormatter
              className="text-sm"
              paragraphs={product.description}
            />
          </div>
        </div>
      </div>
    </QuickViewModalWrapper>
  );
}
