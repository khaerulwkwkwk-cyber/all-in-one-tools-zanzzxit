"use client";
import Link from "next/link";
import { History, ArrowRight } from "lucide-react";
import { useHistory } from "@/hooks/useHistory";
import { TOOLS } from "@/lib/tools";

export default function RecentlyViewed() {
  const { history } = useHistory();
  const recent = history
    .map((h) => TOOLS.find((t) => t.slug === h.slug))
    .filter((t): t is (typeof TOOLS)[number] => Boolean(t))
    .slice(0, 6);
  if (recent.length < 2) return null;
  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold sm:text-2xl">
          <History className="h-5 w-5 text-cyan-300" /> Recently Viewed
        </h2>
        <Link href="/dashboard" className="hidden items-center gap-1 text-xs text-cyan-300 hover:text-white sm:inline-flex">
          Dashboard <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {recent.map((t) => {
          const Icon = t.icon;
          return (
            <Link key={t.slug} href={t.href} className="card !p-3 group flex flex-col items-center gap-2 text-center">
              <span className="icon-box group-hover:scale-110 transition">
                <Icon className="h-4 w-4 text-cyan-300" />
              </span>
              <span className="text-[11px] font-medium leading-tight line-clamp-2">{t.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
