import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

export async function getTestimonials() {
  const testimonialsQuery = defineQuery(`
    *[_type == "testimonials" && isActive == true] | order(orderRank) {
      _id,
      quote,
      role,
      person-> {
        name,
        img
      }
    }
  `);

  const testimonies = await sanityFetch({ query: testimonialsQuery });
  return testimonies.data;
}
