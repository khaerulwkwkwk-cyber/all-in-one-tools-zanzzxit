"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Download, Image as ImageIcon, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
type Mode = "compress" | "resize" | "convert";
export default function ImageTools() {
  const [mode, setMode] = useState<Mode>("compress");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [out, setOut] = useState("");
  const [outSize, setOutSize] = useState(0);
  const [quality, setQuality] = useState(0.7);
  const [width, setWidth] = useState(800);
  const [format, setFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/jpeg");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const onFile = (f: File) => { setError(""); setFile(f); setOut(""); setPreview(URL.createObjectURL(f)); };
  const processImage = async () => {
    if (!file) return;
    setProcessing(true); setError("");
    try {
      const img = await loadImage(preview);
      const canvas = document.createElement("canvas");
      let w = img.naturalWidth, h = img.naturalHeight;
      if (mode === "resize" && width > 0 && img.naturalWidth > width) {
        h = Math.round((width / img.naturalWidth) * img.naturalHeight);
        w = width;
      }
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, w, h);
      const mime = mode === "convert" ? format : file.type === "image/png" ? "image/png" : "image/jpeg";
      const dataUrl = canvas.toDataURL(mime, quality);
      setOut(dataUrl);
      setOutSize(Math.round((dataUrl.length - "data:".length) * 3 / 4));
    } catch { setError("Gagal memproses gambar."); }
    finally { setProcessing(false); }
  };
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
      <div className="card">
        <div className="mb-4 flex flex-wrap gap-1.5">
          {(["compress", "resize", "convert"] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)} className={cn("chip capitalize", mode === m && "chip-active")}>{m}</button>
          ))}
        </div>
        <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) onFile(f); }} onClick={() => inputRef.current?.click()}
          className="grid cursor-pointer place-items-center rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.01] p-10 text-center transition hover:border-violet-400/40">
          <Upload className="mb-3 h-8 w-8 text-violet-300" />
          <p className="text-sm">Drag & drop gambar, atau <span className="text-violet-300">pilih file</span></p>
          <p className="mt-1 text-xs text-muted">PNG, JPG, WEBP — max 10MB · semua proses di browser</p>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) { if (f.size > 10 * 1024 * 1024) { setError("File > 10MB"); return; } onFile(f); } }} />
        </div>
        {file && (
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-sm">
            <ImageIcon className="h-4 w-4 text-violet-300" />
            <span className="flex-1 truncate">{file.name}</span>
            <span className="text-xs text-muted">{(file.size / 1024).toFixed(1)} KB</span>
            <button onClick={() => { setFile(null); setPreview(""); setOut(""); }} className="text-muted hover:text-white"><X className="h-4 w-4" /></button>
          </div>
        )}
        {error && <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</div>}
        {file && <div className="mt-4"><Button onClick={processImage} loading={processing}>Process Image</Button></div>}
      </div>
      <div className="card space-y-4">
        {mode === "compress" && (
          <div>
            <label className="mb-1 block text-xs text-muted">Quality: {Math.round(quality * 100)}%</label>
            <input type="range" min={0.1} max={1} step={0.05} value={quality} onChange={(e) => setQuality(+e.target.value)} className="w-full accent-violet-500" />
          </div>
        )}
        {mode === "resize" && (
          <div><label className="mb-1 block text-xs text-muted">Max Width</label><input type="number" value={width} onChange={(e) => setWidth(+e.target.value)} className="input-base" /></div>
        )}
        {mode === "convert" && (
          <div>
            <label className="mb-1 block text-xs text-muted">Target Format</label>
            <select value={format} onChange={(e) => setFormat(e.target.value as any)} className="input-base">
              <option value="image/jpeg">JPEG</option><option value="image/png">PNG</option><option value="image/webp">WEBP</option>
            </select>
          </div>
        )}
        <div className="border-t border-white/5 pt-4">
          <h4 className="mb-3 text-xs font-semibold text-muted">Preview</h4>
          {out ? (
            <>
              <img src={out} alt="output" className="w-full rounded-xl border border-white/10" />
              <div className="mt-2 flex items-center justify-between text-xs text-muted">
                <span>Output: {(outSize / 1024).toFixed(1)} KB</span>
                <a href={out} download={`processed.${format.split("/")[1]}`} className="text-violet-300 hover:text-cyan-300"><Download className="mr-1 inline h-3 w-3" />Download</a>
              </div>
            </>
          ) : preview ? (
            <img src={preview} alt="original" className="w-full rounded-xl border border-white/10 opacity-60" />
          ) : <div className="grid h-40 place-items-center rounded-xl border border-white/5 text-xs text-muted">No image</div>}
        </div>
      </div>
    </div>
  );
}
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = src;
  });
}
