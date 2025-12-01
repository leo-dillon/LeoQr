import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LDillon - QR",
  description: "Dentro de está página podrás generar QR's de tus páginas favoritas. También si te registrar podrás acceder a las estadísticas de tus QR ",
};

export default function RootLayout({
    children,
  }: Readonly<{ children: React.ReactNode; }>) 
{
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/faviconLDillon.ico"/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col justify-between`}
      >
        <Header />
        <div className="grow flex justify-center items-center">
          { children }
        </div>
        <Footer />
      </body>
    </html>
  );
}
