"use client";
import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { toast } from "./Toast";

export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && navigator.share) {
      try { await navigator.share({ title, url }); return; } catch {}
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast("Link copied", "success");
      setTimeout(() => setCopied(false), 1600);
    } catch { toast("Failed to copy", "error"); }
  };
  return (
    <button onClick={share} className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-3 py-2 text-xs font-medium text-muted transition hover:border-cyan-400/50 hover:text-white">
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Share2 className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Share"}
    </button>
  );
}
