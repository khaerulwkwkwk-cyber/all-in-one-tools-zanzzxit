"use client";
import { MessageCircle, Users, Radio } from "lucide-react";

const CHANNELS = [
  {
    id: "v1",
    label: "Saluran Developer",
    href: "https://whatsapp.com/channel/0029Vb8dCRPEawdi1znr6V1n",
    icon: Radio,
    sub: "Update & info developer",
  },
  {
    id: "v2",
    label: "Saluran vibe_coder09.id",
    href: "https://whatsapp.com/channel/0029Vb87XnFGzzKRmfb9Tb13",
    icon: Users,
    sub: "Tips coding & vibes",
  },
];

interface Props {
  variant?: "sidebar" | "footer" | "inline";
}

export default function WhatsAppChannels({ variant = "sidebar" }: Props) {
  if (variant === "inline") {
    return (
      <div className="flex flex-wrap items-center gap-2">
        {CHANNELS.map((c) => {
          const Icon = c.icon;
          return (
            <a
              key={c.id}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-400/5 px-3 py-2 text-xs font-medium text-emerald-200 transition hover:border-emerald-400/60 hover:bg-emerald-400/15 hover:text-white"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-300 group-hover:scale-110 transition" />
              <span>{c.label}</span>
            </a>
          );
        })}
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <ul className="mt-3 space-y-2 text-sm text-muted">
        {CHANNELS.map((c) => {
          const Icon = c.icon;
          return (
            <li key={c.id}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 transition hover:text-emerald-300"
              >
                <Icon className="h-3.5 w-3.5 text-emerald-400/70 group-hover:text-emerald-300 transition" />
                <span>{c.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  // sidebar variant (default)
  return (
    <div className="flex flex-col gap-1.5">
      <p className="px-1 pb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
        <MessageCircle className="h-3 w-3 text-emerald-400" />
        Join Channel
      </p>
      {CHANNELS.map((c) => {
        const Icon = c.icon;
        return (
          <a
            key={c.id}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-2.5 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] px-3 py-2.5 transition hover:border-emerald-400/45 hover:bg-emerald-400/[0.1]"
          >
            <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-emerald-400/25 to-teal-500/15 border border-emerald-400/30 transition group-hover:scale-105">
              <Icon className="h-3.5 w-3.5 text-emerald-300" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-semibold text-white">
                {c.label}
              </p>
              <p className="truncate text-[10px] text-muted">{c.sub}</p>
            </div>
            <MessageCircle className="h-3.5 w-3.5 shrink-0 text-emerald-400/60 transition group-hover:text-emerald-300" />
          </a>
        );
      })}
    </div>
  );
}
