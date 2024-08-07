import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/navigation/NavBar";

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
      <NavBar />
      {children}</body>
    </html>
  );
}
