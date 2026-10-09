"use client";
import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
export function useFavorites() {
  const [favs, setFavs] = useLocalStorage<string[]>("zanzzxit:favorites", []);
  const toggle = useCallback((slug: string) => {
    setFavs((f) => (f.includes(slug) ? f.filter((s) => s !== slug) : [...f, slug]));
  }, [setFavs]);
  return { favorites: favs, toggleFavorite: toggle, isFavorite: (s: string) => favs.includes(s) };
}
