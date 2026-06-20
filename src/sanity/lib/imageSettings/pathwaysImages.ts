import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

export async function getPathwaysHeroImage() {
  const coursesHeroQuery = defineQuery(`
    *[_type == "imageSettings" && sectionKey == "pathways-hero"][0].singleImage
  `);

  const image = await sanityFetch({ query: coursesHeroQuery });
  return image.data;
}
