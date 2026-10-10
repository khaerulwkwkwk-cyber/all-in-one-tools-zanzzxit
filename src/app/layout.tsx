import type { Metadata } from "next";
import "./globals.css";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import CommandSearch from "@/components/CommandSearch";
import ParticleBackground from "@/components/ParticleBackground";
import AppShell from "@/components/AppShell";
import Watermark from "@/components/Watermark";
import { ToastContainer } from "@/components/Toast";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://all-in-one-tools-zanzzxit.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TOOLS ALL IN ONE (BETA) — Everything You Need. One Powerful Toolkit.",
    template: "%s | TOOLS ALL IN ONE",
  },
  description:
    "TOOLS ALL IN ONE (BETA) — kumpulan tools online cepat dan praktis dalam satu platform. Downloader, developer, image, text, dan utilities — semua gratis.",
  keywords: [
    "tools online",
    "all in one tools",
    "tools all in one",
    "zann.id",
    "downloader",
    "developer tools",
    "json formatter",
    "qr generator",
    "password generator",
  ],
  authors: [{ name: "zann.id", url: "https://zann.id" }],
  creator: "zann.id",
  publisher: "zann.id",
  openGraph: {
    title: "TOOLS ALL IN ONE (BETA)",
    description:
      "One platform. Hundreds of useful tools. Fast, private, and free.",
    url: SITE_URL,
    siteName: "TOOLS ALL IN ONE",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "TOOLS ALL IN ONE (BETA)",
    description:
      "One platform. Hundreds of useful tools. Fast, private, and free.",
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  other: {
    "powered-by": "zann.id",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem("zanzzxit:theme") || "dark";
                document.documentElement.classList.remove("light","dark");
                document.documentElement.classList.add(t);
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <ParticleBackground />
        <div className="relative z-10">
          <AppShell>
            <Topbar />
            <main className="relative z-10 mx-auto w-full max-w-[1400px] flex-1 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
              {children}
            </main>
            <Footer />
          </AppShell>
        </div>
        <CommandSearch />
        <ToastContainer />
        <Watermark />
      </body>
    </html>
  );
}
