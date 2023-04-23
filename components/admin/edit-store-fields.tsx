"use client";

import { Store } from "@/db/schema";
import { useState } from "react";
import { TextInputWithLabel } from "../text-input-with-label";
import { Button } from "../ui/button";

export const EditStoreFields = ({ storeDetails }: { storeDetails: Store }) => {
  const [formValues, setFormValues] = useState<Record<string, string>>(() => {
    const newStoreDetails: Record<string, unknown> = { ...storeDetails };
    Object.entries(newStoreDetails).forEach((item) => {
      if (item[1] === null) newStoreDetails[item[0]] = "";
      newStoreDetails[item[0]] = item[1] && item[1].toString();
    });
    return { ...newStoreDetails } as unknown as Record<string, string>;
  });

  return (
    <div className="flex flex-col gap-6">
      <TextInputWithLabel
        label="Store Name"
        id="name"
        state={formValues}
        setState={setFormValues}
      />
      <TextInputWithLabel
        label="Store Description"
        id="description"
        state={formValues}
        setState={setFormValues}
      />
      <TextInputWithLabel
        label="Industry"
        id="industry"
        state={formValues}
        setState={setFormValues}
      />
      <div className="flex items-center justify-end">
        <Button>Save</Button>
      </div>
    </div>
  );
};
