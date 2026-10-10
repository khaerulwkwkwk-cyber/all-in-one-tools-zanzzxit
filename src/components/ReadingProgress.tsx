"use client";
import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const top = el.scrollTop || document.body.scrollTop;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (top / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[60] h-0.5 w-full">
      <div className="h-full bg-gradient-to-r from-cyan-400 to-sky-500" style={{ width: `${progress}%`, boxShadow: "0 0 12px rgba(34,211,238,0.7)" }} />
    </div>
  );
}
