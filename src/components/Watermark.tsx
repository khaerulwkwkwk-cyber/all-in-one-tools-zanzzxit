"use client";

export default function Watermark() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-3 right-3 z-[90] select-none"
    >
      <div className="flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-[#0d1424]/70 px-2.5 py-1 backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.9)]" />
        <span className="font-mono text-[10px] font-semibold tracking-tight text-cyan-300/80">
          ©zann.id
        </span>
      </div>
    </div>
  );
}
