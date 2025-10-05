import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Feliz 3 anos!",
  description: "Celebrating three beautiful years together and our engagement",
  themeColor: "#000000",
  openGraph: {
    title: "Feliz 3 anos!",
    description: "Um presente especial para celebrar nossa história",
    type: "website",
    images: [
      {
        url: "/images/image.jpg",
        width: 1200,
        height: 630,
        alt: "Capa do presente",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Feliz 3 anos!",
    description: "Um presente especial para celebrar nossa história",
    images: ["/images/image.jpg"],
  },
};

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased font-sans ${geistSans.variable} ${geistMono.variable}`}>
        <div className="desktop-container">
          {children}
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
