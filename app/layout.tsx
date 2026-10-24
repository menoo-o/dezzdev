import type { Metadata } from "next";
import localFont from "next/font/local";
import { Hanken_Grotesk } from "next/font/google";
import NavbarNew from "../components/Navbar-Block/Navbar-New";
import NavOverlay from "../components/Nav-Overlay/NavOverlay";
import ContactOverlay from "../components/ContactOverlay/Contact-form";
import Script from "next/script";
import "./globals.css";
import { ParallaxFooter } from "@/components/footer-block/footer";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

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
      className={`${ppFormula.variable} ${radioGrotesk.variable} ${hankenGrotesk.variable}`}
    >
      <body>
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
        <ParallaxFooter />
      </body>
    </html>
  );
}