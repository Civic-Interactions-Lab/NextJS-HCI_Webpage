import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

export async function getResearchHeroImage() {
  const researchHeroQuery = defineQuery(`
    *[_type == "imageSettings" && sectionKey == "research-hero"][0].singleImage
  `);

  const image = await sanityFetch({ query: researchHeroQuery });
  return image.data;
}
