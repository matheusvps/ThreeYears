import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Three Years Together ❤️",
  description: "Celebrating three beautiful years together and our engagement",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
