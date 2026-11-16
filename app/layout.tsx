import type { Metadata, Viewport } from "next";
import { Raleway, Inconsolata } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar-Block/Navbar-New";
import PageLoader from "@/components/MeenoLoader/Loader";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thisismeeno.com"),
  title: {
    default: "Web Design & Development | [meeno]",
    template: "%s | Mobeen",
  },
  description:
    "Solo design engineer. I design, hand-code and launch custom websites, e-commerce stores and web apps with Next.js, React and Supabase, working with you one-on-one.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  authors: [{ name: "Mobeen", url: "https://x.com/Thisismeeno" }],
  creator: "Mobeen (@Thisismeeno)",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thisismeeno.com",
    siteName: "this is meeno",
    title: "Mobeen | Design Engineer, Design ↝ Dev",
    description:
      "One person for the whole build: design, code, motion and launch. Custom Next.js websites and web apps.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "this is meeno" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobeen | Design ↝ Dev",
    description:
      "One person for the whole build: design, code, motion and launch.",
    site: "@Thisismeeno",
    creator: "@Thisismeeno",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ededed",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://thisismeeno.com/#person",
      name: "Mobeen",
      alternateName: ["meeno", "Thisismeeno"],
      url: "https://thisismeeno.com",
      sameAs: ["https://x.com/Thisismeeno"],
      jobTitle: "Design Engineer",
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Supabase",
        "PostgreSQL",
        "Web design",
        "Brand identity",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://thisismeeno.com/#studio",
      name: "this is meeno",
      url: "https://thisismeeno.com",
      founder: { "@id": "https://thisismeeno.com/#person" },
      serviceType: ["Web design", "Web development", "E-commerce", "Brand identity"],
      description:
        "Solo design engineer. I design, hand-code and launch custom websites, e-commerce stores and web apps, working with you one-on-one.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${raleway.variable} ${inconsolata.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("meeno-loader"))document.documentElement.dataset.loader="seen"}catch(e){}`,
          }}
        />
      </head>
      <body>
        <PageLoader />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {/* <Navbar /> */}
        {children}
      </body>
    </html>
  );
}
 