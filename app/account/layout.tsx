import { UserProfileWrapper } from "@/components/user-profile-wrapper";
import { ContentWrapper } from "@/components/content-wrapper";
import { Footer } from "@/components/footer";
import { NavBar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { Heading } from "@/components/ui/heading";
import { PropsWithChildren } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs/app-beta";
import SignInWrapper from "@/components/sign-in";
import { singleLevelNestedRoutes } from "@/lib/routes";

export default async function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <NavBar showSecondAnnouncementBar={false} />
      <ContentWrapper>
        <SignedIn>
          <div>
            <Heading size="h3">Your Account</Heading>
            <div className="grid grid-cols-9 gap-8 mt-6">
              <div className="col-span-2 flex flex-col gap-6">
                <Sidebar menuItems={menuItems} />
                <UserProfileWrapper />
              </div>
              <div className="h-full flex-1 w-full col-span-7 border border-border rounded-md bg-secondary p-6">
                {children}
              </div>
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
    name: "Profile",
    href: singleLevelNestedRoutes.account.profile,
    heading: false,
  },
  {
    name: "Products",
    href: singleLevelNestedRoutes.account.products,
    heading: false,
  },
  {
    name: "Orders",
    href: singleLevelNestedRoutes.account.orders,
    heading: false,
  },
  {
    name: "Buying",
    href: "/",
    heading: true,
  },
  {
    name: "Your purchases",
    href: singleLevelNestedRoutes.account["your-purchases"],
    heading: false,
  },
];
