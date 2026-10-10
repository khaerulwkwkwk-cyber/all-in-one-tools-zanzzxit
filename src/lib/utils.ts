import clsx, { ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => clsx(...inputs);

export const formatDate = (ts: number) =>
  new Date(ts).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    // Dynamic import to avoid circular dependency
    const { toast } = await import("@/components/Toast");
    toast("Copied to clipboard", "success");
    return true;
  } catch {
    const { toast } = await import("@/components/Toast");
    toast("Failed to copy", "error");
    return false;
  }
};
