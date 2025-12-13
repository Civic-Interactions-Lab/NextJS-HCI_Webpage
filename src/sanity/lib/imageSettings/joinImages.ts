import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

export async function getJoinHeroImage() {
  const joinHeroQuery = defineQuery(`
    *[_type == "imageSettings" && sectionKey == "join-hero"][0].singleImage
  `);

  const image = await sanityFetch({ query: joinHeroQuery });
  return image.data;
}
