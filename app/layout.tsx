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
        <footer className="mt-16 border-t border-slatey-200 dark:border-slatey-700 bg-wood-50/30 dark:bg-slatey-800/30">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <div>
                © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_SITE_NAME || "SathTheBuilder"}. All rights reserved.
              </div>
              <div className="text-center md:text-right text-slatey-600 dark:text-slatey-300">
                <p className="mb-1">Like this website?</p>
                <p>
                  Contact <strong className="text-wood-600 dark:text-wood-400">Arman Randhawa</strong> at{" "}
                  <a
                    href="mailto:arman.randhawa98@gmail.com"
                    className="text-wood-600 hover:text-wood-700 dark:text-wood-400 dark:hover:text-wood-300 underline font-medium"
                  >
                    arman.randhawa98@gmail.com
                  </a>
                  <br />
                  for web development inquiries
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
