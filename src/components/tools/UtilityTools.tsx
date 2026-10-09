"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Copy, Globe, RefreshCw } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";
export function ColorPicker() {
  const [color, setColor] = useState("#7c5cff");
  const r = parseInt(color.slice(1, 3), 16), g = parseInt(color.slice(3, 5), 16), b = parseInt(color.slice(5, 7), 16);
  return (
    <div className="card grid gap-6 sm:grid-cols-2">
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-40 w-full cursor-pointer rounded-xl border border-white/10 bg-transparent" />
      <div className="space-y-3">
        {[["HEX", color], ["RGB", "rgb(" + r + ", " + g + ", " + b + ")"]].map(([l, v]) => (
          <div key={l} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5">
            <span className="text-xs text-muted">{l}</span>
            <span className="flex items-center gap-2 font-mono text-sm">{v}
              <button onClick={() => copyToClipboard(v as string)} className="text-muted hover:text-white"><Copy className="h-3 w-3" /></button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
export function TimestampConverter() {
  const [ts, setTs] = useState(Math.floor(Date.now() / 1000).toString());
  const [dateStr, setDateStr] = useState(new Date().toISOString().slice(0, 19));
  const [ts2, setTs2] = useState("");
  const [dateOut, setDateOut] = useState("");
  useEffect(() => { setTs2(new Date(Number(ts) * 1000).toString()); }, [ts]);
  useEffect(() => { setDateOut(Math.floor(new Date(dateStr).getTime() / 1000).toString()); }, [dateStr]);
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card">
        <h4 className="mb-3 text-sm font-semibold">Unix &rarr; Date</h4>
        <Input value={ts} onChange={(e) => setTs(e.target.value)} />
        <div className="mt-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-sm">
          <p className="text-xs text-muted">Local</p><p className="font-mono">{ts2 || "-"}</p>
        </div>
      </div>
      <div className="card">
        <h4 className="mb-3 text-sm font-semibold">Date &rarr; Unix</h4>
        <Input value={dateStr} onChange={(e) => setDateStr(e.target.value)} placeholder="YYYY-MM-DDTHH:mm:ss" />
        <div className="mt-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
          <p className="text-xs text-muted">Unix Timestamp</p><p className="font-mono text-sm">{dateOut || "-"}</p>
        </div>
      </div>
    </div>
  );
}
const UNITS: Record<string, Record<string, number>> = {
  Length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.34, yd: 0.9144, ft: 0.3048, in: 0.0254 },
  Weight: { kg: 1, g: 0.001, mg: 1e-6, lb: 0.453592, oz: 0.0283495 },
  Data: { B: 1, KB: 1024, MB: 1048576, GB: 1073741824, TB: 1099511627776 },
  Time: { s: 1, min: 60, h: 3600, d: 86400, w: 604800 },
};
export function UnitConverter() {
  const [cat, setCat] = useState<string>("Length");
  const units = Object.keys(UNITS[cat]);
  const [from, setFrom] = useState(units[0]);
  const [to, setTo] = useState(units[1]);
  const [val, setVal] = useState("1");
  useEffect(() => { const u = Object.keys(UNITS[cat]); setFrom(u[0]); setTo(u[1]); }, [cat]);
  const result = (parseFloat(val) * UNITS[cat][from]) / UNITS[cat][to];
  return (
    <div className="card space-y-4">
      <select value={cat} onChange={(e) => setCat(e.target.value)} className="input-base">{Object.keys(UNITS).map((c) => <option key={c}>{c}</option>)}</select>
      <div className="grid grid-cols-3 gap-3">
        <Input type="number" value={val} onChange={(e) => setVal(e.target.value)} />
        <select value={from} onChange={(e) => setFrom(e.target.value)} className="input-base">{units.map((u) => <option key={u}>{u}</option>)}</select>
        <select value={to} onChange={(e) => setTo(e.target.value)} className="input-base">{units.map((u) => <option key={u}>{u}</option>)}</select>
      </div>
      <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4 text-center">
        <p className="text-xs text-muted">Result</p>
        <p className="mt-1 font-mono text-2xl">{isFinite(result) ? result.toLocaleString() : "-"} {to}</p>
      </div>
    </div>
  );
}
export function Calculator() {
  const [expr, setExpr] = useState("");
  const [out, setOut] = useState("");
  const run = () => {
    try {
      if (!/^[\d\s+\-*/().%]+$/.test(expr)) { setOut("Invalid expression"); return; }
      const r = Function('"use strict"; return (' + expr + ")")();
      setOut(String(r));
    } catch { setOut("Error"); }
  };
  return (
    <div className="card">
      <Input value={expr} onChange={(e) => setExpr(e.target.value)} onKeyDown={(e) => e.key === "Enter" && run()} placeholder="1 + 2 * (3 - 4)" className="font-mono text-base" />
      <div className="mt-3 flex gap-2">
        <Button onClick={run}>Calculate</Button>
        <Button variant="ghost" onClick={() => { setExpr(""); setOut(""); }}>Clear</Button>
      </div>
      {out && <div className="mt-4 rounded-lg border border-white/5 bg-white/[0.02] p-4 text-center font-mono text-2xl">{out}</div>}
    </div>
  );
}
export function IpInformation() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const load = async () => {
    setLoading(true); setError("");
    try { const r = await fetch("https://ipapi.co/json/"); if (!r.ok) throw 0; setData(await r.json()); }
    catch { setError("Gagal mengambil info IP."); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold"><Globe className="h-4 w-4 text-violet-300" /> Your IP Info</div>
        <Button size="sm" variant="ghost" onClick={load} loading={loading}><RefreshCw className="h-3.5 w-3.5" /> Refresh</Button>
      </div>
      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
      {loading && !data && <div className="mt-4 space-y-2"><div className="skeleton h-6" /><div className="skeleton h-6 w-2/3" /></div>}
      {data && (
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          {[["IP", data.ip], ["City", data.city], ["Region", data.region], ["Country", data.country_name], ["ISP", data.org], ["Timezone", data.timezone]].map(([k, v]) => (
            <div key={k as string} className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
              <div className="text-xs text-muted">{k}</div><div className="mt-1 truncate font-medium">{v || "-"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export function UserAgentParser() {
  const [ua, setUa] = useState(typeof navigator !== "undefined" ? navigator.userAgent : "");
  const browser = /Edg/.test(ua) ? "Edge" : /Chrome/.test(ua) ? "Chrome" : /Firefox/.test(ua) ? "Firefox" : /Safari/.test(ua) ? "Safari" : "Unknown";
  const os = /Windows/.test(ua) ? "Windows" : /Mac OS/.test(ua) ? "macOS" : /Android/.test(ua) ? "Android" : /iPhone|iPad/.test(ua) ? "iOS" : /Linux/.test(ua) ? "Linux" : "Unknown";
  const device = /Mobile/.test(ua) ? "Mobile" : "Desktop";
  return (
    <div className="card">
      <Textarea value={ua} onChange={(e) => setUa(e.target.value)} rows={3} />
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
        {[["Browser", browser], ["OS", os], ["Device", device]].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
            <div className="text-xs text-muted">{k}</div><div className="mt-1 font-medium">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
export function JwtDecoder() {
  const [token, setToken] = useState("");
  const [out, setOut] = useState<any>(null);
  const [error, setError] = useState("");
  const decode = () => {
    setError(""); setOut(null);
    try {
      const parts = token.trim().split(".");
      if (parts.length !== 3) throw new Error("Format JWT tidak valid (harus 3 bagian).");
      const h = parts[0], p = parts[1];
      const header = JSON.parse(atob(h.replace(/-/g, "+").replace(/_/g, "/")));
      const payload = JSON.parse(atob(p.replace(/-/g, "+").replace(/_/g, "/")));
      setOut({ header, payload });
    } catch (e: any) { setError(e.message || "Gagal decode JWT."); }
  };
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card">
        <Textarea value={token} onChange={(e) => setToken(e.target.value)} rows={10} placeholder="eyJhbGciOi..." />
        <Button className="mt-3" onClick={decode}>Decode</Button>
        {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
      </div>
      <div className="card">
        {out ? (
          <div className="space-y-4 text-xs font-mono">
            <div><div className="mb-1 text-xs font-semibold text-violet-300">HEADER</div><pre className="overflow-x-auto rounded-lg border border-white/5 bg-black/40 p-3">{JSON.stringify(out.header, null, 2)}</pre></div>
            <div><div className="mb-1 text-xs font-semibold text-cyan-300">PAYLOAD</div><pre className="overflow-x-auto rounded-lg border border-white/5 bg-black/40 p-3">{JSON.stringify(out.payload, null, 2)}</pre></div>
          </div>
        ) : <p className="text-sm text-muted">Decoded header & payload akan muncul.</p>}
      </div>
    </div>
  );
}
