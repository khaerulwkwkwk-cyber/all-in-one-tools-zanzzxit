"use client";

interface Point { x: number; y: number; label?: string; }
interface Props {
  data: Point[];
  width?: number;
  height?: number;
  color?: string;
  fill?: string;
}

export default function LineChart({
  data,
  width = 500,
  height = 180,
  color = "#22d3ee",
  fill = "rgba(34,211,238,0.25)",
}: Props) {
  if (!data.length) return null;
  const pad = { l: 8, r: 8, t: 8, b: 8 };
  const w = width - pad.l - pad.r;
  const h = height - pad.t - pad.b;
  const maxY = Math.max(...data.map((d) => d.y), 1);
  const minY = Math.min(...data.map((d) => d.y), 0);
  const rangeY = maxY - minY || 1;

  const points = data.map((d, i) => {
    const x = pad.l + (i / (data.length - 1)) * w;
    const y = pad.t + h - ((d.y - minY) / rangeY) * h;
    return { x, y };
  });

  const pathLine = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const pathArea = `${pathLine} L${points[points.length - 1].x},${pad.t + h} L${points[0].x},${pad.t + h} Z`;
  const id = "line-grad-" + Math.random().toString(36).slice(2, 8);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fill} />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <filter id={`glow-${id}`}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {[0.25, 0.5, 0.75].map((p) => (
        <line
          key={p}
          x1={pad.l}
          x2={width - pad.r}
          y1={pad.t + h * p}
          y2={pad.t + h * p}
          stroke="rgba(255,255,255,0.04)"
          strokeDasharray="2 4"
        />
      ))}
      <path d={pathArea} fill={`url(#${id})`} />
      <path
        d={pathLine}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#glow-${id})`}
      />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.5" fill={color} />
      ))}
    </svg>
  );
}
