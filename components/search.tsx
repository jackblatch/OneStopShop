import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const Search = () => {
  return (
    <div className="flex items-center justify-between gap-2">
      <Input placeholder="Search..." />
      <Button>
        <SearchIcon size={20} />
      </Button>
    </div>
  );
};
