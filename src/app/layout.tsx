import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "আল-হাইসাম ইন্টারন্যাশনাল একাডেমি",
  description: "আদর্শ মানুষ গড়ার প্রত্যয়ে আমাদের পথচলা"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
