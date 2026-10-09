"use client";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ToolCard from "@/components/ToolCard";
import { CATEGORIES, searchTools, TOOLS, ToolCategory } from "@/lib/tools";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
function ToolsContent() {
  const params = useSearchParams();
  const initialCat = (params.get("cat") as ToolCategory) || "All";
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<ToolCategory | "All">(initialCat);
  const results = useMemo(() => {
    let list = searchTools(q);
    if (cat !== "All") list = list.filter((t) => t.category === cat);
    return list;
  }, [q, cat]);
  return (
    <div className="space-y-8 py-4">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">All Tools</h1>
        <p className="text-sm text-muted">{TOOLS.length} tools, semua gratis & mudah digunakan.</p>
      </header>
      <div className="card !p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari tools..." className="input-base pl-10 pr-10" />
          {q && <button onClick={() => setQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white"><X className="h-4 w-4" /></button>}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => setCat(c.id as any)} className={cn("chip", cat === c.id && "chip-active")}>
              <c.icon className="h-3 w-3" />{c.label}
            </button>
          ))}
        </div>
      </div>
      {results.length === 0 ? (
        <div className="card flex flex-col items-center gap-3 py-16 text-center">
          <Search className="h-6 w-6 text-muted" />
          <h3 className="text-lg font-semibold">Tool not found</h3>
          <p className="text-sm text-muted">Try another keyword.</p>
          <button onClick={() => { setQ(""); setCat("All"); }} className="btn-ghost mt-2">View All Tools</button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
      )}
    </div>
  );
}
export default function ToolsPage() {
  return <Suspense fallback={<div className="skeleton h-96 w-full" />}><ToolsContent /></Suspense>;
}
