import {
  Download, Youtube, Instagram, Facebook, Twitter, Video,
  MessageCircle, Phone, ShieldCheck,
  Braces, Binary, Link2, Fingerprint, Hash, QrCode, KeyRound,
  Image as ImageIcon, FileText, Type, Calculator,
  Palette, Clock, Ruler, Globe, MonitorSmartphone, Wand2,
  Trash2, Shuffle, CaseSensitive, Search,
} from "lucide-react";
export type ToolCategory = "Downloader" | "WhatsApp" | "Developer" | "Image" | "Text" | "Utilities";
export interface Tool {
  slug: string; name: string; description: string; category: ToolCategory;
  icon: React.ComponentType<{ className?: string; size?: number | string }>;
  keywords: string[]; href: string;
}
const T = (t: Omit<Tool, "href">): Tool => ({ ...t, href: `/tools/${t.slug}` });
export const TOOLS: Tool[] = [
  T({ slug: "tiktok-downloader", name: "TikTok Downloader", category: "Downloader", icon: Video, description: "Download video TikTok tanpa watermark.", keywords: ["tiktok", "video", "download"] }),
  T({ slug: "instagram-downloader", name: "Instagram Downloader", category: "Downloader", icon: Instagram, description: "Download Reels, Foto, & Video IG.", keywords: ["instagram", "ig", "reels"] }),
  T({ slug: "youtube-downloader", name: "YouTube Downloader", category: "Downloader", icon: Youtube, description: "Ekstrak audio & video YouTube.", keywords: ["youtube", "yt", "mp3", "mp4"] }),
  T({ slug: "facebook-downloader", name: "Facebook Downloader", category: "Downloader", icon: Facebook, description: "Download video Facebook HD/SD.", keywords: ["facebook", "fb"] }),
  T({ slug: "twitter-downloader", name: "X/Twitter Downloader", category: "Downloader", icon: Twitter, description: "Simpan video dari X/Twitter.", keywords: ["twitter", "x"] }),
  T({ slug: "media-downloader", name: "Media Downloader", category: "Downloader", icon: Download, description: "Downloader serbaguna multi-platform.", keywords: ["media", "download"] }),
  T({ slug: "whatsapp-checker", name: "WhatsApp Number Checker", category: "WhatsApp", icon: MessageCircle, description: "Validasi format nomor WhatsApp.", keywords: ["whatsapp", "wa", "checker"] }),
  T({ slug: "whatsapp-status", name: "WhatsApp Status Checker", category: "WhatsApp", icon: ShieldCheck, description: "Cek ketersediaan nomor WA.", keywords: ["whatsapp", "status"] }),
  T({ slug: "whatsapp-utilities", name: "WhatsApp Utilities", category: "WhatsApp", icon: Phone, description: "Generator link & pesan WhatsApp.", keywords: ["whatsapp", "link"] }),
  T({ slug: "json-formatter", name: "JSON Formatter", category: "Developer", icon: Braces, description: "Format, minify & validasi JSON.", keywords: ["json", "format"] }),
  T({ slug: "base64-encoder", name: "Base64 Encoder", category: "Developer", icon: Binary, description: "Encode teks ke Base64.", keywords: ["base64", "encode"] }),
  T({ slug: "base64-decoder", name: "Base64 Decoder", category: "Developer", icon: Binary, description: "Decode Base64 ke teks.", keywords: ["base64", "decode"] }),
  T({ slug: "url-encoder", name: "URL Encoder", category: "Developer", icon: Link2, description: "Encode URL komponen.", keywords: ["url", "encode"] }),
  T({ slug: "url-decoder", name: "URL Decoder", category: "Developer", icon: Link2, description: "Decode URL komponen.", keywords: ["url", "decode"] }),
  T({ slug: "uuid-generator", name: "UUID Generator", category: "Developer", icon: Fingerprint, description: "Generate UUID v4.", keywords: ["uuid", "guid"] }),
  T({ slug: "hash-generator", name: "Hash Generator", category: "Developer", icon: Hash, description: "SHA-1/256/512 via WebCrypto.", keywords: ["hash", "sha"] }),
  T({ slug: "qr-generator", name: "QR Generator", category: "Developer", icon: QrCode, description: "Generate QR realtime PNG/SVG.", keywords: ["qr", "barcode"] }),
  T({ slug: "jwt-decoder", name: "JWT Decoder", category: "Developer", icon: KeyRound, description: "Decode payload JWT.", keywords: ["jwt", "token"] }),
  T({ slug: "image-tools", name: "Image Tools", category: "Image", icon: ImageIcon, description: "Compress, resize, convert.", keywords: ["image", "compress", "convert"] }),
  T({ slug: "text-counter", name: "Text Counter", category: "Text", icon: FileText, description: "Hitung kata, karakter, baris.", keywords: ["text", "count"] }),
  T({ slug: "case-converter", name: "Case Converter", category: "Text", icon: CaseSensitive, description: "Ubah case teks.", keywords: ["case", "upper", "lower"] }),
  T({ slug: "remove-duplicates", name: "Remove Duplicate Lines", category: "Text", icon: Trash2, description: "Hapus baris duplikat.", keywords: ["duplicate", "unique"] }),
  T({ slug: "text-formatter", name: "Text Formatter", category: "Text", icon: Wand2, description: "Rapikan & trim teks.", keywords: ["format", "text"] }),
  T({ slug: "random-text", name: "Random Text Generator", category: "Text", icon: Shuffle, description: "Generate teks acak.", keywords: ["random", "text"] }),
  T({ slug: "password-generator", name: "Password Generator", category: "Utilities", icon: KeyRound, description: "Password aman crypto-secure.", keywords: ["password", "generator"] }),
  T({ slug: "random-number", name: "Random Number Generator", category: "Utilities", icon: Shuffle, description: "Angka acak dalam range.", keywords: ["random", "number"] }),
  T({ slug: "color-picker", name: "Color Picker", category: "Utilities", icon: Palette, description: "Pilih & konversi warna.", keywords: ["color", "hex", "rgb"] }),
  T({ slug: "timestamp-converter", name: "Timestamp Converter", category: "Utilities", icon: Clock, description: "Unix ↔ tanggal manusia.", keywords: ["timestamp", "unix"] }),
  T({ slug: "unit-converter", name: "Unit Converter", category: "Utilities", icon: Ruler, description: "Konversi satuan umum.", keywords: ["unit", "convert"] }),
  T({ slug: "calculator", name: "Calculator", category: "Utilities", icon: Calculator, description: "Kalkulator ekspresi.", keywords: ["calc", "matematika"] }),
  T({ slug: "ip-information", name: "IP Information", category: "Utilities", icon: Globe, description: "Info IP publik pengguna.", keywords: ["ip", "geo"] }),
  T({ slug: "user-agent", name: "User Agent Parser", category: "Utilities", icon: MonitorSmartphone, description: "Parse User-Agent string.", keywords: ["ua", "user agent"] }),
];
export const CATEGORIES: { id: ToolCategory | "All"; label: string; icon: any }[] = [
  { id: "All", label: "All Tools", icon: Search },
  { id: "Downloader", label: "Downloader", icon: Download },
  { id: "WhatsApp", label: "WhatsApp", icon: MessageCircle },
  { id: "Developer", label: "Developer", icon: Braces },
  { id: "Image", label: "Image", icon: ImageIcon },
  { id: "Text", label: "Text", icon: Type },
  { id: "Utilities", label: "Utilities", icon: Calculator },
];
export const searchTools = (q: string) => {
  if (!q.trim()) return TOOLS;
  const s = q.toLowerCase();
  return TOOLS.filter((t) => t.name.toLowerCase().includes(s) || t.description.toLowerCase().includes(s) || t.keywords.some((k) => k.includes(s)));
};
