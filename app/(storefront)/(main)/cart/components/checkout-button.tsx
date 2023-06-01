"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { routes } from "@/lib/routes";
import { getStoreSlug } from "@/server-actions/store-details";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const CheckoutButton = (props: { storeId: number }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <Button
      size="sm"
      className="ml-auto flex items-center gap-2 justify-center"
      onClick={() => {
        setIsLoading(true);
        getStoreSlug(props.storeId)
          .then((slug) => {
            router.push(`${routes.checkout}/${slug}`);
          })
          .catch(() => {
            toast({
              title: "Sorry, an error occurred.",
              description: "Something went wrong. Please try again later.",
            });
          })
          .finally(() => setIsLoading(false));
      }}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Lock size={16} />
      )}
      <p>Checkout</p>
    </Button>
  );
};
