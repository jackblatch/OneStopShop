import { Store } from "@/db/schema";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

// @TODO: WIP - issue with setValue not being serializable in use client file

export const TextInputWithLabel = ({
  label,
  id,
  state,
  setState,
  ...delegated
}: {
  label: string;
  id: string;
  state: Record<string, string>;
  setState: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  delegated?: Record<string, unknown>;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        name={id}
        id={id}
        value={state[id]}
        onChange={(e) =>
          setState((prev) => ({ ...prev, [id]: e.target.value }))
        }
      />
    </div>
  );
};
