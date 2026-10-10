"use client";

interface Bar { label: string; value: number; color?: string; }
interface Props {
  data: Bar[];
  height?: number;
  color1?: string;
  color2?: string;
}

export default function BarChart({
  data,
  height = 180,
  color1 = "#22d3ee",
  color2 = "#3b82f6",
}: Props) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {data.map((d, i) => {
        const h = (d.value / max) * (height - 24);
        const h1 = h * 0.7;
        const h2 = h;
        return (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div className="flex w-full items-end justify-center gap-0.5" style={{ height: height - 24 }}>
              <div
                className="w-2 rounded-t"
                style={{ height: h1, background: color1, boxShadow: `0 0 12px ${color1}80` }}
              />
              <div
                className="w-2 rounded-t"
                style={{ height: h2, background: color2, boxShadow: `0 0 12px ${color2}80` }}
              />
            </div>
            <span className="text-[10px] text-muted">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}
