import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "سامانه مدیریت کارها",
  description: "سامانه مدیریت کارها",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
