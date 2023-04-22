"use client";

import { Store } from "@/db/schema";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";

export const EditStoreFields = ({ storeDetails }: { storeDetails: Store }) => {
  const [formValues, setFormValues] = useState({ ...storeDetails });
  console.log(storeDetails);

  // use text with input label component

  return (
    <div>
      <div>
        <Label>Description</Label>
        <Input />
      </div>
    </div>
  );
};
