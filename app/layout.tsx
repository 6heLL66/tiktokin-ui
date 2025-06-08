import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TikTokIn - Web3 TikTok Platform",
  description: "Decentralized TikTok platform on Solana blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background-light`}>
        <Providers>
          <div className="flex">
            <Sidebar />
            <div className="flex-1 lg:ml-72">
              <Header />
              <main className="mt-16">
                {children}
              </main>
            </div>
          </div>
        </Providers>

        <Script async src="https://www.tiktok.com/embed.js" />
      </body>
    </html>
  );
}
