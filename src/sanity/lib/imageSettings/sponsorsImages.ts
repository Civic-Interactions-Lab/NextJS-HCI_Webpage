import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

export async function getSponsorsHeroImage() {
  const sponsorsHeroQuery = defineQuery(`
    *[_type == "imageSettings" && sectionKey == "sponsors-hero"][0].singleImage
  `);

  const image = await sanityFetch({ query: sponsorsHeroQuery });
  return image.data;
}
