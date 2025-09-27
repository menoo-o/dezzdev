
import type { Metadata } from "next";
import "./globals.css";

import NavbarNew from "@/components/Navbar-Block/Navbar-New";
import NavOverlay from "@/components/Nav-Overlay/NavOverlay";
import ContactOverlay from "@/components/ContactOverlay/Contact-form";
import Script from "next/script";

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
         {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-Y85V7NCFVQ`}
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y85V7NCFVQ', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <NavbarNew />
        <NavOverlay />
        <ContactOverlay />
      
        {children}
   
      </body>
    </html>
  );
}
