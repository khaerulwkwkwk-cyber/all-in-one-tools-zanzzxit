"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AlertCircle, Clipboard, Download, ExternalLink, RefreshCw, Search } from "lucide-react";
import { fetchTikTok, isValidTikTokUrl, TikTokResult } from "@/services/tiktok";
export default function TikTokDownloader() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TikTokResult | null>(null);
  const [error, setError] = useState("");
  const paste = async () => { try { const t = await navigator.clipboard.readText(); setUrl(t); } catch {} };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setResult(null);
    if (!url.trim()) { setError("URL wajib diisi."); return; }
    if (!isValidTikTokUrl(url)) { setError("URL TikTok tidak valid."); return; }
    setLoading(true);
    try { const res = await fetchTikTok(url); setResult(res); }
    catch (err: any) { setError(err.message || "Something went wrong."); }
    finally { setLoading(false); }
  };
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <form onSubmit={submit} className="card">
        <label className="mb-2 block text-xs text-muted">TikTok URL</label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.tiktok.com/@user/video/..." />
          <div className="flex gap-2">
            <Button type="button" variant="ghost" onClick={paste} title="Paste"><Clipboard className="h-4 w-4" /></Button>
            <Button type="submit" loading={loading}><Search className="h-4 w-4" /> Check</Button>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted">Set <code className="rounded bg-white/5 px-1">TIKTOK_API_URL</code> di <code className="rounded bg-white/5 px-1">.env</code> untuk provider nyata.</p>
        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-300">
            <AlertCircle className="mt-0.5 h-4 w-4" />
            <div>
              <p>{error}</p>
              <button type="button" onClick={submit as any} className="mt-1 text-xs underline hover:text-white">
                <RefreshCw className="mr-1 inline h-3 w-3" /> Try Again
              </button>
            </div>
          </div>
        )}
      </form>
      <div className="card">
        {loading && (
          <div className="flex gap-4">
            <div className="skeleton h-32 w-24" />
            <div className="flex-1 space-y-3">
              <div className="skeleton h-5 w-3/4" />
              <div className="skeleton h-4 w-1/2" />
              <div className="skeleton h-4 w-2/3" />
            </div>
          </div>
        )}
        {!loading && !result && <p className="text-sm text-muted">Hasil preview akan muncul di sini.</p>}
        {result && (
          <div className="space-y-4">
            {result.demo && <span className="chip border-yellow-500/40 bg-yellow-500/10 text-yellow-200">DEMO DATA</span>}
            <div className="flex gap-4">
              <img src={result.data.thumbnail} alt="thumb" className="h-32 w-24 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-sm font-semibold">{result.data.title}</h3>
                <p className="mt-1 text-xs text-muted">{result.data.author}</p>
                {result.data.duration && <p className="mt-1 text-xs text-muted">{result.data.duration}s</p>}
              </div>
            </div>
            <div className="grid gap-2">
              {result.data.downloads.map((d, i) => (
                <a key={i} href={d.url} target={d.url.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5 text-sm transition hover:border-violet-400/40">
                  <span>{d.label}</span>
                  <span className="flex items-center gap-2 text-xs text-muted">
                    {d.quality}
                    {d.url === "#demo" ? <ExternalLink className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
