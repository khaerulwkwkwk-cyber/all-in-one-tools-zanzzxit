import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#05060a", surface: "#0b0d14", elevated: "#111420",
        border: "rgba(255,255,255,0.08)", muted: "#8b90a4",
        accent: { DEFAULT: "#7c5cff", cyan: "#22d3ee", violet: "#a855f7" },
      },
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"], mono: ["JetBrains Mono", "monospace"] },
      boxShadow: { glow: "0 0 40px -12px rgba(124,92,255,0.55)", card: "0 4px 24px -8px rgba(0,0,0,0.6)" },
      animation: { "fade-in": "fadeIn .5s ease forwards", "slide-up": "slideUp .5s ease forwards", "shimmer": "shimmer 2s linear infinite" },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
      },
    },
  },
  plugins: [],
};
export default config;
