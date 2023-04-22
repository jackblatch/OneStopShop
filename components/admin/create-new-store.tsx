import { Button } from "../ui/button";
import { Heading } from "../ui/heading";
import { Input } from "../ui/input";

export const CreateNewStore = () => {
  return (
    <div className="bg-gray-50 rounded-md p-6 flex flex-col gap-4">
      <div>
        <Heading size="h3">
          Create your store to view your selling profile
        </Heading>
        <p>Enter your store name and click create to get started.</p>
      </div>
      <Input />
      <div className="w-fit">
        <Button>Create</Button>
      </div>
    </div>
  );
};
