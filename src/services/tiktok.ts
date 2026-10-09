export interface TikTokMedia {
  id: string; title: string; author: string; thumbnail: string;
  duration?: number;
  downloads: { label: string; url: string; quality: string }[];
}
export interface TikTokResult { demo: boolean; data: TikTokMedia; }
const URL_RE = /^https?:\/\/(www\.|vm\.|vt\.|m\.)?tiktok\.com\/.+/i;
export const isValidTikTokUrl = (url: string) => URL_RE.test(url.trim());
export async function fetchTikTok(url: string, signal?: AbortSignal): Promise<TikTokResult> {
  const res = await fetch("/api/tiktok", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }), signal,
  });
  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    throw new Error(j.error || "Something went wrong.");
  }
  return res.json();
}
