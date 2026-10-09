import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const RL = new Map<string, { n: number; t: number }>();
function rateLimit(ip: string, max = 30) {
  const now = Date.now();
  const e = RL.get(ip) || { n: 0, t: now };
  if (now - e.t > 60_000) { e.n = 0; e.t = now; }
  e.n++; RL.set(ip, e);
  return e.n <= max;
}
const URL_RE = /^https?:\/\/(www\.|vm\.|vt\.|m\.)?tiktok\.com\/.+/i;
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "anon";
  if (!rateLimit(ip)) return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const url = (body?.url || "").toString().trim();
  if (!url) return NextResponse.json({ error: "URL wajib diisi." }, { status: 400 });
  if (!URL_RE.test(url)) return NextResponse.json({ error: "URL TikTok tidak valid." }, { status: 400 });
  const apiUrl = process.env.TIKTOK_API_URL;
  const apiKey = process.env.TIKTOK_API_KEY;
  if (apiUrl && apiKey) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 15000);
      const r = await fetch(`${apiUrl}?url=${encodeURIComponent(url)}`, { headers: { "x-api-key": apiKey }, signal: ctrl.signal });
      clearTimeout(timer);
      if (!r.ok) throw new Error();
      const provider = await r.json();
      return NextResponse.json({ demo: false, data: provider });
    } catch { return NextResponse.json({ error: "Provider sedang tidak tersedia." }, { status: 502 }); }
  }
  await new Promise((r) => setTimeout(r, 700));
  return NextResponse.json({
    demo: true,
    data: {
      id: "demo",
      title: "Contoh video TikTok (DEMO — provider belum dikonfigurasi)",
      author: "@demo_user",
      thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80",
      duration: 15,
      downloads: [
        { label: "MP4 No Watermark", quality: "720p", url: "#demo" },
        { label: "MP4 Watermark", quality: "720p", url: "#demo" },
        { label: "MP3 Audio", quality: "128kbps", url: "#demo" },
      ],
    },
  });
}
