import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://hci.temple.edu";

const routes = [
  "",
  "/about",
  "/about?sub=news",
  "/about?sub=events",
  "/about?sub=contact-us",
  "/research",
  "/people",
  "/people?sub=alumni",
  "/people?sub=collaborators",
  "/courses",
  "/sponsors",
  "/sponsors?sub=interested-in-sponsoring?",
  "/join",
  "/verify",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
