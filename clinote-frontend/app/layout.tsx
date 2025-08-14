import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation"; // ✅ Import Navigation

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CliNote - AI Medical Scribe",
  description: "Professional AI-powered medical documentation platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50`}>
        <div className="pt-16 flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
