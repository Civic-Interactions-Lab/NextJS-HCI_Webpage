import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

export async function getSponsors() {
  const sponsorsQuery = defineQuery(`
    *[_type == "sponsors"] | order(orderRank)
  `);

  const sponsors = await sanityFetch({ query: sponsorsQuery });
  return sponsors.data;
}
