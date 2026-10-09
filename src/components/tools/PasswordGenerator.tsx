"use client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { cn, copyToClipboard } from "@/lib/utils";
function secureRandom(max: number) {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % max;
}
export default function PasswordGenerator() {
  const [length, setLength] = useState(20);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const generate = useCallback(() => {
    let pool = "";
    if (upper) pool += "ABCDEFGHJKLMNPQRSTUVWXYZ";
    if (lower) pool += "abcdefghijkmnopqrstuvwxyz";
    if (numbers) pool += "23456789";
    if (symbols) pool += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!pool) { setPassword(""); return; }
    let pwd = "";
    for (let i = 0; i < length; i++) pwd += pool[secureRandom(pool.length)];
    setPassword(pwd);
  }, [length, upper, lower, numbers, symbols]);
  useEffect(() => { generate(); }, [generate]);
  const strength = (() => {
    let s = 0;
    if (length >= 12) s++; if (length >= 20) s++;
    if (upper) s++; if (lower) s++; if (numbers) s++; if (symbols) s++;
    if (s <= 2) return { label: "Weak", color: "bg-red-500", w: "33%" };
    if (s <= 4) return { label: "Fair", color: "bg-yellow-500", w: "66%" };
    return { label: "Strong", color: "bg-emerald-500", w: "100%" };
  })();
  const copy = async () => {
    if (!password) return;
    if (await copyToClipboard(password)) { setCopied(true); setTimeout(() => setCopied(false), 1500); }
  };
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
      <div className="card">
        <div className="rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-lg break-all">
          {password || <span className="text-muted">—</span>}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={generate}><RefreshCw className="h-4 w-4" /> Generate</Button>
          <Button variant="ghost" onClick={copy} disabled={!password}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <div className="mt-6">
          <div className="mb-2 flex justify-between text-xs text-muted"><span>Strength</span><span>{strength.label}</span></div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
            <div className={cn("h-full rounded-full transition-all", strength.color)} style={{ width: strength.w }} />
          </div>
        </div>
      </div>
      <div className="card space-y-4">
        <div>
          <label className="mb-1 block text-xs text-muted">Length: {length}</label>
          <input type="range" min={4} max={64} value={length} onChange={(e) => setLength(+e.target.value)} className="w-full accent-violet-500" />
        </div>
        {([
          ["Uppercase (A-Z)", upper, setUpper] as const,
          ["Lowercase (a-z)", lower, setLower] as const,
          ["Numbers (0-9)", numbers, setNumbers] as const,
          ["Symbols (!@#)", symbols, setSymbols] as const,
        ]).map(([label, val, set]) => (
          <label key={label} className="flex cursor-pointer items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5 text-sm">
            <span>{label}</span>
            <input type="checkbox" checked={val} onChange={(e) => set(e.target.checked)} className="h-4 w-4 accent-violet-500" />
          </label>
        ))}
      </div>
    </div>
  );
}
