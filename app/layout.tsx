import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TS-Stocks",
  description: "Track all the real-time stock prices and get personalised results.",
};

/**
 * Root layout component that renders the application's HTML document and body with configured fonts.
 *
 * @param children - The React nodes to render inside the document body.
 * @returns The root HTML element containing a body with the Geist fonts and `antialiased` class applied.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}