import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/context/cart-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nova Market — Premium Online Retail Experience",
  description:
    "Shop premium tech, home, lifestyle, and wellness essentials with fast delivery and tailored recommendations at Nova Market.",
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
        <CartProvider>
          <div className="flex min-h-screen flex-col bg-slate-50/60">
            <Suspense fallback={<div className="h-32" />}>
              <Header />
            </Suspense>
            <main className="flex-1">
              <div className="mx-auto w-full max-w-7xl px-4 py-10">{children}</div>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
