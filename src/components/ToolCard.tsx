"use client";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Tool } from "@/lib/tools";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

const CAT_COLOR: Record<string, string> = {
  Downloader: "from-rose-500/25 to-orange-500/15 border-rose-500/30",
  WhatsApp: "from-emerald-500/25 to-teal-500/15 border-emerald-500/30",
  Developer: "from-cyan-400/25 to-sky-500/15 border-cyan-400/35",
  Image: "from-pink-500/25 to-fuchsia-500/15 border-pink-500/30",
  Text: "from-amber-500/25 to-yellow-500/15 border-amber-500/30",
  Utilities: "from-cyan-500/25 to-blue-500/15 border-cyan-500/30",
};

const CAT_ICON_COLOR: Record<string, string> = {
  Downloader: "text-rose-300",
  WhatsApp: "text-emerald-300",
  Developer: "text-cyan-300",
  Image: "text-pink-300",
  Text: "text-amber-300",
  Utilities: "text-cyan-300",
};

export default function ToolCard({ tool }: { tool: Tool }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(tool.slug);
  const Icon = tool.icon;
  const catBg = CAT_COLOR[tool.category] || CAT_COLOR.Developer;
  const catIcon = CAT_ICON_COLOR[tool.category] || "text-cyan-300";

  return (
    <div className="card glow-border group relative flex flex-col">
      <div className="flex items-start justify-between">
        <span className={cn("icon-box bg-gradient-to-br border", catBg)}>
          <Icon className={cn("h-5 w-5", catIcon)} />
        </span>
        <button
          aria-label="Toggle favorite"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(tool.slug);
          }}
          className={cn(
            "grid h-8 w-8 place-items-center rounded-lg border transition",
            fav
              ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
              : "border-cyan-400/18 bg-cyan-400/5 text-muted hover:border-cyan-400/45 hover:text-white"
          )}
        >
          <Star className={cn("h-4 w-4", fav && "fill-amber-300")} />
        </button>
      </div>

      <div className="mt-4 flex-1">
        <h3 className="text-sm font-semibold">{tool.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-muted">{tool.description}</p>
      </div>

      <Link
        href={tool.href}
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-cyan-300 transition group-hover:text-blue-300"
      >
        Open Tool
        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
