import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JudgeTourModal } from "@/components/JudgeTourModal";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "BazaarMind | AI Demand-to-Sale Network for Indian Agriculture",
  description:
    "Don't just know the market. Know where your harvest belongs. SENSE → DECIDE → MATCH → EXECUTE → LEARN. Built for Google's Fund My Crazy 2.0 with Gemini.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900`}>
        <AppProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <JudgeTourModal />
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
