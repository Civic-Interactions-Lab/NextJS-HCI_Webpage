import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

export async function getTestimonials() {
  const testimonialsQuery = defineQuery(`
    *[_type == "testimonials" && isActive == true] | order(orderRank) {
      _id,
      quote,
      person-> {
        name,
        img,
        association,
        status,
        affiliation
      },
      "personNow": *[_type == "alumniProfile" && person._ref == ^.person._ref][0].now
    }
  `);

  const testimonies = await sanityFetch({ query: testimonialsQuery });
  return testimonies.data;
}
