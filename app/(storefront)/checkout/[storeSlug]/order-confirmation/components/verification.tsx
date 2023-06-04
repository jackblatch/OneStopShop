"use client";

import { TextInputWithLabel } from "@/components/text-input-with-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Verification = () => {
  const [formValues, setFormValues] = useState({
    postcode: "",
  });
  const router = useRouter();

  return (
    <form
      className="flex flex-col gap-2 md:w-1/2 bg-secondary border border-border rounded-md p-4"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(
          window.location.href.split("&delivery_postal_code=")[0] +
            "&delivery_postal_code=" +
            formValues.postcode.split(" ").join("")
        );
      }}
    >
      <div className="md:grid flex flex-col grid-cols-12 gap-4">
        <div className="md:col-span-8">
          <TextInputWithLabel
            label="Enter delivery postcode"
            id="postcode"
            type="text"
            state={formValues}
            setState={setFormValues}
          />
        </div>
        <div className="flex w-full items-end md:col-span-4">
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};
