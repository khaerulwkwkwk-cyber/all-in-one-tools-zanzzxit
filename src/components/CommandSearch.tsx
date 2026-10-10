"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Clock, TrendingUp } from "lucide-react";
import { searchTools } from "@/lib/tools";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { cn } from "@/lib/utils";

export default function CommandSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const router = useRouter();
  const { history: searchHistory, push, remove, clear } = useSearchHistory();

  const results = useMemo(() => searchTools(q).slice(0, 8), [q]);
  const showSuggest = !q.trim() && searchHistory.length > 0;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-search", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-search", onOpen);
    };
  }, []);

  useEffect(() => { if (open) { setQ(""); setIdx(0); } }, [open]);

  const go = (href: string) => {
    if (q.trim()) push(q);
    setOpen(false);
    router.push(href);
  };
  const goSearch = (term: string) => {
    push(term);
    setOpen(false);
    router.push(`/tools?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className={cn("fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[12vh] transition", open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#0d1424]/95 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3 border-b border-cyan-400/10 px-4 py-3">
          <Search className="h-4 w-4 text-muted" />
          <input
            autoFocus={open}
            value={q}
            onChange={(e) => { setQ(e.target.value); setIdx(0); }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(i + 1, results.length - 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
              if (e.key === "Enter") {
                if (q.trim() && results.length === 0) goSearch(q);
                else if (results[idx]) go(results[idx].href);
              }
            }}
            placeholder="Search tools... (TikTok, QR, JSON)"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          />
          <button onClick={() => setOpen(false)} className="rounded p-1 transition hover:bg-white/5">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-2">
          {showSuggest ? (
            <>
              <div className="flex items-center justify-between px-3 pb-2 pt-1">
                <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
                  <Clock className="h-3 w-3" /> Recent searches
                </span>
                <button onClick={clear} className="text-[10px] text-muted transition hover:text-red-300">Clear</button>
              </div>
              {searchHistory.map((term) => (
                <div key={term} className="group flex items-center gap-2 rounded-xl px-3 py-2.5 transition hover:bg-white/[0.04]">
                  <Clock className="h-3.5 w-3.5 shrink-0 text-muted" />
                  <button onClick={() => goSearch(term)} className="min-w-0 flex-1 truncate text-left text-sm">{term}</button>
                  <button onClick={() => remove(term)} className="shrink-0 rounded p-1 opacity-0 transition group-hover:opacity-100 hover:bg-white/10">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </>
          ) : results.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-sm text-muted">Tool not found</p>
              <p className="mt-1 text-xs text-muted">Try another keyword.</p>
              {q.trim() && (
                <button onClick={() => goSearch(q)} className="btn-ghost mt-3 text-xs">
                  <TrendingUp className="h-3 w-3" /> Search "{q}"
                </button>
              )}
            </div>
          ) : (
            results.map((t, i) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.slug}
                  onMouseEnter={() => setIdx(i)}
                  onClick={() => go(t.href)}
                  className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition", i === idx ? "bg-cyan-400/[0.08]" : "hover:bg-white/[0.04]")}
                >
                  <span className="icon-box !h-9 !w-9 shrink-0">
                    <Icon className="h-4 w-4 text-cyan-300" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{t.name}</div>
                    <div className="truncate text-xs text-muted">{t.description}</div>
                  </div>
                  <span className="chip text-[10px]">{t.category}</span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
