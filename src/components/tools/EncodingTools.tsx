"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";
function EncoderTool({ mode, fn, title }: { mode: string; fn: (s: string) => string; title: string }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const run = () => {
    setError("");
    try { setOutput(fn(input)); }
    catch { setError("Input tidak valid untuk " + title); setOutput(""); }
  };
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card">
        <label className="mb-2 block text-xs text-muted">Input</label>
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} rows={10} placeholder="Tulis teks..." />
        <div className="mt-3 flex gap-2">
          <Button size="sm" onClick={run}><RefreshCw className="h-4 w-4" /> {mode}</Button>
          <Button size="sm" variant="ghost" onClick={() => { setInput(""); setOutput(""); setError(""); }}>Clear</Button>
        </div>
      </div>
      <div className="card">
        <label className="mb-2 block text-xs text-muted">Output</label>
        {error ? <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</div> : <Textarea value={output} readOnly rows={10} placeholder="Hasil..." />}
        {output && (
          <button onClick={async () => { if (await copyToClipboard(output)) { setCopied(true); setTimeout(() => setCopied(false), 1200); } }} className="mt-3 text-xs text-muted hover:text-white">
            {copied ? <Check className="mr-1 inline h-3 w-3" /> : <Copy className="mr-1 inline h-3 w-3" />}{copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>
    </div>
  );
}
export function Base64Tool({ mode }: { mode: "encode" | "decode" }) {
  const fn = mode === "encode" ? (s: string) => btoa(unescape(encodeURIComponent(s))) : (s: string) => decodeURIComponent(escape(atob(s.trim())));
  return <EncoderTool mode={mode === "encode" ? "Encode" : "Decode"} fn={fn} title={mode} />;
}
export function UrlTool({ mode }: { mode: "encode" | "decode" }) {
  const fn = mode === "encode" ? encodeURIComponent : decodeURIComponent;
  return <EncoderTool mode={mode === "encode" ? "Encode" : "Decode"} fn={fn} title={mode} />;
}
