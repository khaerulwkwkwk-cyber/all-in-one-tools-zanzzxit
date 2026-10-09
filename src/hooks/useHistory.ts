"use client";
import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
export interface HistoryEntry { slug: string; visitedAt: number; }
export function useHistory() {
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>("zanzzxit:history", []);
  const push = useCallback((slug: string) => {
    setHistory((h) => {
      const next = [{ slug, visitedAt: Date.now() }, ...h.filter((e) => e.slug !== slug)];
      return next.slice(0, 30);
    });
  }, [setHistory]);
  const clear = useCallback(() => setHistory([]), [setHistory]);
  return { history, pushHistory: push, clearHistory: clear };
}
