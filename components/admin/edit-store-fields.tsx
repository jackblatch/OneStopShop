"use client";

import { Store } from "@/db/schema";
import { useState } from "react";
import { TextInputWithLabel } from "../text-input-with-label";
import { Button } from "../ui/button";
import { apiRoutes } from "@/lib/routes";
import { toast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";
import { type updateStore } from "@/server-actions/store";

export const EditStoreFields = (props: {
  storeDetails: Store;
  updateStore: typeof updateStore;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string | null>>({
    name: props.storeDetails.name,
    industry: props.storeDetails.industry,
    description: props.storeDetails.description,
  });

  const handleUpdateDetails = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    props
      .updateStore({
        name: formValues.name,
        industry: formValues.industry,
        description: formValues.description,
      })
      .then((res) => {
        setIsLoading(false);
        toast({
          title: res.message,
          description: res.action,
        });
      });
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleUpdateDetails}>
      <div className="grid grid-cols-2 gap-8 items-start">
        <div className="flex flex-col justify-between h-full">
          <TextInputWithLabel
            required
            type="text"
            label="Store Name"
            id="name"
            state={formValues}
            setState={setFormValues}
          />
          <TextInputWithLabel
            type="text"
            label="Industry"
            id="industry"
            state={formValues}
            setState={setFormValues}
          />
        </div>
        <TextInputWithLabel
          type="text"
          inputType="textarea"
          label="Store Description"
          id="description"
          state={formValues}
          setState={setFormValues}
          rows="5"
        />
      </div>
      <div className="flex items-center justify-end">
        <Button className="flex gap-2" disabled={isLoading}>
          {!!isLoading && <Loader2 size={18} className="animate-spin" />}
          Save
        </Button>
      </div>
    </form>
  );
};
