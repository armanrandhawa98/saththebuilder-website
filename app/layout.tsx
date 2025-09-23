import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "SathTheBuilder | Custom Woodworking",
  description: "Showcasing handcrafted woodworking and custom builds.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.className} antialiased text-slatey-700 dark:text-slatey-200`}>
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 sm:px-8 pt-10 pb-20">{children}</main>
        <footer className="mt-16 border-t border-slatey-200 dark:border-slatey-700">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 py-8 text-sm">
            © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_SITE_NAME || "SathTheBuilder"}. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
