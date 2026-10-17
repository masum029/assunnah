import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "মাদরাসাতুস সুন্নাহ",
  description: "ইলম, আমল ও তারবিয়াহর মাধ্যমে সচেতন ও সময়োপযোগী প্রজন্ম গড়ে তোলার প্রচেষ্টা।"
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
