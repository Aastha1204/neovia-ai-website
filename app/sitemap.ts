import type { MetadataRoute } from "next";
import { OWNER } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: OWNER.siteUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${OWNER.siteUrl}/demos`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${OWNER.siteUrl}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${OWNER.siteUrl}/book-meeting`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${OWNER.siteUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
