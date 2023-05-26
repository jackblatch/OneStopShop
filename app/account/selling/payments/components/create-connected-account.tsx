"use client";

import { Button } from "@/components/ui/button";
import { createConnectedAccount } from "@/server-actions/stripe";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export const CreateConnectedAccount = () => {
  const router = useRouter();
  return (
    <Button
      size="sm"
      className="flex gap-2"
      onClick={async () => {
        const url = (await createConnectedAccount()) as unknown as string;
        router.push(url);
      }}
    >
      <Lock size={16} />
      <span>Connect with Stripe</span>
    </Button>
  );
};
