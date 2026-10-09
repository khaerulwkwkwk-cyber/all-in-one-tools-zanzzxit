"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Download, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
const TYPES = ["Text", "URL", "WhatsApp", "WiFi", "Email", "Phone"] as const;
type Kind = (typeof TYPES)[number];
export default function QrGenerator() {
  const [kind, setKind] = useState<Kind>("Text");
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState(320);
  const [margin, setMargin] = useState(2);
  const [ec, setEc] = useState<"L" | "M" | "Q" | "H">("M");
  const [format, setFormat] = useState<"png" | "svg">("png");
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const build = async () => {
      setError("");
      try {
        if (format === "png") {
          const url = await QRCode.toDataURL(text || " ", { width: size, margin, errorCorrectionLevel: ec });
          setDataUrl(url);
        } else {
          const svg = await QRCode.toString(text || " ", { type: "svg", margin, errorCorrectionLevel: ec, width: size });
          setDataUrl("data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg))));
        }
      } catch { setError("Gagal generate QR."); }
    };
    build();
  }, [text, size, margin, ec, format]);
  const download = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl; a.download = `qr.${format}`; a.click();
  };
  const ph = (k: Kind) => {
    switch (k) {
      case "URL": return "https://example.com";
      case "WhatsApp": return "6281234567890";
      case "Email": return "mailto:hello@example.com";
      case "Phone": return "tel:+6281234567890";
      case "WiFi": return "WIFI:T:WPA;S:MySSID;P:MyPassword;;";
      default: return "Tulis teks...";
    }
  };
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
      <div className="card">
        <div className="mb-4 flex flex-wrap gap-1.5">
          {TYPES.map((t) => (
            <button key={t} onClick={() => { setKind(t); setText(""); }} className={cn("chip", kind === t && "chip-active")}>{t}</button>
          ))}
        </div>
        <label className="mb-1 block text-xs text-muted">Content</label>
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder={ph(kind)} />
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs text-muted">Size ({size}px)</label>
            <input type="range" min={128} max={720} step={16} value={size} onChange={(e) => setSize(+e.target.value)} className="w-full accent-violet-500" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">Margin ({margin})</label>
            <input type="range" min={0} max={8} value={margin} onChange={(e) => setMargin(+e.target.value)} className="w-full accent-violet-500" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">Error Correction</label>
            <select value={ec} onChange={(e) => setEc(e.target.value as any)} className="input-base">
              <option value="L">Low</option><option value="M">Medium</option><option value="Q">Quartile</option><option value="H">High</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1.5">
            {(["png", "svg"] as const).map((f) => (
              <button key={f} onClick={() => setFormat(f)} className={cn("chip uppercase", format === f && "chip-active")}>{f}</button>
            ))}
          </div>
          <Button size="sm" onClick={download} disabled={!dataUrl}><Download className="h-4 w-4" /> Download</Button>
        </div>
      </div>
      <div className="card grid min-w-[300px] place-items-center">
        {error ? <p className="text-sm text-red-300">{error}</p> : dataUrl ? (
          <img src={dataUrl} alt="QR" className="max-h-[340px] rounded-xl border border-white/10 bg-white p-2" />
        ) : <div className="skeleton h-[280px] w-[280px]" />}
        <p className="mt-4 flex items-center gap-1.5 text-xs text-muted"><QrCode className="h-3.5 w-3.5" /> Realtime preview</p>
      </div>
    </div>
  );
}
