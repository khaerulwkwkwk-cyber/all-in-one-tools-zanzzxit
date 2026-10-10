import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#060b18",
        surface: "#0d1424",
        elevated: "#131c32",
        deep: "#040813",
        border: "rgba(34,211,238,0.15)",
        muted: "#8b9bb8",
        accent: {
          blue: "#22d3ee",
          sky: "#38bdf8",
          deep: "#0ea5e9",
          electric: "#00e5ff",
        },
        success: "#10b981",
        danger: "#ef4444",
        warning: "#f59e0b",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: { "2xl": "1rem", "3xl": "1.25rem" },
      boxShadow: {
        glow: "0 0 40px -12px rgba(34,211,238,0.65)",
        card: "0 20px 40px -20px rgba(34,211,238,0.35)",
        blue: "0 20px 40px -20px rgba(56,189,248,0.45)",
      },
      animation: {
        "fade-in": "fadeIn .5s ease forwards",
        "slide-up": "slideUp .5s ease forwards",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
