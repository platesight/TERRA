import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import StickyReserveCTA from "@/components/ui/StickyReserveCTA";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TERRA — Plates & Pour",
  description: "Ch. Sambhaji nagar's curated evening. Plates, Pour, and Vibe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="bg-terra-charcoal text-white overflow-x-hidden">
        {children}
        <StickyReserveCTA />
      </body>
    </html>
  );
}
