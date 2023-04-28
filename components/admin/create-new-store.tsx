"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Heading } from "../ui/heading";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { apiRoutes } from "@/lib/routes";
import { createStore } from "@/lib/apiTypes";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

// type DataFetchStatus<T extends {formStateStatus: string}> = T["formStateStatus"] extends "error" ? T & createStore["output"] : {formStateStatus: "idle" | "loading"};
// @TODO: something similar to type above should be used for formState type to ensure createStore["output"] is present when formSTateStatus is "error"

export const CreateNewStore = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [storeName, setStoreName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const req: createStore["input"] = { formData: { storeName } };
    (async function getData() {
      const res = await fetch(apiRoutes.store, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      const data: createStore["output"] = await res.json();
      setIsLoading(false);
      if (!data.error) {
        setStoreName("");
        router.refresh();
      }
      toast({
        title: data.message,
        description: data.action,
      });
    })();
  };

  return (
    <div className="grid grid-cols-2 gap-12">
      <form className="flex flex-col gap-6 col-span-1" onSubmit={handleSubmit}>
        <div>
          <Heading size="h3">Create your store</Heading>
          <p className="mt-2">
            Enter the name of your store below and press create.
          </p>
        </div>
        <div>
          <Label htmlFor="store-name">Store Name</Label>
          <Input
            className="mt-2"
            id="store-name"
            name="store-name"
            placeholder="e.g. Tim's Toys"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
        </div>
        <div className="w-fit">
          <Button type="submit" disabled={isLoading}>
            Create
          </Button>
        </div>
      </form>
      <div className="col-span-1">
        <Heading size="h3">Why sell on One Stop Shop?</Heading>
        <p className="mt-2">
          Thousands of visitors visit this site every day, searching for a whole
          range of products. Get the exposure your products deserve by creating
          a store.
        </p>
        <ul className="list-disc ml-6 mt-8 flex flex-col gap-2">
          <li>Thousands of visitors every day</li>
          <li>No monthly fees</li>
          <li>24/7 customer support</li>
        </ul>
      </div>
    </div>
  );
};
