"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { searchTools } from "@/lib/tools";
import { cn } from "@/lib/utils";
export default function CommandSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const router = useRouter();
  const results = useMemo(() => searchTools(q).slice(0, 8), [q]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((v) => !v); }
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
  const go = (href: string) => { setOpen(false); router.push(href); };
  return (
    <div className={cn("fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[12vh] transition", open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d14]/95 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-white/5 px-4 py-3">
          <Search className="h-4 w-4 text-muted" />
          <input autoFocus={open} value={q} onChange={(e) => { setQ(e.target.value); setIdx(0); }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(i + 1, results.length - 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
              if (e.key === "Enter" && results[idx]) go(results[idx].href);
            }}
            placeholder="Search tools... (TikTok, QR, JSON...)" className="w-full bg-transparent text-sm outline-none placeholder:text-muted" />
          <button onClick={() => setOpen(false)} className="rounded p-1 hover:bg-white/5"><X className="h-4 w-4" /></button>
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted">Tool not found. Try another keyword.</div>
          ) : (
            results.map((t, i) => {
              const Icon = t.icon;
              return (
                <button key={t.slug} onMouseEnter={() => setIdx(i)} onClick={() => go(t.href)} className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition", i === idx ? "bg-white/[0.06]" : "hover:bg-white/[0.04]")}>
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03]">
                    <Icon className="h-4 w-4 text-violet-300" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{t.name}</div>
                    <div className="truncate text-xs text-muted">{t.description}</div>
                  </div>
                  <span className="chip">{t.category}</span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
