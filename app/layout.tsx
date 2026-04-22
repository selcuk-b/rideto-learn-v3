import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const rift = localFont({
  src: "./fonts/RiftBold.otf",
  variable: "--font-heading",
  weight: "700",
  display: "swap",
});

const proximaNova = localFont({
  src: [
    { path: "./fonts/ProximaNova-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ProximaNova-Bold.woff2",    weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RideTo Learn",
  description: "Motorcycle CBT preparation course — everything you need before your training day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rift.variable} ${proximaNova.variable} antialiased flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
