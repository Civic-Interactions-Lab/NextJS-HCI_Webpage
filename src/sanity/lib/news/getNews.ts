import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

export async function getNews() {
  const query = defineQuery(`
    *[_type == "news"] | order(date desc)[0...3]
  `);

  const news = await sanityFetch({ query });
  return news.data;
}
