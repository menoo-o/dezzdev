import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Mini-Nav/Navbar";
//import Footer from "@/components/Footer-block/Footer";


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
        <Navbar />
        {children}

      </body>
    </html>
  );
}
