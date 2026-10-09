"use client";
import { useState } from "react";
import { Braces, Check, Copy, Download, Minimize2, Sparkles, Trash2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { copyToClipboard } from "@/lib/utils";
export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const run = (mode: "format" | "minify" | "validate") => {
    setError("");
    if (!input.trim()) { setError("JSON kosong."); setOutput(""); return; }
    try {
      const parsed = JSON.parse(input);
      if (mode === "minify") setOutput(JSON.stringify(parsed));
      else setOutput(JSON.stringify(parsed, null, 2));
      if (mode === "validate") setOutput("✓ Valid JSON");
    } catch (e: any) { setError("JSON tidak valid: " + e.message); setOutput(""); }
  };
  const copy = async () => {
    if (!output) return;
    if (await copyToClipboard(output)) { setCopied(true); setTimeout(() => setCopied(false), 1500); }
  };
  const download = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "formatted.json"; a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold"><Braces className="h-4 w-4 text-violet-300" /> Input</div>
          <button onClick={() => { setInput(""); setOutput(""); setError(""); }} className="text-xs text-muted hover:text-white"><Trash2 className="mr-1 inline h-3 w-3" />Clear</button>
        </div>
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} rows={16} placeholder='{"hello": "world"}' />
        <div className="mt-3 flex flex-wrap gap-2">
          <Button size="sm" onClick={() => run("format")}><Wand2 className="h-4 w-4" /> Format</Button>
          <Button size="sm" variant="ghost" onClick={() => run("minify")}><Minimize2 className="h-4 w-4" /> Minify</Button>
          <Button size="sm" variant="ghost" onClick={() => run("validate")}><Check className="h-4 w-4" /> Validate</Button>
        </div>
      </div>
      <div className="card">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold"><Sparkles className="h-4 w-4 text-cyan-300" /> Output</div>
          <div className="flex gap-2">
            <button onClick={copy} className="text-xs text-muted hover:text-white">{copied ? <Check className="mr-1 inline h-3 w-3" /> : <Copy className="mr-1 inline h-3 w-3" />}{copied ? "Copied" : "Copy"}</button>
            <button onClick={download} className="text-xs text-muted hover:text-white"><Download className="mr-1 inline h-3 w-3" />Download</button>
          </div>
        </div>
        {error ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">{error}</div>
        ) : (
          <Textarea value={output} readOnly rows={16} placeholder="Output akan muncul di sini..." />
        )}
      </div>
    </div>
  );
}
