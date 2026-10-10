"use client";

interface Slice { label: string; value: number; color: string; }
interface Props {
  data: Slice[];
  size?: number;
}

export default function DonutChart({ data, size = 160 }: Props) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const radius = size / 2 - 12;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * radius;

  let offset = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth="14"
      />
      {data.map((d, i) => {
        const frac = d.value / total;
        const len = frac * circ;
        const el = (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={d.color}
            strokeWidth="14"
            strokeDasharray={`${len} ${circ - len}`}
            strokeDashoffset={-offset}
            transform={`rotate(-90 ${cx} ${cy})`}
            strokeLinecap="butt"
            style={{ filter: `drop-shadow(0 0 6px ${d.color}80)` }}
          />
        );
        offset += len;
        return el;
      })}
      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        className="fill-white"
        style={{ fontSize: 20, fontWeight: 700 }}
      >
        {total}
      </text>
      <text
        x={cx}
        y={cy + 14}
        textAnchor="middle"
        className="fill-muted"
        style={{ fontSize: 10 }}
      >
        Total
      </text>
    </svg>
  );
}
