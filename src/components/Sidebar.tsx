"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Wrench, Info, Star, Home, Download, Braces,
  Image as ImageIcon, Type, Calculator, Sparkles, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import WhatsAppChannels from "./WhatsAppChannels";

const MAIN = [
  { href: "/", label: "Home", icon: Home },
  { href: "/tools", label: "All Tools", icon: Wrench },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/about", label: "About", icon: Info },
];

const CATEGORIES = [
  { href: "/tools?cat=Downloader", label: "Downloader", icon: Download },
  { href: "/tools?cat=Developer", label: "Developer", icon: Braces },
  { href: "/tools?cat=Image", label: "Image", icon: ImageIcon },
  { href: "/tools?cat=Text", label: "Text", icon: Type },
  { href: "/tools?cat=Utilities", label: "Utilities", icon: Calculator },
];

interface Props {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: Props) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

  return (
    <aside className="flex h-full w-64 flex-col gap-5 overflow-y-auto p-4">
      {/* Logo */}
      <Link href="/" onClick={onNavigate} className="flex items-center gap-2.5 px-2 py-1">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-sky-500 shadow-glow">
          <Sparkles className="h-4 w-4 text-white" />
        </span>
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="text-[10px] uppercase tracking-wider text-cyan-300/80">Tools Hub</span>
          <span className="flex items-center gap-1.5 text-[11px] font-bold">
            <span className="truncate text-neon">TOOLS ALL IN ONE</span>
            <span className="shrink-0 rounded border border-cyan-400/40 bg-cyan-400/15 px-1 py-[1px] text-[8px] font-bold uppercase tracking-wider text-cyan-300">
              Beta
            </span>
          </span>
        </div>
      </Link>

      {/* Main Nav */}
      <nav className="flex flex-col gap-1">
        <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
          Menu
        </p>
        {MAIN.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                active
                  ? "border border-cyan-400/35 bg-gradient-to-r from-cyan-400/20 to-sky-500/10 text-white shadow-[0_0_20px_-8px_rgba(34,211,238,0.65)]"
                  : "border border-transparent text-muted hover:bg-white/[0.04] hover:text-white"
              )}
            >
              <Icon className={cn("h-4 w-4", active && "text-cyan-300")} />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="h-3.5 w-3.5 text-cyan-300" />}
            </Link>
          );
        })}
      </nav>

      {/* Categories */}
      <nav className="flex flex-col gap-1">
        <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
          Categories
        </p>
        {CATEGORIES.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="group flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] text-muted transition-all hover:bg-white/[0.04] hover:text-white"
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="flex-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* WhatsApp Channels */}
      <div className="px-0">
        <WhatsAppChannels variant="sidebar" />
      </div>

      {/* Bottom CTA + Watermark */}
      <div className="mt-auto">
        <div className="relative overflow-hidden rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/15 to-sky-500/10 p-4">
          <div className="mb-2 grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-sky-500 shadow-glow">
            <Star className="h-4 w-4 fill-white text-white" />
          </div>
          <p className="text-xs font-semibold text-white">20+ Free Tools</p>
          <p className="mt-1 text-[11px] leading-snug text-muted">
            Semua tools dapat diakses gratis, tanpa login.
          </p>
          <Link
            href="/tools"
            onClick={onNavigate}
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 transition hover:text-white"
          >
            Explore <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Watermark */}
        <div className="mt-4 border-t border-cyan-400/10 pt-3">
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted">
            <span>Made by</span>
            <span className="font-mono font-semibold text-cyan-300">©zann.id</span>
          </div>
          <div className="mt-1 flex items-center justify-center gap-2 text-[10px] text-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            All systems operational
          </div>
        </div>
      </div>
    </aside>
  );
}
