import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

export async function getNews() {
  const newsQuery = defineQuery(`
    *[_type == "news"] | order(date desc)[0...3]
  `);

  const news = await sanityFetch({ query: newsQuery });
  return news.data;
}
