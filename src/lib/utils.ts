import clsx, { ClassValue } from "clsx";
export const cn = (...inputs: ClassValue[]) => clsx(...inputs);
export const formatDate = (ts: number) =>
  new Date(ts).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
export const copyToClipboard = async (text: string) => {
  try { await navigator.clipboard.writeText(text); return true; } catch { return false; }
};
