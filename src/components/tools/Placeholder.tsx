"use client";
import { Construction, Sparkles } from "lucide-react";
export default function Placeholder({ slug }: { slug: string }) {
  return (
    <div className="card flex flex-col items-center gap-3 py-16 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.03]">
        <Construction className="h-6 w-6 text-violet-300" />
      </span>
      <h3 className="text-lg font-semibold">Tool belum tersedia</h3>
      <p className="max-w-md text-sm text-muted">
        <span className="chip mr-2"><Sparkles className="h-3 w-3" /> DEMO</span>
        Tool <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs">{slug}</code> sedang dalam pengembangan.
      </p>
    </div>
  );
}
