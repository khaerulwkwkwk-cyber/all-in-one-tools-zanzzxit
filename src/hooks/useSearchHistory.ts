"use client";
import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useSearchHistory() {
  const [history, setHistory] = useLocalStorage<string[]>("zanzzxit:search", []);
  const push = useCallback((q: string) => {
    const s = q.trim().toLowerCase();
    if (s.length < 2) return;
    setHistory((h) => [s, ...h.filter((x) => x !== s)].slice(0, 8));
  }, [setHistory]);
  const remove = useCallback((q: string) => setHistory((h) => h.filter((x) => x !== q)), [setHistory]);
  const clear = useCallback(() => setHistory([]), [setHistory]);
  return { history, push, remove, clear };
}
