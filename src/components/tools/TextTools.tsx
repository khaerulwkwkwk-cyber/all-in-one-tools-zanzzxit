"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { CaseSensitive, Eraser, FileText, Wand2 } from "lucide-react";
function useText() { const [text, setText] = useState(""); return { text, setText }; }
export function TextCounter() {
  const { text, setText } = useText();
  const chars = text.length, noSpaces = text.replace(/\s/g, "").length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split(/\n/).length : 0;
  return (
    <div className="card">
      <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={10} placeholder="Tulis atau tempel teks..." />
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[["Chars", chars], ["No Spaces", noSpaces], ["Words", words], ["Lines", lines]].map(([l, v]) => (
          <div key={l as string} className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-center">
            <div className="text-lg font-semibold">{v}</div><div className="text-xs text-muted">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
export function CaseConverter() {
  const { text, setText } = useText();
  const [out, setOut] = useState("");
  const opts = [
    ["UPPERCASE", (s: string) => s.toUpperCase()],
    ["lowercase", (s: string) => s.toLowerCase()],
    ["Title Case", (s: string) => s.replace(/\w\S*/g, (t) => t[0].toUpperCase() + t.slice(1).toLowerCase())],
    ["Sentence case", (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()],
    ["camelCase", (s: string) => s.replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()).replace(/^(.)/, (c) => c.toLowerCase())],
    ["snake_case", (s: string) => s.trim().toLowerCase().replace(/\s+/g, "_")],
  ] as const;
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card"><Textarea value={text} onChange={(e) => setText(e.target.value)} rows={10} placeholder="Input..." /></div>
      <div className="card">
        <div className="mb-3 flex flex-wrap gap-2">
          {opts.map(([label, fn]) => (
            <button key={label} onClick={() => setOut(fn(text))} className="chip"><CaseSensitive className="h-3 w-3" /> {label}</button>
          ))}
        </div>
        <Textarea value={out} readOnly rows={10} placeholder="Hasil..." />
      </div>
    </div>
  );
}
export function RemoveDuplicates() {
  const { text, setText } = useText();
  const [out, setOut] = useState("");
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card"><Textarea value={text} onChange={(e) => setText(e.target.value)} rows={10} placeholder="Satu item per baris..." /></div>
      <div className="card">
        <Button onClick={() => setOut(Array.from(new Set(text.split("\n").map((l) => l.trim()))).filter(Boolean).join("\n"))}>
          <Eraser className="h-4 w-4" /> Remove Duplicates
        </Button>
        <Textarea className="mt-3" value={out} readOnly rows={10} />
      </div>
    </div>
  );
}
export function TextFormatter() {
  const { text, setText } = useText();
  const [out, setOut] = useState("");
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card"><Textarea value={text} onChange={(e) => setText(e.target.value)} rows={10} /></div>
      <div className="card">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setOut(text.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim())} className="chip"><Wand2 className="h-3 w-3" /> Clean Whitespace</button>
          <button onClick={() => setOut(text.split("\n").map((l) => l.trim()).filter(Boolean).join("\n"))} className="chip"><FileText className="h-3 w-3" /> Trim Lines</button>
          <button onClick={() => setOut(text.split("\n").sort().join("\n"))} className="chip">Sort Lines</button>
        </div>
        <Textarea className="mt-3" value={out} readOnly rows={10} />
      </div>
    </div>
  );
}
