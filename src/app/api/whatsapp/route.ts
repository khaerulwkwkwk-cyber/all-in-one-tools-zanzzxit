import { NextResponse } from "next/server";
export const runtime = "nodejs";
const RL = new Map<string, { n: number; t: number }>();
function rateLimit(ip: string, max = 30) {
  const now = Date.now();
  const e = RL.get(ip) || { n: 0, t: now };
  if (now - e.t > 60_000) { e.n = 0; e.t = now; }
  e.n++; RL.set(ip, e);
  return e.n <= max;
}
const DIAL: Record<string, string> = {
  "62": "Indonesia", "60": "Malaysia", "65": "Singapore", "1": "United States/Canada",
  "44": "United Kingdom", "91": "India", "81": "Japan", "82": "South Korea",
  "86": "China", "61": "Australia", "49": "Germany", "33": "France", "7": "Russia",
  "63": "Philippines", "66": "Thailand", "84": "Vietnam", "880": "Bangladesh",
  "92": "Pakistan", "20": "Egypt", "234": "Nigeria", "27": "South Africa", "966": "Saudi Arabia",
};
function resolveCountry(digits: string) {
  const codes = Object.keys(DIAL).sort((a, b) => b.length - a.length);
  for (const c of codes) if (digits.startsWith(c)) return { code: c, name: DIAL[c] };
  return { code: "", name: "Unknown" };
}
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "anon";
  if (!rateLimit(ip)) return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const raw = (body?.number || "").toString().trim();
  const digits = raw.replace(/[^\d]/g, "");
  const valid = digits.length >= 8 && digits.length <= 15;
  const { code, name } = resolveCountry(digits);
  const national = code ? digits.slice(code.length) : digits;
  let formatted = raw;
  if (valid && code) {
    const groups = national.match(/.{1,4}/g)?.join(" ") || national;
    formatted = `+${code} ${groups}`;
  }
  return NextResponse.json({
    valid,
    country: name,
    countryCode: code ? `+${code}` : "",
    e164: code ? `+${digits}` : digits,
    formatted,
    status: "Unknown",
    demo: true,
    notes: "Status akun WhatsApp tidak dapat diverifikasi tanpa API resmi.",
  });
}
