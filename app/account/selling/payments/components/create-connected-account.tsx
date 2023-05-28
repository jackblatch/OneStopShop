"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Loader2, Lock } from "lucide-react";
import { useState } from "react";

export const CreateConnectedAccount = (props: {
  createAccountLink: () => Promise<string | undefined>;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form>
      <Button
        disabled={isLoading}
        size="sm"
        className="flex gap-2"
        onClick={() => {
          setIsLoading(true);
          props
            .createAccountLink()
            .then((url) => {
              if (url === undefined) {
                throw new Error("No url returned from Stripe");
              }
              window.location.href = url;
              setIsLoading(false);
            })
            .catch((err) => {
              setIsLoading(false);
              console.log("Error occured creating Stripe connect account", err);
              toast({
                title: "Sorry, an error occurred",
                description:
                  "An error occured creating your Stripe connect account. Please try again later.",
              });
            });
        }}
      >
        {isLoading ? <Loader2 className="animate-spin" /> : <Lock size={16} />}
        <span>Connect with Stripe</span>
      </Button>
    </form>
  );
};
