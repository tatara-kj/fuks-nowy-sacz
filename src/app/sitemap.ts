import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fuks-nowy-sacz.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date("2026-08-17"), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/polityka-prywatnosci`, lastModified: new Date("2026-08-17"), changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/polityka-cookies`, lastModified: new Date("2026-08-17"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
