"use client";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Tool } from "@/lib/tools";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";
export default function ToolCard({ tool }: { tool: Tool }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(tool.slug);
  const Icon = tool.icon;
  return (
    <div className="card glow-border group relative flex flex-col">
      <div className="flex items-start justify-between">
        <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] transition group-hover:scale-105">
          <Icon className="h-5 w-5 text-violet-300 transition group-hover:text-cyan-300" />
        </span>
        <button aria-label="Toggle favorite" onClick={(e) => { e.preventDefault(); toggleFavorite(tool.slug); }} className={cn("grid h-8 w-8 place-items-center rounded-lg border border-white/10 transition", fav ? "text-yellow-300 bg-yellow-500/10 border-yellow-500/30" : "text-muted hover:text-white")}>
          <Star className={cn("h-4 w-4", fav && "fill-yellow-300")} />
        </button>
      </div>
      <div className="mt-4 flex-1">
        <h3 className="text-sm font-semibold">{tool.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-muted">{tool.description}</p>
      </div>
      <Link href={tool.href} className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-violet-300 transition group-hover:text-cyan-300">
        Open Tool <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
