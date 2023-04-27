"use client";
import { useState } from "react";
import MobileMenuSlideOut from "./mobile-menu-slideout";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

export const MobileNavigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen((prev) => !prev)}>
        <Menu />
      </Button>
      <MobileMenuSlideOut open={open} setOpen={setOpen} />
    </>
  );
};
