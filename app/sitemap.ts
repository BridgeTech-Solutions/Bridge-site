import { MetadataRoute } from "next";
import { SERVICES } from "@/lib/constants";

const BASE_URL = "https://bridgetech-solutions.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                        lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/services`,          lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/entreprise`,        lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`,           lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/assent`,            lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  // Pages services dynamiques
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url:             `${BASE_URL}/services/${s.slug}`,
    lastModified:    now,
    changeFrequency: "monthly" as const,
    priority:        0.8,
  }));

  return [...staticPages, ...servicePages];
}
