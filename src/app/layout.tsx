import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommandSearch from "@/components/CommandSearch";
import ParticleBackground from "@/components/ParticleBackground";

export const metadata: Metadata = {
  title: { default: "ALL IN ONE TOOLS ZanzzXit — Everything You Need. One Powerful Toolkit.", template: "%s | ZanzzXit Tools" },
  description: "Kumpulan tools online cepat dan praktis dalam satu platform.",
  openGraph: { title: "ALL IN ONE TOOLS ZanzzXit", description: "One platform. Hundreds of useful tools.", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark">
      <body className="min-h-screen antialiased" style={{ background: "transparent" }}>
        <ParticleBackground />
        <div className="relative z-10">
          <Navbar />
          <main className="mx-auto min-h-[calc(100vh-64px)] w-full max-w-[1400px] px-4 pb-16 pt-6 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </div>
        <CommandSearch />
      </body>
    </html>
  );
}
