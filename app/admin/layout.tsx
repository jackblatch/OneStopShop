import { UserProfileWrapper } from "@/components/user-profile-wrapper";
import { ContentWrapper } from "@/components/content-wrapper";
import { Footer } from "@/components/footer";
import { NavBar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { Heading } from "@/components/ui/heading";
import { PropsWithChildren } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs/app-beta";
import SignInWrapper from "@/components/sign-in";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <NavBar />
      <ContentWrapper>
        <SignedIn>
          <div className="my-12">
            <Heading size="h3">Admin Dashboard</Heading>
            <div className="grid grid-cols-9 gap-8 mt-6">
              <div className="col-span-2 flex flex-col gap-6">
                <Sidebar menuItems={menuItems} />
                <UserProfileWrapper />
              </div>
              <main className="h-full flex-1">{children}</main>
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <SignInWrapper />
        </SignedOut>
      </ContentWrapper>
      <Footer />
    </div>
  );
}

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
];
