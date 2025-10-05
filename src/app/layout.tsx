import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matheus preparou um presente especial...",
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
        <div className="desktop-container">
          {children}
        </div>
      </body>
    </html>
  );
}
