import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ResponsiveNav } from "./navigation/ResponsiveNav/ResponsiveNav";
import { menuItemsArray } from "./navigation/ResponsiveNav/ResponsiveNav.type";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeStone",
  description: "CodeStone: Showcasing the innovative web solutions and full stack expertise of Adrian Perdomo. Explore a curated collection of projects demonstrating proficiency in both front-end and back-end development, from responsive designs to robust server-side applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ResponsiveNav menuItemsArray={menuItemsArray} />
      {children}</body>
    </html>
  );
}
