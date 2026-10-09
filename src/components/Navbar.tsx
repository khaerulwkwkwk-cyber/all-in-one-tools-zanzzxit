"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
const NAV = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/tools?cat=Downloader", label: "Downloader" },
  { href: "/tools?cat=WhatsApp", label: "Checker" },
  { href: "/tools?cat=Utilities", label: "Utilities" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About" },
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const openSearch = () => window.dispatchEvent(new Event("open-command-search"));
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 backdrop-blur-xl bg-[#05060a]/70">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 shadow-glow">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          <span className="text-sm sm:text-base">ALL IN ONE TOOLS <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-300">ZanzzXit</span></span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => {
            const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href.split("?")[0]);
            return (
              <Link key={n.href} href={n.href} className={cn("rounded-lg px-3 py-2 text-sm transition", active ? "bg-white/5 text-white" : "text-muted hover:bg-white/5 hover:text-white")}>
                {n.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={openSearch} className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-muted transition hover:border-violet-400/40 hover:text-white sm:flex">
            <Search className="h-3.5 w-3.5" />
            <span>Search tools</span>
            <kbd className="ml-2 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px]">⌘K</kbd>
          </button>
          <button onClick={() => setOpen((v) => !v)} className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-white/5 bg-[#05060a]/95 lg:hidden">
          <div className="mx-auto max-w-[1400px] px-4 py-3 sm:px-6">
            <div className="grid gap-1">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-white/5 hover:text-white">
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
