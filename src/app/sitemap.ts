import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://all-in-one-tools-zanzzxit.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/tools`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/dashboard`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];
  const toolPages: MetadataRoute.Sitemap = TOOLS.map((t) => ({
    url: `${BASE}/tools/${t.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [...pages, ...toolPages];
}
