import { ContentWrapper } from "@/components/content-wrapper";
import { Footer } from "@/components/footer";
import { NavBar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { Heading } from "@/components/ui/heading";
import { PropsWithChildren } from "react";

const menuItems = [
  {
    name: "Selling",
    href: "/",
    heading: true,
  },
  {
    name: "Selling profile",
    href: "/",
    heading: false,
  },
  {
    name: "Products",
    href: "/",
    heading: false,
  },
  {
    name: "Orders",
    href: "/",
    heading: false,
  },
  {
    name: "Buying",
    href: "/",
    heading: true,
  },
  {
    name: "Your purchases",
    href: "/",
    heading: false,
  },
  {
    name: "Account",
    href: "/",
    heading: true,
  },
  {
    name: "Manage account",
    href: "/",
    heading: false,
  },
];

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <>
      <NavBar />
      <ContentWrapper>
        <div className="my-16">
          <Heading size="h3">Admin Dashboard</Heading>
          <div className="grid grid-cols-9 gap-8">
            <div className="col-span-2">
              <Sidebar menuItems={menuItems} />
            </div>
            <div>{children}</div>
          </div>
        </div>
      </ContentWrapper>
      <Footer />
    </>
  );
}
