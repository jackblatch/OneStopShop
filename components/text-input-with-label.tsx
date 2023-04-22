"use client";

import { Input } from "./ui/input";
import { Label } from "./ui/label";

// @TODO: WIP - issue with setValue not being serializable in use client file

export const TextInputWithLabel = ({
  label,
  id,
  name,
  value,
  setValue,
}: {
  label: string;
  id: string;
  name: string;
  value: Record<string, unknown>;
  setValue: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}) => {
  return (
    <div>
      <Label>{label}</Label>
      <Input />
    </div>
  );
};
