import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Topik EZ - Learn Korean",
  description: "Master the TOPIK exam with gamified learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Sidebar />
        <main className="lg:pl-[256px] min-h-screen pb-24 lg:pb-0">
          <div className="max-w-[1024px] mx-auto px-4 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
