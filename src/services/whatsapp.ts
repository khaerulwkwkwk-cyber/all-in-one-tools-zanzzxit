export interface WhatsAppResult {
  valid: boolean; country: string; countryCode: string;
  e164: string; formatted: string;
  status: "Available" | "Unavailable" | "Unknown";
  demo: boolean; notes?: string;
}
export async function checkWhatsApp(number: string, signal?: AbortSignal): Promise<WhatsAppResult> {
  const res = await fetch("/api/whatsapp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ number }), signal,
  });
  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    throw new Error(j.error || "Something went wrong.");
  }
  return res.json();
}
