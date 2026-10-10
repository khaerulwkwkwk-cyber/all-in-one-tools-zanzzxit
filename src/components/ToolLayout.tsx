"use client";
import Link from "next/link";
import { useEffect } from "react";
import { ChevronRight, Star } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useHistory } from "@/hooks/useHistory";
import { cn } from "@/lib/utils";
import ShareButton from "./ShareButton";

interface Props {
  slug: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function ToolLayout({ slug, title, description, children }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { pushHistory } = useHistory();
  const fav = isFavorite(slug);

  useEffect(() => { pushHistory(slug); }, [slug, pushHistory]);

  return (
    <div className="relative z-10 animate-[slideUp_.5s_ease]">
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-xs text-muted">
        <Link href="/" className="transition hover:text-white">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/tools" className="transition hover:text-white">Tools</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-white">{title}</span>
      </nav>
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ShareButton title={title} />
          <button
            onClick={() => toggleFavorite(slug)}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition",
              fav
                ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                : "border-cyan-400/20 bg-cyan-400/5 text-muted hover:border-cyan-400/50 hover:text-white"
            )}
          >
            <Star className={cn("h-4 w-4", fav && "fill-amber-300")} />
            {fav ? "Favorited" : "Favorite"}
          </button>
        </div>
      </header>
      <div className="relative z-10 space-y-6">{children}</div>
    </div>
  );
}
