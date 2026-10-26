import type { Metadata } from "next";
import localFont from "next/font/local";
// import { Hanken_Grotesk } from "next/font/google";

import NavbarNew from "../components/Navbar-Block/Navbar-New";
// import NavOverlay from "../components/Nav-Overlay/NavOverlay";
// import ContactOverlay from "../components/ContactOverlay/Contact-form";
import ContactOverlay from "../components/Floating-Button/ContactForm";
import "./globals.css";
import { ParallaxFooter } from "@/components/footer-block/footer";
import FloatingBtn from "@/components/Floating-Button/FloatingBtn";

const ppFormula = localFont({
  src: [
    {
      path: "../public/fonts/PPFormula-NarrowRegular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/PPFormula-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/PPFormula-ExtendedBold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-main",
  display: "swap",
});

const radioGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/RadioGrotesk-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DezzDev",
  description: "Web Design & Development Studio for Small Businesses and Startups",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ppFormula.variable} ${radioGrotesk.variable}`}
    >
      <body>
     

        <NavbarNew />
        {/* <NavOverlay /> */}
        {/* <ContactOverlay /> */}

        {children}
        <ContactOverlay />
        <FloatingBtn />
        <ParallaxFooter />
      </body>
    </html>
  );
}