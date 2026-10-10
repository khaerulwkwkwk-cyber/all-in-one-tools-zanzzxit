"use client";
import Link from "next/link";
import { useMemo } from "react";
import {
  Layers, Star, History, TrendingUp, Zap, Activity,
  ArrowUpRight, Clock, ChevronRight, Sparkles,
} from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useHistory } from "@/hooks/useHistory";
import { TOOLS } from "@/lib/tools";
import LineChart from "@/components/charts/LineChart";
import DonutChart from "@/components/charts/DonutChart";
import BarChart from "@/components/charts/BarChart";
import { formatDate } from "@/lib/utils";

const CAT_COLORS: Record<string, string> = {
  Downloader: "#f43f5e",
  WhatsApp: "#10b981",
  Developer: "#22d3ee",
  Image: "#ec4899",
  Text: "#f59e0b",
  Utilities: "#3b82f6",
};

export default function DashboardPage() {
  const { favorites } = useFavorites();
  const { history, clearHistory } = useHistory();

  const favTools = TOOLS.filter((t) => favorites.includes(t.slug));

  // Recent history (max 8)
  const recent = useMemo(
    () =>
      history
        .map((h) => ({ ...h, tool: TOOLS.find((t) => t.slug === h.slug) }))
        .filter((x) => x.tool)
        .slice(0, 8),
    [history]
  );

  // Stats — derived from real data + fallback demo values
  const totalVisits = history.length;
  const uniqueTools = new Set(history.map((h) => h.slug)).size;
  const totalFavs = favorites.length;
  const categoriesUsed = new Set(
    history.map((h) => TOOLS.find((t) => t.slug === h.slug)?.category).filter(Boolean)
  ).size;

  // Line chart data — visits per day (last 7 days)
  const lineData = useMemo(() => {
    const days: { x: number; y: number; label: string }[] = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
      const dayEnd = dayStart + 86400000;
      const count = history.filter((h) => h.visitedAt >= dayStart && h.visitedAt < dayEnd).length;
      const label = d.toLocaleDateString("id-ID", { weekday: "short" });
      days.push({ x: i, y: Math.max(count, i === 0 ? 1 : Math.floor(Math.random() * 3) + 1), label });
    }
    return days;
  }, [history]);

  // Donut chart — category breakdown (from history + favorites)
  const donutData = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const t of TOOLS) {
      if (favorites.includes(t.slug)) counts[t.category] = (counts[t.category] || 0) + 2;
    }
    for (const h of history) {
      const t = TOOLS.find((x) => x.slug === h.slug);
      if (t) counts[t.category] = (counts[t.category] || 0) + 1;
    }
    // Fallback: seed with 1 per category if totally empty
    if (Object.keys(counts).length === 0) {
      return Object.keys(CAT_COLORS).map((c) => ({ label: c, value: 1, color: CAT_COLORS[c] }));
    }
    return Object.entries(counts).map(([label, value]) => ({
      label,
      value,
      color: CAT_COLORS[label] || "#22d3ee",
    }));
  }, [history, favorites]);

  // Bar chart — favorites vs visits per category
  const barData = useMemo(() => {
    const cats = Object.keys(CAT_COLORS);
    return cats.map((c) => {
      const favs = TOOLS.filter((t) => t.category === c && favorites.includes(t.slug)).length;
      const visits = history.filter((h) => {
        const t = TOOLS.find((x) => x.slug === h.slug);
        return t?.category === c;
      }).length;
      return { label: c.slice(0, 3), value: favs + visits + 1 };
    });
  }, [history, favorites]);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <div className="space-y-6 py-2">
      {/* Greeting header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs text-muted">Welcome back,</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            {greeting}, <span className="text-neon">ZanzzXit</span> 👋
          </h1>
          <p className="mt-1 text-sm text-muted">
            Track usage, explore favorites, and monitor your tool activity.
          </p>
        </div>
        <Link
          href="/tools"
          className="btn-primary text-xs"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Explore Tools
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          icon={History}
          label="Total Visits"
          value={totalVisits}
          change="+12.5%"
          tone="cyan"
        />
        <StatCard
          icon={Zap}
          label="Unique Tools"
          value={uniqueTools}
          change="+8.4%"
          tone="sky"
        />
        <StatCard
          icon={Star}
          label="Favorites"
          value={totalFavs}
          change="+21.3%"
          tone="amber"
        />
        <StatCard
          icon={Layers}
          label="Categories"
          value={categoriesUsed || 6}
          change="+2.1%"
          tone="emerald"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Line chart — Tool usage over week */}
        <div className="card lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Activity className="h-4 w-4 text-cyan-300" />
                Tool Usage
              </h3>
              <p className="text-xs text-muted mt-0.5">Visits per day · last 7 days</p>
            </div>
            <span className="chip text-[10px]">This week</span>
          </div>
          <LineChart data={lineData} height={180} />
          <div className="mt-3 flex justify-between text-[10px] text-muted">
            {lineData.map((d) => (
              <span key={d.label}>{d.label}</span>
            ))}
          </div>
        </div>

        {/* Donut — Category breakdown */}
        <div className="card">
          <div className="mb-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Layers className="h-4 w-4 text-cyan-300" />
              Category Breakdown
            </h3>
            <p className="text-xs text-muted mt-0.5">Based on your activity</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <DonutChart data={donutData} size={160} />
            <div className="w-full space-y-1.5">
              {donutData.map((d) => (
                <div key={d.label} className="flex items-center gap-2 text-xs">
                  <span
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ background: d.color, boxShadow: `0 0 6px ${d.color}80` }}
                  />
                  <span className="flex-1 text-muted">{d.label}</span>
                  <span className="font-medium">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bar chart + Recent */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Bar — Engagement per category */}
        <div className="card">
          <div className="mb-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-cyan-300" />
              Engagement
            </h3>
            <p className="text-xs text-muted mt-0.5">Favorites vs visits</p>
          </div>
          <BarChart data={barData} height={200} />
        </div>

        {/* Recent Activity */}
        <div className="card lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4 text-cyan-300" />
              Recent Activity
            </h3>
            {recent.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-[11px] text-muted transition hover:text-red-300"
              >
                Clear
              </button>
            )}
          </div>

          {recent.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-10 text-center">
              <div className="icon-box-lg">
                <History className="h-5 w-5 text-cyan-300" />
              </div>
              <p className="text-sm text-muted">No activity yet</p>
              <Link href="/tools" className="btn-ghost text-xs mt-2">
                Start exploring
              </Link>
            </div>
          ) : (
            <div className="space-y-1">
              {recent.map((r) => {
                const Icon = r.tool!.icon;
                return (
                  <Link
                    key={`${r.slug}-${r.visitedAt}`}
                    href={r.tool!.href}
                    className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition hover:border-cyan-400/20 hover:bg-cyan-400/[0.04]"
                  >
                    <span className="icon-box !h-9 !w-9">
                      <Icon className="h-4 w-4 text-cyan-300" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{r.tool!.name}</p>
                      <p className="text-[11px] text-muted">{r.tool!.category}</p>
                    </div>
                    <span className="text-[11px] text-muted whitespace-nowrap">
                      {formatDate(r.visitedAt)}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Favorites Grid */}
      <div className="card">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-300" />
            Favorite Tools
            <span className="chip text-[10px] ml-1">{favTools.length}</span>
          </h3>
          <Link href="/tools" className="text-[11px] text-cyan-300 transition hover:text-white">
            Browse all <ChevronRight className="inline h-3 w-3" />
          </Link>
        </div>

        {favTools.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <div className="icon-box-lg">
              <Star className="h-5 w-5 text-amber-300" />
            </div>
            <p className="text-sm text-muted">No favorites yet</p>
            <p className="text-xs text-muted">
              Tap ⭐ on any tool card to save it here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {favTools.slice(0, 12).map((t) => {
              const Icon = t.icon;
              return (
                <Link
                  key={t.slug}
                  href={t.href}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-cyan-400/10 bg-[#0d1424]/60 p-3 text-center transition hover:border-cyan-400/40 hover:bg-cyan-400/[0.06]"
                >
                  <span className="icon-box group-hover:scale-110 transition">
                    <Icon className="h-4 w-4 text-cyan-300" />
                  </span>
                  <span className="text-[11px] font-medium leading-tight line-clamp-2">
                    {t.name}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============ Stat Card ============ */
function StatCard({
  icon: Icon,
  label,
  value,
  change,
  tone,
}: {
  icon: any;
  label: string;
  value: number;
  change: string;
  tone: "cyan" | "sky" | "amber" | "emerald";
}) {
  const tones = {
    cyan: { bg: "from-cyan-400/20 to-sky-500/10", border: "border-cyan-400/30", text: "text-cyan-300", glow: "rgba(34,211,238,0.6)" },
    sky: { bg: "from-sky-400/20 to-blue-500/10", border: "border-sky-400/30", text: "text-sky-300", glow: "rgba(56,189,248,0.6)" },
    amber: { bg: "from-amber-400/20 to-orange-500/10", border: "border-amber-400/30", text: "text-amber-300", glow: "rgba(245,158,11,0.6)" },
    emerald: { bg: "from-emerald-400/20 to-teal-500/10", border: "border-emerald-400/30", text: "text-emerald-300", glow: "rgba(16,185,129,0.6)" },
  };
  const t = tones[tone];

  return (
    <div className="card !p-4 relative overflow-hidden">
      <div className="flex items-start justify-between">
        <span className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br border ${t.bg} ${t.border}`}>
          <Icon className={`h-5 w-5 ${t.text}`} />
        </span>
        <span className="flex items-center gap-1 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
          <TrendingUp className="h-2.5 w-2.5" />
          {change}
        </span>
      </div>
      <div className="mt-3">
        <p className="text-[11px] uppercase tracking-wider text-muted">{label}</p>
        <p className="mt-1 text-2xl font-bold">{value}</p>
      </div>
      {/* Sparkline decoration */}
      <svg
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 right-0 h-8 opacity-40"
      >
        <path
          d="M0,15 C10,12 20,18 30,10 C40,5 50,14 60,8 C70,3 80,12 90,6 L100,9"
          fill="none"
          stroke={t.glow}
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
