"use client";
import Link from "next/link";
import {
  ArrowRight, Sparkles, Zap, Shield, Smartphone, Layers, Search,
} from "lucide-react";
import ToolCard from "@/components/ToolCard";
import RecentlyViewed from "@/components/RecentlyViewed";
import WhatsAppChannels from "@/components/WhatsAppChannels";
import { TOOLS } from "@/lib/tools";

export default function Home() {
  const featured = TOOLS.slice(0, 8);

  return (
    <div className="space-y-24 py-8">
      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="chip mb-6 inline-flex animate-[fadeIn_.6s_ease]">
            <Sparkles className="h-3 w-3 text-cyan-300" /> 20+ Tools · Free Forever
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
            onClick={() =>
              window.dispatchEvent(new Event("open-command-search"))
            }
            className="mx-auto mt-10 flex w-full max-w-md items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.03] px-4 py-3 text-left text-sm text-muted backdrop-blur transition hover:border-cyan-400/50 hover:bg-cyan-400/[0.06] hover:shadow-[0_0_30px_-8px_rgba(34,211,238,0.5)]"
          >
            <Search className="h-4 w-4" />
            <span className="flex-1">
              Cari tools... coba "TikTok", "QR", "JSON"
            </span>
            <kbd className="rounded border border-cyan-400/20 bg-cyan-400/10 px-1.5 py-0.5 text-[10px] text-cyan-300">
              ⌘K
            </kbd>
          </button>
        </div>

        <div className="pointer-events-none relative mt-16 hidden lg:block">
          <div className="grid grid-cols-3 gap-6">
            {TOOLS.slice(0, 3).map((t, i) => (
              <div
                key={t.slug}
                className="card glow-border animate-[slideUp_.8s_ease_both]"
                style={{
                  animationDelay: `${i * 0.12}s`,
                  transform: `translateY(${i % 2 === 0 ? 0 : 24}px)`,
                }}
              >
                <span className="icon-box-lg">
                  <t.icon className="h-5 w-5 text-cyan-300" />
                </span>
                <h3 className="mt-4 text-sm font-semibold">{t.name}</h3>
                <p className="mt-1 text-xs text-muted line-clamp-2">
                  {t.description}
                </p>
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
          <div
            key={s.label}
            className="card flex items-center gap-4 animate-[slideUp_.6s_ease_both]"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <span className="icon-box-lg shrink-0">
              <s.icon className="h-5 w-5 text-cyan-300" />
            </span>
            <div>
              <div className="text-sm font-semibold">{s.label}</div>
              <div className="text-xs text-muted">{s.desc}</div>
            </div>
          </div>
        ))}
      </section>

      {/* RECENTLY VIEWED */}
      <RecentlyViewed />

      {/* JOIN CHANNEL */}
      <section>
        <div className="mb-4 text-center">
          <span className="chip inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Community
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            Join Our <span className="text-neon">WhatsApp Channels</span>
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
            Dapatkan update tools baru, tips coding, dan info developer langsung dari kami.
          </p>
        </div>
        <div className="mx-auto flex max-w-2xl flex-col items-stretch justify-center gap-3 sm:flex-row">
          <a href="https://whatsapp.com/channel/0029Vb8dCRPEawdi1znr6V1n" target="_blank" rel="noopener noreferrer" className="card glow-border group flex flex-1 items-center gap-4 transition hover:!translate-y-[-3px]">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/25 to-teal-500/15">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-emerald-300" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Saluran Developer</p>
              <p className="text-xs text-muted">Update {/* FEATURED */} info developer</p>
            </div>
            <span className="text-emerald-300 transition group-hover:translate-x-1">2192</span>
          </a>
          <a href="https://whatsapp.com/channel/0029Vb87XnFGzzKRmfb9Tb13" target="_blank" rel="noopener noreferrer" className="card glow-border group flex flex-1 items-center gap-4 transition hover:!translate-y-[-3px]">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/25 to-teal-500/15">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-emerald-300" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Saluran vibe_coder09.id</p>
              <p className="text-xs text-muted">Tips coding {/* FEATURED */} vibes</p>
            </div>
            <span className="text-emerald-300 transition group-hover:translate-x-1">2192</span>
          </a>
        </div>
      </section>

      {/* FEATURED */}
      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Featured Tools
            </h2>
            <p className="mt-1 text-sm text-muted">
              Beberapa tools populer yang sering digunakan.
            </p>
          </div>
          <Link
            href="/tools"
            className="hidden items-center gap-1 text-sm text-cyan-300 transition hover:text-white sm:inline-flex"
          >
            All Tools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </section>
    </div>
  );
}
