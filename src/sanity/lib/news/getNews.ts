import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

export async function getRecentNews() {
  const recentNewsQuery = defineQuery(`
    *[_type == "news"] | order(date desc)[0...3]
  `);

  const news = await sanityFetch({ query: recentNewsQuery });
  return news.data;
}

export async function getAllNews() {
  const allNewsQuery = defineQuery(`
    *[_type == "news"] | order(date desc)
  `);

  const news = await sanityFetch({ query: allNewsQuery });
  return news.data;
}
