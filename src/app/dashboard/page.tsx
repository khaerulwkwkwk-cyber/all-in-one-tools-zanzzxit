"use client";
import Link from "next/link";
import { History, Layers, Star, Trash2 } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useHistory } from "@/hooks/useHistory";
import { TOOLS } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";
import { formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const { favorites } = useFavorites();
  const { history, clearHistory } = useHistory();
  const favTools = TOOLS.filter((t) => favorites.includes(t.slug));
  const recent = history
    .map((h) => ({ slug: h.slug, visitedAt: h.visitedAt, tool: TOOLS.find((t) => t.slug === h.slug) }))
    .filter((x) => x.tool !== undefined);

  return (
    <div className="space-y-10 py-4">
      <header>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Dashboard</h1>
        <p className="mt-2 text-sm text-muted">Tools pribadi kamu, tersimpan lokal di browser.</p>
      </header>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <Star className="h-4 w-4 text-yellow-300" />
          <h2 className="text-lg font-semibold">Favorite Tools</h2>
          <span className="chip ml-2">{favTools.length}</span>
        </div>
        {favTools.length === 0 ? (
          <div className="card flex flex-col items-center gap-2 py-10 text-center">
            <Star className="h-6 w-6 text-muted" />
            <p className="text-sm text-muted">Belum ada favorit.</p>
            <Link href="/tools" className="btn-ghost mt-2">Explore Tools</Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favTools.map((t) => <ToolCard key={t.slug} tool={t} />)}
          </div>
        )}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-violet-300" />
            <h2 className="text-lg font-semibold">Recently Used</h2>
            <span className="chip ml-2">{recent.length}</span>
          </div>
          {recent.length > 0 && (
            <button onClick={clearHistory} className="text-xs text-muted hover:text-red-300">
              <Trash2 className="mr-1 inline h-3 w-3" /> Clear History
            </button>
          )}
        </div>
        {recent.length === 0 ? (
          <div className="card flex flex-col items-center gap-2 py-10 text-center">
            <Layers className="h-6 w-6 text-muted" />
            <p className="text-sm text-muted">Belum ada riwayat.</p>
          </div>
        ) : (
          <div className="card !p-0 divide-y divide-white/5">
            {recent.map((r) => {
              const tool = r.tool;
              if (!tool) return null;
              const Icon = tool.icon;
              return (
                <Link key={r.slug} href={tool.href} className="flex items-center justify-between px-4 py-3 transition hover:bg-white/[0.03]">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03]">
                      <Icon className="h-4 w-4 text-violet-300" />
                    </span>
                    <div>
                      <div className="text-sm font-medium">{tool.name}</div>
                      <div className="text-xs text-muted">{tool.category}</div>
                    </div>
                  </div>
                  <span className="text-xs text-muted">{formatDate(r.visitedAt)}</span>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
