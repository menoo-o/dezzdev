'use'

import type { Metadata } from "next";
import "./globals.css";
//import Navbar from "@/components/Mini-Nav/Navbar";
import NavbarNew from "@/components/New-Navbar/Navbar-New";
import ContactOverlay from "@/components/Contact-form/Contact";


export const metadata: Metadata = {
  title: "DezzDev",
  description: "Generated DezzDev with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavbarNew />
        <ContactOverlay /> {/* Always mounted, but conditionally rendered */}
        {children}
   
      </body>
    </html>
  );
}
