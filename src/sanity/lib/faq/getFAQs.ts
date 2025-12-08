import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

export async function getFAQs() {
  const faqsQuery = defineQuery(`
    *[_type == "faq"] | order(orderRank)
  `);

  const faq = await sanityFetch({ query: faqsQuery });
  return faq.data;
}
