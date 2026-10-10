"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, Sparkles, Menu, X, Bell } from "lucide-react";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";

export default function Topbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const openSearch = () => window.dispatchEvent(new Event("open-command-search"));

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-cyan-400/10 bg-[#060b18]/85 backdrop-blur-xl">
        <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-400/5 transition hover:border-cyan-400/50 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyan-400 to-sky-500">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </span>
            <span className="flex items-center gap-1.5 text-sm font-semibold">
              <span className="text-neon">TOOLS ALL IN ONE</span>
              <span className="rounded border border-cyan-400/40 bg-cyan-400/15 px-1 py-[1px] text-[8px] font-bold uppercase text-cyan-300">
                Beta
              </span>
            </span>
          </Link>

          <button
            onClick={openSearch}
            className="mx-auto hidden w-full max-w-xl items-center gap-3 rounded-xl border border-cyan-400/12 bg-[#0d1424]/70 px-4 py-2.5 text-sm text-muted backdrop-blur transition hover:border-cyan-400/40 hover:bg-[#0d1424] lg:flex"
          >
            <Search className="h-4 w-4" />
            <span className="flex-1 text-left">
              Search tools, categories, or keywords...
            </span>
            <kbd className="rounded border border-cyan-400/20 bg-cyan-400/10 px-1.5 py-0.5 text-[10px] text-cyan-300">
              ⌘ K
            </kbd>
          </button>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={openSearch}
              className="grid h-9 w-9 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-400/5 text-muted transition hover:text-white lg:hidden"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>

            <ThemeToggle />

            <button
              className="relative grid h-9 w-9 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-400/5 text-muted transition hover:border-cyan-400/50 hover:text-white"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 grid h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
            </button>

            <div className="hidden items-center gap-2.5 rounded-xl border border-cyan-400/15 bg-[#0d1424]/60 px-2.5 py-1.5 sm:flex">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-cyan-400 to-sky-500 text-[11px] font-bold text-white">
                Z
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-semibold text-white">zann.id</span>
                <span className="text-[10px] text-cyan-300">Free Plan</span>
              </div>
            </div>

            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-sky-500 text-xs font-bold text-white sm:hidden">
              Z
            </span>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 max-w-[85vw] border-r border-cyan-400/15 bg-[#060b18]/95 backdrop-blur-xl">
            <div className="flex h-full flex-col overflow-y-auto">
              <Sidebar onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
