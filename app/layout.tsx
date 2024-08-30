import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavLogo from "@/components/NavLogo";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZIRRAH",
  description: "ZIRRAH, A complete MEdical Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavLogo />
        {children}
        <Footer />
      </body>
    </html>
  );
}
