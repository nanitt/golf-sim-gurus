import type { MetadataRoute } from "next";

const BASE_URL = "https://golfsimulators.ca";

const staticRoutes = [
  "",
  "/about",
  "/contact",
  "/compare",
  "/quiz",
  "/gallery",
];

const gallerySlugs = [
  "modern-basement-retreat",
  "garage-conversion",
  "dedicated-wing-build",
  "urban-condo-studio",
  "lakehouse-entertainment-room",
  "executive-home-office",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const galleryEntries = gallerySlugs.map((slug) => ({
    url: `${BASE_URL}/gallery/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...galleryEntries];
}
