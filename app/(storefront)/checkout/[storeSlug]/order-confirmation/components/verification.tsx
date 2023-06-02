"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Verification = () => {
  const [postcode, setPostcode] = useState("");
  const router = useRouter();

  return (
    <form
      className="flex flex-col gap-2 md:w-1/2 bg-secondary border border-border rounded-md p-4"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(
          window.location.href.split("&delivery_postal_code=")[0] +
            "&delivery_postal_code=" +
            postcode.split(" ").join("")
        );
      }}
    >
      <p>Enter delivery postcode</p>
      <div className="md:grid flex flex-col grid-cols-12 gap-4">
        <Input
          className="md:col-span-8"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
        <Button className="md:col-span-4" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};
