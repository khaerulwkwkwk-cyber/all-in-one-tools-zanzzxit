"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Check, Copy, Fingerprint, Hash, Shuffle } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";
export function UuidGenerator() {
  const [list, setList] = useState<string[]>([]);
  const gen = () => setList((l) => [crypto.randomUUID(), ...l].slice(0, 20));
  return (
    <div className="card">
      <div className="flex gap-2">
        <Button onClick={gen}><Fingerprint className="h-4 w-4" /> Generate UUID</Button>
        <Button variant="ghost" onClick={() => setList([])}>Clear</Button>
      </div>
      <ul className="mt-4 space-y-2 font-mono text-xs">
        {list.length === 0 && <li className="text-muted">Klik Generate untuk membuat UUID v4.</li>}
        {list.map((id, i) => (
          <li key={i} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
            <span className="truncate">{id}</span>
            <button onClick={() => copyToClipboard(id)} className="ml-2 text-muted hover:text-white"><Copy className="h-3 w-3" /></button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export function HashGenerator() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<{ alg: string; hash: string }[]>([]);
  const [copied, setCopied] = useState("");
  const gen = async () => {
    const enc = new TextEncoder().encode(input);
    const algs = ["SHA-1", "SHA-256", "SHA-512"];
    const out: { alg: string; hash: string }[] = [];
    for (const alg of algs) {
      const buf = await crypto.subtle.digest(alg, enc);
      out.push({ alg, hash: Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("") });
    }
    setResults(out);
  };
  return (
    <div className="card">
      <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Teks untuk di-hash" />
      <Button className="mt-3" onClick={gen}><Hash className="h-4 w-4" /> Generate</Button>
      <div className="mt-4 space-y-2">
        {results.map((r) => (
          <div key={r.alg} className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-semibold text-violet-300">{r.alg}</span>
              <button onClick={async () => { if (await copyToClipboard(r.hash)) { setCopied(r.alg); setTimeout(() => setCopied(""), 1200); } }} className="text-muted hover:text-white">
                {copied === r.alg ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </button>
            </div>
            <p className="break-all font-mono text-xs text-muted">{r.hash}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export function RandomNumber() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [nums, setNums] = useState<number[]>([]);
  const gen = () => {
    const arr: number[] = [];
    const lo = Math.min(min, max), hi = Math.max(min, max);
    for (let i = 0; i < count; i++) {
      const r = new Uint32Array(1); crypto.getRandomValues(r);
      arr.push(lo + (r[0] % (hi - lo + 1)));
    }
    setNums(arr);
  };
  return (
    <div className="card">
      <div className="grid gap-3 sm:grid-cols-3">
        <div><label className="mb-1 block text-xs text-muted">Min</label><Input type="number" value={min} onChange={(e) => setMin(+e.target.value)} /></div>
        <div><label className="mb-1 block text-xs text-muted">Max</label><Input type="number" value={max} onChange={(e) => setMax(+e.target.value)} /></div>
        <div><label className="mb-1 block text-xs text-muted">Count</label><Input type="number" min={1} max={100} value={count} onChange={(e) => setCount(+e.target.value)} /></div>
      </div>
      <Button className="mt-3" onClick={gen}><Shuffle className="h-4 w-4" /> Generate</Button>
      {nums.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{nums.map((n, i) => <span key={i} className="chip font-mono text-sm">{n}</span>)}</div>}
    </div>
  );
}
