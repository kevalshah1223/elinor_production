import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import StructuredData from "@/components/seo/StructuredData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Elinor Production - Professional Photography & Videography",
  description: "Capturing Moments, Creating Stories. Professional photography and videography services for weddings, pre-weddings, fashion, and events.",
  keywords: "photography, videography, wedding photography, pre-wedding, fashion photography, event photography, Elinor Production",
  authors: [{ name: "Elinor Production" }],
  creator: "Elinor Production",
  publisher: "Elinor Production",
  icons: {
    icon: "/ep_black.png",
    shortcut: "/ep_black.png",
    apple: "/ep_black.png",
  },
  openGraph: {
    title: "Elinor Production - Professional Photography & Videography",
    description: "Capturing Moments, Creating Stories. Professional photography and videography services.",
    url: "https://elinorproduction.com",
    siteName: "Elinor Production",
    type: "website",
    images: [
      {
        url: "/ep_grey.jpg",
        width: 1200,
        height: 630,
        alt: "Elinor Production Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elinor Production - Professional Photography & Videography",
    description: "Capturing Moments, Creating Stories. Professional photography and videography services.",
    images: ["/ep_grey.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased bg-black text-white font-sans`}
      >
        <StructuredData type="localBusiness" />
        <Navigation />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
