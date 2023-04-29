"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import Link from "next/link";

export type MenuItems = { name: string; href: string; group: Groups }[];
type Groups = "buying" | "selling";

export const SecondaryMenu = (props: { menuItems: MenuItems }) => {
  return (
    <Tabs
      defaultValue="selling"
      className="flex items-center justify-start gap-2"
    >
      <TabsList>
        <TabsTrigger value="selling">Selling</TabsTrigger>
        <TabsTrigger value="buying">Buying</TabsTrigger>
      </TabsList>
      <TabsContent
        value="selling"
        className="overflow-auto flex justify-start items-center flex-nowrap"
      >
        {menuNames(props.menuItems, "selling")}
      </TabsContent>
      <TabsContent
        value="buying"
        className="overflow-auto flex justify-start items-center flex-nowrap"
      >
        {menuNames(props.menuItems, "buying")}
      </TabsContent>
    </Tabs>
  );
};

const menuNames = (menuItems: MenuItems, group: Groups) => {
  return menuItems
    .filter((item) => item.group === group)
    .map((item, i) => (
      <Link href={item.href} key={i}>
        <Button variant="link" className="mb-1">
          {item.name}
        </Button>
      </Link>
    ));
};
