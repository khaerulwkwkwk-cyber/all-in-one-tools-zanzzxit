"use client";
import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";
interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

let toastId = 0;
const listeners: ((t: ToastItem) => void)[] = [];

export function toast(message: string, type: ToastType = "success") {
  const t = { id: ++toastId, message, type };
  listeners.forEach((l) => l(t));
}

export function ToastContainer() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const listener = (t: ToastItem) => {
      setItems((prev) => [...prev, t]);
      setTimeout(() => {
        setItems((prev) => prev.filter((x) => x.id !== t.id));
      }, 2800);
    };
    listeners.push(listener);
    return () => {
      const i = listeners.indexOf(listener);
      if (i > -1) listeners.splice(i, 1);
    };
  }, []);

  const dismiss = (id: number) =>
    setItems((prev) => prev.filter((x) => x.id !== id));

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[200] flex flex-col gap-2 sm:bottom-6 sm:right-6">
      {items.map((t) => {
        const Icon =
          t.type === "success"
            ? CheckCircle2
            : t.type === "error"
            ? AlertCircle
            : Info;
        const colors =
          t.type === "success"
            ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200"
            : t.type === "error"
            ? "border-red-400/40 bg-red-400/10 text-red-200"
            : "border-cyan-400/40 bg-cyan-400/10 text-cyan-200";
        return (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm shadow-lg backdrop-blur-lg ${colors} animate-[slideUp_.3s_ease]`}
            style={{ minWidth: 220, maxWidth: 340 }}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="flex-1">{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              className="shrink-0 opacity-60 transition hover:opacity-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
