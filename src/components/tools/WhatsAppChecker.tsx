"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AlertCircle, CheckCircle2, MessageCircle, Phone, Search, XCircle } from "lucide-react";
import { checkWhatsApp, WhatsAppResult } from "@/services/whatsapp";
import { cn } from "@/lib/utils";
export default function WhatsAppChecker() {
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WhatsAppResult | null>(null);
  const [error, setError] = useState("");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setResult(null); setLoading(true);
    try { const res = await checkWhatsApp(number); setResult(res); }
    catch (err: any) { setError(err.message || "Something went wrong."); }
    finally { setLoading(false); }
  };
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_400px]">
      <form onSubmit={submit} className="card">
        <label className="mb-2 block text-xs text-muted">Nomor WhatsApp (format internasional)</label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input value={number} onChange={(e) => setNumber(e.target.value)} placeholder="6281234567890" className="pl-10" />
          </div>
          <Button type="submit" loading={loading} disabled={!number.trim()}><Search className="h-4 w-4" /> Check</Button>
        </div>
        <p className="mt-3 text-xs text-muted">Contoh: <code className="rounded bg-white/5 px-1">628xxxxxxxxxx</code></p>
        {error && <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-300"><AlertCircle className="h-4 w-4" /> {error}</div>}
      </form>
      <div className="card">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold"><MessageCircle className="h-4 w-4 text-emerald-300" /> Result</div>
        {loading && <div className="space-y-3"><div className="skeleton h-6 w-3/4" /><div className="skeleton h-6 w-1/2" /><div className="skeleton h-6 w-2/3" /></div>}
        {!loading && !result && <p className="text-sm text-muted">Masukkan nomor untuk memulai.</p>}
        {result && (
          <div className="space-y-3 text-sm">
            <Row label="Status Format" value={result.valid ? "Valid" : "Invalid"} icon={result.valid ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <XCircle className="h-4 w-4 text-red-400" />} />
            <Row label="Negara" value={result.country || "Unknown"} />
            <Row label="Kode Negara" value={result.countryCode || "-"} />
            <Row label="E.164" value={result.e164 || "-"} mono />
            <Row label="Formatted" value={result.formatted || "-"} mono />
            <Row label="Account Status" value={result.status} icon={result.status === "Available" ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : result.status === "Unavailable" ? <XCircle className="h-4 w-4 text-red-400" /> : <AlertCircle className="h-4 w-4 text-yellow-400" />} />
            {result.demo && <p className="mt-3 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-2.5 text-xs text-yellow-200">⚠️ DEMO · {result.notes}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
function Row({ label, value, icon, mono }: { label: string; value: string; icon?: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5">
      <span className="text-xs text-muted">{label}</span>
      <span className={cn("flex items-center gap-1.5 text-xs", mono && "font-mono")}>{icon}{value}</span>
    </div>
  );
}
