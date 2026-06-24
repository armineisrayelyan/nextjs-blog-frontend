import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { createRootMetadata, getSiteMetadata } from "@/lib/metadata";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export async function generateMetadata(): Promise<Metadata> {
  return createRootMetadata();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { siteName, siteDescription } = await getSiteMetadata();

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-stone-50 font-sans text-stone-900 antialiased">
        <Header siteName={siteName} />
        <main className="flex-1">{children}</main>
        <Footer siteName={siteName} siteDescription={siteDescription} />
      </body>
    </html>
  );
}
