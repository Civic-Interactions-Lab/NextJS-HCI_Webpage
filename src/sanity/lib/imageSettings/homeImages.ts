import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

export async function getHomeHeroImage() {
  const homeHeroQuery = defineQuery(`
    *[_type == "imageSettings" && sectionKey == "home-hero"][0].singleImage
  `);

  const image = await sanityFetch({ query: homeHeroQuery });
  return image.data;
}
