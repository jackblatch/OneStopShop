import "../styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import React from "react";
import { Toaster } from "@/components/ui/Toaster";

export const metadata = {
  title: "OneStopShop - Online marketplace",
  description: "Online marketplace",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <script
            defer
            data-domain="onestopshop.jackblatch.com"
            src="https://plausible.io/js/script.js"
          ></script>
        </head>
        <body>
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
