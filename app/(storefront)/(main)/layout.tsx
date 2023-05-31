import { NavBar } from "@/components/navbar";
import "../../../styles/globals.css";
import { Footer } from "@/components/footer";
import React from "react";

export const metadata = {
  title: "OneStopShop - Online marketplace",
  description: "Online marketplace",
};

export default async function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <NavBar showSecondAnnouncementBar={true} />
      <div className="h-full flex-1 mb-8">{children}</div>
      <Footer />
    </div>
  );
}
