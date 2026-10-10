"use client";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem("zanzzxit:theme") as Theme) || "dark";
    setTheme(saved);
    setMounted(true);
    // apply immediately
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(saved);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("zanzzxit:theme", theme);
  }, [theme, mounted]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, setTheme, toggle, mounted };
}
