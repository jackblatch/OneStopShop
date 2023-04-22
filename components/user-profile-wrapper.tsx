"use client";

import { UserButton } from "@clerk/nextjs";
import { Text } from "./ui/text";

export const UserProfileWrapper = () => {
  return (
    <div className="px-6 py-6 rounded-md bg-secondary flex items-start flex-col border border-border">
      <p className="font-medium">Manage Account</p>
      <p className="text-sm text-muted-foreground">
        Click on your profile to manage your account.
      </p>
      <div className="mt-4">
        <UserButton />
      </div>
    </div>
  );
};
