"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-xl border border-cyan-400/20 bg-cyan-400/5" />
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="group relative grid h-9 w-9 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-400/5 text-muted transition hover:border-cyan-400/50 hover:text-white"
    >
      <Sun
        className={`absolute h-4 w-4 transition-all ${
          theme === "light" ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
        }`}
      />
      <Moon
        className={`absolute h-4 w-4 transition-all ${
          theme === "dark" ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
        }`}
      />
    </button>
  );
}
