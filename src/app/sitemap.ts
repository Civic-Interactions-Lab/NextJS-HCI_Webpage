import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/site";

const ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about/events", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about/news", changeFrequency: "weekly", priority: 0.6 },
  { path: "/about/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/research", changeFrequency: "monthly", priority: 0.8 },
  { path: "/research/gen-ai-education", changeFrequency: "monthly", priority: 0.6 },
  { path: "/research/accessibility-technology", changeFrequency: "monthly", priority: 0.6 },
  { path: "/research/future-of-work", changeFrequency: "monthly", priority: 0.6 },
  { path: "/people", changeFrequency: "monthly", priority: 0.8 },
  { path: "/people/alumni", changeFrequency: "monthly", priority: 0.6 },
  { path: "/people/collaborators", changeFrequency: "monthly", priority: 0.6 },
  { path: "/pathways", changeFrequency: "monthly", priority: 0.8 },
  { path: "/sponsors", changeFrequency: "monthly", priority: 0.8 },
  { path: "/sponsors/become", changeFrequency: "monthly", priority: 0.6 },
  { path: "/join", changeFrequency: "monthly", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
