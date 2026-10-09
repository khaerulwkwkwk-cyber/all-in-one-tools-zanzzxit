"use client";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Shield, Smartphone, Layers, Search } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { TOOLS } from "@/lib/tools";

export default function Home() {
  const featured = TOOLS.slice(0, 8);

  return (
    <div className="space-y-24 py-8">
      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="chip mb-6 inline-flex animate-[fadeIn_.6s_ease]">
            <Sparkles className="h-3 w-3 text-violet-300" /> 20+ Tools · Free Forever
          </span>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl animate-[slideUp_.7s_ease]">
            Everything You Need.{" "}
            <span className="text-neon">One Powerful Toolkit.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base text-muted sm:text-lg animate-[fadeIn_1s_ease]">
            Kumpulan tools online cepat dan praktis dalam satu platform.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row animate-[slideUp_1s_ease]">
            <Link href="/tools" className="btn-primary relative neon-border">
              <Sparkles className="h-4 w-4" /> Explore Tools
            </Link>
            <Link href="/dashboard" className="btn-ghost">
              <Layers className="h-4 w-4" /> My Dashboard
            </Link>
          </div>

          <button
            onClick={() => window.dispatchEvent(new Event("open-command-search"))}
            className="mx-auto mt-10 flex w-full max-w-md items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-left text-sm text-muted backdrop-blur transition hover:border-violet-400/50 hover:bg-white/[0.04] hover:shadow-[0_0_30px_-8px_rgba(124,92,255,0.5)]"
          >
            <Search className="h-4 w-4" />
            <span className="flex-1">Cari tools... coba "TikTok", "QR", "JSON"</span>
            <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px]">⌘K</kbd>
          </button>
        </div>

        {/* Floating preview cards */}
        <div className="pointer-events-none relative mt-16 hidden lg:block">
          <div className="grid grid-cols-3 gap-6">
            {TOOLS.slice(0, 3).map((t, i) => (
              <div
                key={t.slug}
                className="card glow-border animate-[slideUp_.8s_ease_both]"
                style={{ animationDelay: `${i * 0.12}s`, transform: `translateY(${i % 2 === 0 ? 0 : 24}px)` }}
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/20 to-cyan-400/10">
                  <t.icon className="h-5 w-5 text-violet-300" />
                </span>
                <h3 className="mt-4 text-sm font-semibold">{t.name}</h3>
                <p className="mt-1 text-xs text-muted line-clamp-2">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Layers, label: "20+ Tools", desc: "Siap digunakan" },
          { icon: Zap, label: "Fast Processing", desc: "Client-side & cached" },
          { icon: Smartphone, label: "Mobile Friendly", desc: "Responsive dari 360px" },
          { icon: Shield, label: "Free Tools", desc: "Tanpa login, tanpa biaya" },
        ].map((s, i) => (
          <div key={s.label} className="card flex items-center gap-4 animate-[slideUp_.6s_ease_both]" style={{ animationDelay: `${i * 0.08}s` }}>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/15 to-cyan-400/10">
              <s.icon className="h-5 w-5 text-violet-300" />
            </span>
            <div>
              <div className="text-sm font-semibold">{s.label}</div>
              <div className="text-xs text-muted">{s.desc}</div>
            </div>
          </div>
        ))}
      </section>

      {/* FEATURED */}
      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Featured Tools</h2>
            <p className="mt-1 text-sm text-muted">Beberapa tools populer yang sering digunakan.</p>
          </div>
          <Link href="/tools" className="hidden items-center gap-1 text-sm text-violet-300 transition hover:text-cyan-300 sm:inline-flex">
            All Tools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </section>
    </div>
  );
}
